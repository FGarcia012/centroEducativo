import { Schema, model } from 'mongoose';
import Alumno from '../alumno/alumno.model.js';

const courseSchema = Schema({
    name: {
        type: String,
        required: [true, 'Course name is required']
    },
    description: {
        type: String,
        required: [true, 'Course description is required']
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'Alumno',
        required: true,
        validate: {
            validator: async function(value) {
                const teacher = await Alumno.findById(value);
                return teacher && teacher.role === 'TEACHER_ROLE';
            },
            message: 'Teacher must have TEACHER_ROLE'
        }
    },
    students: [{
        type: Schema.Types.ObjectId,
        ref: 'Alumno',
        validate: {
            validator: async function(value) {
                const student = await Alumno.findById(value);
                return student && student.role === 'STUDENT_ROLE';
            },
            message: 'Student must have STUDENT_ROLE'
        }
    }],
    status: {
        type: Boolean,
        default: true
    }
}, 
{
    versionKey: false,
    timestamps: true
});

courseSchema.methods.toJSON = function() {
    const { __v, password, _id, ...curso } = this.toObject();
    curso.cid = _id;
    return curso;
};

export default model('Course', courseSchema);