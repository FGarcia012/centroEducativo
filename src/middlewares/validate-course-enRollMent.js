import Course from "../course/course.model.js";

export const validateCourseEnrollment = async (req, res, next) => {
    try {
        const { courseId } = req.params;
        const studentId = req.alumno ? req.alumno.aid : req.body.studentId;

        // Check if student is already enrolled in this course
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        const isEnrolled = course.students.includes(studentId);
        if (isEnrolled) {
            return res.status(400).json({
                message: "Student is already enrolled in this course"
            });
        }

        next();
    } catch (err) {
        next(err);
    }
};