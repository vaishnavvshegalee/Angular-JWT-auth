import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import config from "../config/config";

export interface AuthRequest extends Request {
    userId: string;
}
const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Authorization token is reuired!' });
    }
    try {
        const parsedText = token.split(' ')[1];
        const decoded = verify(parsedText, config.jwtSecret as string);
        const _request = req as AuthRequest
        _request.userId = decoded.sub as string;
        return next();
    } catch (error) {
        res.status(500).json({ message: 'Unauthorized' })
    }
}

export default authenticate;