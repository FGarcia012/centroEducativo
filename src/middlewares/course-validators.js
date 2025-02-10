import { body, param } from 'express-validator';
import { courseExists } from '../helpers/db-validators.js';
import { validarCampos } from './validar-campos.js';
import { handleErrors } from './handle-errors.js';

export const createCourseValidator = [
    body('name').exists().notEmpty().withMessage('Course name is required').isLength({ min: 3, max: 50 }).withMessage('Course name must be between 3 and 50 characters'),
    body('description').exists().notEmpty().withMessage('Course description is required').isLength({ min: 5 }).withMessage('Course description must be between 5 characters'),
    validarCampos,
    handleErrors
];

export const updateCourseValidator = [
    param('cid').isMongoId().withMessage('Invalid course ID'),
    param('cid').custom(courseExists),
    body('name').optional().isLength({ min: 3, max: 50 }).withMessage('Course name must be between 3 and 50 characters'),
    body('description').optional().isLength({ min: 5 }).withMessage('Course description must be between 5 characters'),
    validarCampos,
    handleErrors
];

export const deleteCourseValidator = [
    param('cid').isMongoId().withMessage('Invalid course ID'),
    validarCampos,
    handleErrors
];

export const getTeacherCoursesValidator = [
    body('teacherId').isMongoId().withMessage('Invalid teacher ID'),
    validarCampos,
    handleErrors
];

export const enrollCourseValidator = [
    param('courseId').isMongoId().withMessage('Invalid course ID'),
    param('courseId').custom(courseExists),
    validarCampos,
    handleErrors
];

export const getStudentCoursesValidator = [
    param('studentId').isMongoId().withMessage('Invalid student ID'),
    validarCampos,
    handleErrors
];