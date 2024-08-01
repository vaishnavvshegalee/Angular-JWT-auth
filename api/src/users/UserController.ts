import { NextFunction, Request, Response } from "express";
import UserSchema from "./UserSchema";
import bcrypt from 'bcrypt'
import { sign } from "jsonwebtoken";
import config from "../config/config";
import { AuthRequest } from "../middlewares/authentiate";
const register = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required!" });
    }
    const user = await UserSchema.findOne({ email });
    if (user) {
        return res.status(400).json('User is already exists!');
    }
    try {
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await UserSchema.create({
            name,
            email,
            password: hashPassword
        })
        res.status(201).json({ message: 'User created successfully', status: true, data: { _id: newUser, email: newUser.email } })
    } catch (error) {
        res.status(500).json(error)
    }

    res.json({ message: 'register' })
}

const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json('All fields are required!');
    }
    const user = await UserSchema.findOne({ email });
    if (!user) {
        return res.status(404).json("User does't exists!");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        return res.status(400).json('Incorrect credentials!')
    }
    try {
        const token = sign({ sub: user._id }, config.jwtSecret as string, { expiresIn: '1d' });
        return res.status(200).json({
            status: true,
            message: 'User Loggedin',
            data: { _id: user._id, email: user.email, name: user.name },
            token
        })

    } catch (error) {
        res.status(500).json({ error: error })
    }
    res.json('login')
}

const me = async (req: Request, res: Response, next: NextFunction) => {
    const _request = req as AuthRequest;
    const user = await UserSchema.findById(_request.userId);
    if (user) {
        res.status(200).json({
            status: true,
            data: { _id: user._id, email: user.email, name: user.name }
        })
    }
    res.status(500).json('Somerthing went wrong!')
}

export {
    register,
    login,
    me
}