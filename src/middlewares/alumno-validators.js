import { body, param } from "express-validator";
import { emailExist, alumnoExist, roleExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validar-campos.js";
import { handleErrors } from "./handle-errors.js";

export const registerValidator = [
    body('name').not().isEmpty().withMessage('Name is required'),
    body('email').not().isEmpty().withMessage('Email is required'),
    body('email').isEmail().withMessage('Email is invalid'),
    body('email').custom(emailExist),
    body('password').isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),
    body('role').optional().custom(roleExists),
    validarCampos,
    handleErrors
];

export const loginValidator = [
    body('email').optional().isEmail().withMessage('Email is invalid'),
    body('password').isLength({min: 8}).withMessage('The password needs 8 characters. At least one lowercase letter, one uppercase letter, one symbol and one number'),
    validarCampos,
    handleErrors
]

export const getAlumnoByIdValidator = [
    param('aid').isMongoId().withMessage('No es un ID válido'),
    param('aid').custom(alumnoExist),
    validarCampos,
    handleErrors
]

export const updateAlumnoValidator = [
    param('aid', "No es un ID válido").isMongoId(),
    param('aid').custom(alumnoExist),
    validarCampos,
    handleErrors
]

export const deleteAlumnoValidator = [
    param('aid').isMongoId().withMessage('No es un ID válido'),
    param('aid').custom(alumnoExist),
    validarCampos,
    handleErrors
]

export const updatePasswordValidator = [
    param('aid').isMongoId().withMessage('No es un ID válido'),
    param('aid').custom(alumnoExist),
    body('newPassword').isLength({min: 8}).withMessage('El password debe contener al menos 8 caracteres'),
    validarCampos,
    handleErrors
]