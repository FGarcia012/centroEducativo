import { hash, verify } from 'argon2';
import Alumno from './alumno.model.js';

export const getAlumnoById = async (req, res) => {
    try {
        const { aid } = req.params;
        const alumno = await Alumno.findById(aid);

        if (!alumno) {
            return res.status(404).json({
                success: false,
                message: 'Alumno not found'
            });
        }

        return res.status(200).json({
            success: true,
            alumno
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error al obtener alumno',
            error: err.message
        });
    }
};

export const updateAlumno = async (req, res) => {
    try {
        const { aid } = req.params;
        const data = req.body;

        const alumno = await Alumno.findByIdAndUpdate(aid, data, { new: true });

        res.status(200).json({
            success: true,
            message: 'Alumno Actualizado',
            alumno,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar Alumno',
            error: err.message
        });
    }
};

export const deleteAlumno = async (req, res) => {
    try {
        const { aid } = req.params;

        const alumno = await Alumno.findByIdAndUpdate(aid, { status: false }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Alumno eliminado",
            alumno
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el alumno",
            error: err.message
        });
    }
};

export const updatePassword = async (req, res) => {
    try {
        const { aid } = req.params;
        const { newPassword } = req.body;

        const alumno = await Alumno.findById(aid);

        const matchOldAndNewPassword = await verify(alumno.password, newPassword);

        if (matchOldAndNewPassword) {
            return res.status(400).json({
                success: false,
                message: "La nueva contraseña no puede ser igual a la anterior"
            });
        }

        const encryptedPassword = await hash(newPassword);

        await Alumno.findByIdAndUpdate(aid, { password: encryptedPassword }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Contraseña actualizada",
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar contraseña",
            error: err.message
        });
    }
};