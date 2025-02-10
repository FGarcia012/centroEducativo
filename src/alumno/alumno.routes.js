import { Router } from 'express';
import { deleteAlumno, getAlumnoById, updateAlumno, updatePassword } from './alumno.controller.js';
import { deleteAlumnoValidator, getAlumnoByIdValidator, updateAlumnoValidator, updatePasswordValidator } from '../middlewares/alumno-validators.js';

const router = Router();

router.get('/findALumno/:aid', getAlumnoByIdValidator, getAlumnoById);

router.put("/updateAlumno/:aid", updateAlumnoValidator, updateAlumno);

router.delete("/deleteAlumno/:aid", deleteAlumnoValidator, deleteAlumno);

router.patch("/updatePassword/:aid", updatePasswordValidator, updatePassword);

export default router;