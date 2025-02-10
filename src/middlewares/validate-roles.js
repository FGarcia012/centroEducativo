export const isTeacher = (req, res, next) => {
    if (!req.body.teacherId) {
        return res.status(500).json({
            message: 'Teacher ID is required'
        });
    }

    if (req.body.role !== 'TEACHER_ROLE') {
        return res.status(403).json({
            message: 'Action only allowed for teachers'
        });
    }

    next();
};

export const isStudent = (req, res, next) => {
    const { studentId } = req.params;
    if (!studentId) {
        return res.status(500).json({
            message: 'Student ID is required'
        });
    }

    if (req.body.role !== 'STUDENT_ROLE') {
        return res.status(403).json({
            message: 'Action only allowed for students'
        });
    }

    next();
};