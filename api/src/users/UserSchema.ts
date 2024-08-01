
import { User } from './UserTypes';
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema<User>({
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
        required: true
    }
}, { timestamps: true })

export default mongoose.model('User', UserSchema)