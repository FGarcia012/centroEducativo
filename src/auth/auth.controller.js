import { hash, verify } from 'argon2'
import Alumno from '../alumno/alumno.model.js'
import { generateJWT } from '../helpers/generate-jwt.js'

export const register = async (req, res) => {
    try{
        const data = req.body
        
        const encryptedPassword = await hash(data.password)
        data.password = encryptedPassword

        const alumno = await Alumno.create(data)

        return res.status(201).json({
            message: 'user has been created',
            name: alumno.name,
            email: alumno.email
        })
    }catch(err){
        return res.status(500).json({
            message: 'user registration failed',
            error: err.message
        })
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body
    try{
        const alumno = await Alumno.findOne({
            $or: [{email: email}]
        })

        if(!alumno){
            return res.status(400).json({
                message: 'Credentials invalid',
                error: 'The email is not exist'
            })
        }

        const validPassword = await verify(alumno.password, password)

        if(!validPassword){
            return res.status(400).json({
                message: 'Credentials invalid',
                error: 'The password is not correct'
            })
        }

        const token = await generateJWT(alumno._id.toString(), alumno.email);

        return res.status(200).json({
            message: 'Login successFull',
            alumnoDetails: {
                token: token,
                aid: alumno._id,
                role: alumno.role
            }
        })
    }catch(err){
        return res.status(500).json({
            message: 'Login failed, server error',
            error: err.message
        })
    }
}