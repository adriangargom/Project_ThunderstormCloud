import { NextFunction, Request, Response } from "express";
import AuthenticationService from "../service/authenticationService";
import JwtUtils from "../utils/jwtUtils";
import HttpError from "../errors/HttpError";

class AuthenticationController {


    static async validateToken(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json({
            status: true,
            message: 'Token validated successfully'
        });
    }

    //Signs in an existing user and provides a authentication token
    static async signIn(req: Request, res: Response, next: NextFunction) {
        const { username, password } = req.body;

        if(!username || !password) {
            return next(new HttpError(400));
        }

        try {
            await AuthenticationService.signIn(username, password);
            const token = JwtUtils.signToken({ username: username });

            return res.status(200).json({
                status: true, 
                message: token
            });

        } catch (error: any) {
            if(error instanceof HttpError)
                return next(error);

            return next(new HttpError(500, error.message));
        }
    }

    // Signs up a new user and provides a authentication token
    static async signUp(req: Request, res: Response, next: NextFunction) {
        const { username, password } = req.body;

        if(!username || !password) {
            return next(new HttpError(400));
        }

        try {
            await AuthenticationService.signUp(username, password);
            const token = JwtUtils.signToken({ username: username });

            return res.status(200).json({
                status: true, 
                message: token
            });

        } catch (error: any) {
            if(error instanceof HttpError)
                return next(error);

            return next(new HttpError(500, error.message));
        }
    }

}

export default AuthenticationController;

