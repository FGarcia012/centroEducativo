import Course from '../course/course.model.js';
import Alumno from '../alumno/alumno.model.js';

export const emailExist = async (email = '') => {
    const existe = await Alumno.findOne({email});
    if(existe){
        throw new Error(`The email ${email} is already registered`);
    }
};

export const alumnoExist = async (aid = '') => {
    const existe = await Alumno.findById(aid);
    if (!existe) {
        throw new Error("No existe el alumno con el ID proporcionado");
    }
};

export const courseExists = async (cid = "") => {
    const exists = await Course.findById(cid);
    if (!exists) {
        throw new Error("Course not found");
    }
};

export const roleExists = async (role = "") => {
    const rolesValidos = ['STUDENT_ROLE', 'TEACHER_ROLE'];
    if (!rolesValidos.includes(role)) {
        throw new Error('Role not found');
    }
};

export const courseInEnroll = async (studentId = "") => {
    const student = await Alumno.findById(studentId);
    if (!student) {
        throw new Error("Student not found");
    }
    
    if (student.courses && student.courses.length >= 3) {
        throw new Error("Student cannot enroll in more than 3 courses");
    }
};