import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";


const secretApiKey: string = process.env.SECRET_API_KEY!!;

export interface AuthenticationRequest extends Request {
    user?: any;
}

function authenticationMidleware(req: AuthenticationRequest, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if(!token) {
        return res.status(401).json({ 
            status: false,
            message: 'No token provided'
        });
    }

    try {
        const decoded = jwt.verify(token, secretApiKey);
        req.user = decoded;
        next();

    } catch (error) {
        return res.status(403).json({
            status: false, 
            message: 'Invalid Token'
        });
    }
}

export default authenticationMidleware;