import { Schema, model } from 'mongoose';

const alumnoSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        maxLength: [25, 'Name cannot exceed 25 characters']
    },
    username: {
        type: String,
        unique: true,
        required: [true, 'Username is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [8, 'The password needs 8 characters. At least one lowercase letter, one uppercase letter, one symbol and one number']
    },
    role: {
        type: String,
        default: 'STUDENT_ROLE',
        enum: ['TEACHER_ROLE', 'STUDENT_ROLE']
    },
    courses: [{
        type: Schema.Types.ObjectId,
        ref: 'Course',
        validate: {
            validator: function(value) {
                // Si el rol es TEACHER_ROLE, courses debe ser requerido
                if (this.role === 'TEACHER_ROLE' && (!value || value.length === 0)) {
                    return false;
                }
                return true;
            },
            message: 'Courses are required for teachers'
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

alumnoSchema.methods.toJSON = function() {
    const { __v, password, _id, ...alumno } = this.toObject();
    alumno.aid = _id;
    return alumno;
};

export default model('Alumno', alumnoSchema);