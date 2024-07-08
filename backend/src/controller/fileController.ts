import { NextFunction, Response } from "express";
import { AuthenticationRequest } from "../midlewares/authenticationMidleware";
import FileManagementService from "../service/fileManagementService";
import HttpError from "../errors/HttpError";

class FileController {

    static async getFile(req: AuthenticationRequest, res: Response, next: NextFunction) {
        const username = req.user.username;
        const path = req.params.path;

        if(!username || !path) {
            return next(new HttpError(400));
        }

        try {
            const fileData = FileManagementService.readFile(username, path);
            return res.status(200).json(
                { status: true, message: fileData }
            );

        } catch (error: any) {
            return next(new HttpError(500, error.message));
        }
    }
    
    static async uploadFile(req: AuthenticationRequest, res: Response, next: NextFunction) {
        const username = req.user.username;
        const path = req.params.path;
        const files = req.files!;

        if(!username || !files) {
            return next(new HttpError(400));
        }

        try {
            FileManagementService.uploadFile(username, path, files);

            return res.status(200).json(
                { status: true, message: 'Files successfully uploaded' }
            );

        } catch (error: any) {
            return next(new HttpError(500, error.message));
        }
    }
    
    static async downloadFile(req: AuthenticationRequest, res: Response, next: NextFunction) {
        const username = req.user.username;
        const path = req.params.path;

        if(!username || !path) {
            return next(new HttpError(400));
        }

        try {
            const downloadResourcePath = FileManagementService.downloadFile(username, path);

            return res.status(200).download(downloadResourcePath);

        } catch (error: any) {
            return next(new HttpError(500, error.message));
        }
    }
    
    static async deleteFile(req: AuthenticationRequest, res: Response, next: NextFunction) {
        const username = req.user.username;
        const path = req.params.path;

        if(!username || !path) {
            return next(new HttpError(400));
        }

        try {
            FileManagementService.removeFile(username, path);

            return res.status(200).json(
                { status: true, message: 'File successfully removed' }
            );

        } catch (error: any) {
            return next(new HttpError(500, error.message));
        }
    }

    static async renameFile(req: AuthenticationRequest, res: Response, next: NextFunction) {
        const username = req.user.username;
        const path = req.params.path;
        const { newName } = req.body;

        if(!username || !path || !newName) {
            return next(new HttpError(400));
        }

        try {
            FileManagementService.renameFile(username, path, newName);

            return res.status(200).json(
                { status: true, message: 'File successfully renamed' }
            );

        } catch (error: any) {
            return next(new HttpError(500, error.message));
        }

    }

}

export default FileController;