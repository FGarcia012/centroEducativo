import mongoose from 'mongoose';
import Course from '../course/course.model.js';
import Alumno from '../alumno/alumno.model.js';

export const createCourse = async (req, res) => {
    try {
        const data = req.body;

        const course = new Course(data);

        await course.save();

        return res.status(201).json({
            success: true,
            message: 'Curso creado',
            course
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error al crear el curso',
            error: err.message
        });
    }
};

export const updateCourses = async (req, res) => {
    try {
        const { cid } = req.params;
        const data = req.body;

        const course = await Course.findByIdAndUpdate(cid, data, { new: true });

        res.status(200).json({
            success: true,
            message: 'Curso Actualizado',
            course,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar Curso',
            error: err.message
        });
    }
};

export const deleteCourses = async (req, res) => {
    try {
        const { cid } = req.params;

        const course = await Course.findByIdAndUpdate(cid, { status: false }, { new: true });

        await Course.findByIdAndDelete(cid);

        const students = await Alumno.find({ courses: cid }).populate('courses');
        students.forEach(async (student) => {
            const index = student.courses.indexOf(cid.toString());
            if (index !== -1) {
                student.courses.splice(index, 1);
                await student.save();
            }
        });
        return res.status(200).json({
            success: true,
            message: "Curso eliminado",
            course: Course
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el curso",
            error: err.message
        });
    }
};

export const enrollInCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const studentId = req.body.studentId;

        const student = await Alumno.findById(studentId);
        if (student.courses.length >= 3) {
            return res.status(400).json({
                message: 'Cannot enroll in more than 3 courses'
            });
        }

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        if (course.students.includes(studentId)) {
            return res.status(400).json({
                message: 'Already enrolled in this course'
            });
        }

        course.students.push(studentId);
        await course.save();

        student.courses.push(courseId);
        await student.save();

        return res.status(200).json({
            success: true,
            message: 'Successfully enrolled in course',
            course
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error enrolling in course',
            error: error.message
        });
    }
};

export const getTeacherCourses = async (req, res) => {
    try {
        const courses = await Course.find({
            teacher: req.body.teacherId,
            status: true
        }).populate('students', 'name email');

        return res.status(200).json({
            success: true,
            message: 'Cursos del profesor',
            courses
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error getting courses',
            error: error.message
        });
    }
};

export const getStudentCourses = async (req, res) => {
    try {
        const { studentId } = req.params; 
        if (!mongoose.Types.ObjectId.isValid(studentId)) {
            return res.status(400).json({ message: "ID de estudiante no válido" });
        }
        
        const student = await Alumno.findById(studentId).populate('courses');

        if (!student) {
            return res.status(404).json({ message: "Estudiante no encontrado" });
        }

        const courses = student.courses;
        
        if (courses === 0) {
            return res.status(404).json({ message: "No se encontraron cursos para este estudiante" });
        }

        return res.status(200).json({
            message: "Cursos encontrados correctamente",
            courses
        });

    } catch (error) {
        return res.status (500).json({
            message: "Error al obtener los cursos",
            error: error.message
        });
    }
};