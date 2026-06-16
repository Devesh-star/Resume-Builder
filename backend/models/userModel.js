import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    profilePicture: {
        type: String,
        default: ''
    },
    authProvider: {
        type: String,
        enum: ['local', 'google'],
        default: 'local'
    },
},
{
    timestamps: true
}
)

export default mongoose.model('User', UserSchema);