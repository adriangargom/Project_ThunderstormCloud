import { NextFunction, Response} from 'express';
import { AuthenticationRequest } from '../midlewares/authenticationMidleware';
import HttpError from '../errors/HttpError';
import FolderManagementService from '../service/folderManagementService';

class FolderController {

    static async getFolder(req: AuthenticationRequest, res: Response, next: NextFunction) {
        const username = req.user.username;
        const path = req.params.path;

        if(!username) {
            return next(new HttpError(400));
        }

        try {
            const folderContent = FolderManagementService.readFolder(username, path);
            return res.status(200).json(
                { status: true, message: folderContent }
            );

        } catch (error: any) {
            return next(new HttpError(500, error.message));
        }

    }

    static async deleteFolder(req: AuthenticationRequest, res: Response, next: NextFunction) {
        const username = req.user.username;
        const path = req.params.path;

        if(!username || !path) {
            return next(new HttpError(400));
        }

        try {
            FolderManagementService.deleteFolder(username, path);
            return res.status(200).json(
                { status: true, message: 'Folder successfully removed' }
            );

        } catch (error: any) {
            return next(new HttpError(500, error.message));
        }
        
    }

    static async createFolder(req: AuthenticationRequest, res: Response, next: NextFunction) {
        const username = req.user.username;
        const path = req.params.path;
        const { folderName } = req.body;

        if(!username || !folderName) {
            return next(new HttpError(400));
        }

        try {
            FolderManagementService.createFolder(username, path, folderName);
            return res.status(200).json(
                { status: true, message: 'Folder created successfully'}
            );

        } catch (error: any) {
            return next(new HttpError(500, error.message));
        }

    }

    static async renameFolder(req: AuthenticationRequest, res: Response, next: NextFunction) {
        const username = req.user.username;
        const path = req.params.path;
        const { newName } = req.body;

        if(!username || !path || !newName) {
            return next(new HttpError(400));
        }
        
        try {
            FolderManagementService.renameFolder(username, path, newName);
            return res.status(200).json(
                { status: true, message: 'Folder successfully renamed' }
            );

        } catch (error: any) {
            return next(new HttpError(500, error.message));
        }

    }

}


export default FolderController;