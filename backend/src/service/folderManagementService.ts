import * as fs from 'fs';
import HttpError from '../errors/HttpError';

export interface FolderData {
    path: string;
    folders: string[];
    files: string[];
}


class FolderManagementService {

    private static systemSlash = process.platform === 'win32'? '\\': '/';
    private static mainDirectoryPath = process.env.MAIN_DIRECTORY_PATH!!;

    // Formats the provided user name and path into the resource path
    private static formatPath(username: string, path: string): string {
        const combinedPath = `-${username}-${(path === undefined)? '': path}-`;
        return combinedPath.replaceAll('-', this.systemSlash);
    }

    // Validates that the provided folder name dosn't already exists inside of the folder
    private static validateFolderExistence(username: string, path: string, newFolderName: string) {
        const directoryData = FolderManagementService.readFolder(username, path);

        if(directoryData.folders.includes(newFolderName))
            throw new HttpError(400, `A folder with the name '${newFolderName}', already exists`);
    }


    // Read the folder content
    static readFolder(username: string, path: string): FolderData {
        const folderData: FolderData = { 
            path: `-${(!path? '': path)}`.replaceAll('-', this.systemSlash),
            folders: [],
            files: []
        };

        const formattedPath = this.mainDirectoryPath + this.formatPath(username, path);
        const dirContent = fs.readdirSync(formattedPath);

        dirContent.forEach((resource: string) => {
            const resourceStats = fs.lstatSync(`${formattedPath}${resource}`);
            (resourceStats).isFile()
                ? folderData.files.push(resource)
                : folderData.folders.push(resource);
        })

        return folderData;
    }

    // Completely removes a folder recursively if contains other resources
    static deleteFolder(username: string, path: string): void {
        const formattedPath = this.mainDirectoryPath + this.formatPath(username, path);
        fs.rmSync(formattedPath, { recursive: true });
    }

    // Creates the provided folder name in a recursive way if the folders below are not created
    static createFolder(username: string, path: string, folderName: string): void {
        this.validateFolderExistence(username, path, folderName);

        const formattedPath = this.mainDirectoryPath + this.formatPath(username, path);
        const newFolderPath = `${formattedPath}-${folderName}`.replaceAll('-', this.systemSlash);

        fs.mkdirSync(newFolderPath, {recursive: true});
    }

    // Renames an existing folder based on the provided path and the newFolderName
    static renameFolder(username: string, path: string, newFolderName: string): void {
        this.validateFolderExistence(username, path, newFolderName);

        const splittedPath = path.split('-');
        splittedPath[splittedPath.length-1] = newFolderName;

        const previousFormattedPath = this.mainDirectoryPath + this.formatPath(username, path);
        const newFormattedPath = this.mainDirectoryPath + this.formatPath(username, splittedPath.join('-'));

        fs.renameSync(previousFormattedPath, newFormattedPath);
    }

}

export default FolderManagementService;