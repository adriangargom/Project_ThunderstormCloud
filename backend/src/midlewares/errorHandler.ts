import { Request, Response, NextFunction } from 'express';

interface ErrorCodes {
    [code: number]: string
}

export const errorMessages: ErrorCodes = {
    400: 'Invalid request parameters',
    500: 'Application error'
}

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    const status: number = err.status || 500;
    const message: string = err.message || errorMessages[status];

    res.status(status).json(
        { status: false, message: message }
    );
}

export default errorHandler;