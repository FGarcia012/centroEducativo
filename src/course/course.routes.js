import { Router } from 'express';
import { isTeacher, isStudent } from '../middlewares/validate-roles.js';
import { validateCourseEnrollment } from '../middlewares/validate-course-enRollMent.js';
import { createCourse, updateCourses, deleteCourses, enrollInCourse, getTeacherCourses, getStudentCourses } from './course.controller.js';
import { createCourseValidator, updateCourseValidator, deleteCourseValidator, getTeacherCoursesValidator, enrollCourseValidator, getStudentCoursesValidator } from '../middlewares/course-validators.js';

const router = Router();

// Teacher routes
router.post('/createdCourse', isTeacher, createCourseValidator, createCourse);
router.put('/updateCourse/:cid', updateCourses);
router.delete('/deleteCourse/:cid', deleteCourseValidator, deleteCourses);
router.get('/getTeacherCourses', isTeacher, getTeacherCoursesValidator, getTeacherCourses);

// Student routes
router.post('/enroll/:courseId', isStudent, enrollCourseValidator, validateCourseEnrollment, enrollInCourse);
router.get('/getStudentCourses/:studentId', isStudent, getStudentCoursesValidator, getStudentCourses); 

export default router;