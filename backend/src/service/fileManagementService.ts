import * as fs from 'fs';
import 'dotenv/config';
import fileUpload from 'express-fileupload';
import FolderManagementService from './folderManagementService';
import HttpError from '../errors/HttpError';


export interface FileData {
    name: string;
    content: string;
}

class FileManagementService {

    private static systemSlash = process.platform === 'win32'? '\\':'/';
    private static mainDirectoryPath = process.env.MAIN_DIRECTORY_PATH!!;

    // Formats the provided user name and path into the resource path
    private static formatPath(username: string, path: string): string {
        const combinedPath = `-${username}-${(path === undefined)? '' : path}`;
        return combinedPath.replaceAll('-', this.systemSlash);
    }

    // Validates that the provided file name dosn't already exists inside of the folder
    private static validateFileExistence(username: string, path: string, newFileName: string) {
        const directoryPath = ( path != undefined )? path.split('-').slice(0, -1).join('-') : '-';
        const directoryData = FolderManagementService.readFolder(username, directoryPath);

        if(directoryData.files.includes(newFileName))
            throw new HttpError(400, `Invalid file name ${newFileName}`);
    }


    // Read the file name and content
    static readFile(username: string, path: string): FileData {
        const formattedPath = this.mainDirectoryPath + this.formatPath(username, path);

        const name = path.split('-').pop()!;
        const content = fs.readFileSync(formattedPath, 'utf-8');

        return { name, content };
    }

    // Completely removes a file
    static removeFile(username: string, path: string) {
        const formattedPath = this.mainDirectoryPath + this.formatPath(username, path);
        fs.rmSync(formattedPath);
    }

    // Renames an existing file based on the provided path and the newFileName
    static renameFile(username: string, path: string, newFileName: string) {
        newFileName = newFileName.replaceAll('-', '_');
        this.validateFileExistence(username, path, newFileName);

        const formattedPath = this.mainDirectoryPath + this.formatPath(username, path);

        const sectionedPath = formattedPath.split(this.systemSlash);
        sectionedPath[sectionedPath.length-1] = newFileName;
        const newFilePath = sectionedPath.join(this.systemSlash);

        fs.renameSync(formattedPath, newFilePath);
    }

    // Uploads single or multiple files into the provided path 
    static uploadFile(username: string, path: string, files: fileUpload.FileArray) {
        const formattedPath = this.mainDirectoryPath + this.formatPath(username, path);
        let uploadedFiles = files?.['undefined'] || files?.['files[]'] as fileUpload.UploadedFile[];

        if(!Array.isArray(uploadedFiles)) {
            uploadedFiles = [uploadedFiles] as fileUpload.UploadedFile[];
        }

        uploadedFiles.forEach((file: fileUpload.UploadedFile, index: number) => {
            this.validateFileExistence(username, path, file.name);

            const formattedFileName = file.name.replaceAll('-', '_');
            const filePath = `${formattedPath}-${formattedFileName}`.replaceAll('-', this.systemSlash);

            file.mv(filePath, (error: any) => {
                if(error) {
                    throw new HttpError(400, `Error uploading file ${index}`);
                }
            })
        })
    }

    // Returns the resource download path based on the provided attributes
    static downloadFile(username: string, path: string): string {
        const formattedPath = this.mainDirectoryPath + this.formatPath(username, path);
        return formattedPath;
    }

}

export default FileManagementService;