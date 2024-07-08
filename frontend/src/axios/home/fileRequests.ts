import { store } from "../../redux/store";
import ResponseIface, { FileResponseIface } from "../../types/responseTypes";
import Requests from '../requests';


export default class FileRequests {

    private static getSelectedFolder(): string {
        const state = store.getState();
        const actualDirectoryPath = [...state.directory.actualDirectoryPath];

        return actualDirectoryPath.join('-');
    }

    private static getSelectedFilePath(): string {
        const state = store.getState();
        const actualDirectoryPath = [...state.directory.actualDirectoryPath];
        const selectedFileName = state.file.fileName;

        actualDirectoryPath.push(selectedFileName!!);

        return actualDirectoryPath.join('-');
    }

    public static async getFileContent(): Promise<FileResponseIface> {
        const selectedFilePath = this.getSelectedFilePath();

        return await Requests.getRequest<FileResponseIface>(
            `/files/${selectedFilePath}`
        );
    }

    public static async uploadFile(files: FileList): Promise<ResponseIface> {
        const selectedFolder = this.getSelectedFolder();

        return await Requests.postRequest<ResponseIface>(
            `/files/${selectedFolder}`,
            files,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        );
    }

    public static async downloadFile(): Promise<Blob> {
        const selectedFilePath = this.getSelectedFilePath();

        return await Requests.getRequest<Blob>(
            `/files/${selectedFilePath}/download`,
            { responseType: 'blob' }
        );
    }

    public static async deleteFile(): Promise<ResponseIface> {
        const selectedFileName = this.getSelectedFilePath();

        return await Requests.deleteRequest<ResponseIface>(
            `/files/${selectedFileName}`
        );
    }

    public static async renameFile(newFileName: string): Promise<ResponseIface> {
        const selectedFilePath = this.getSelectedFilePath();

        return await Requests.putRequest<ResponseIface>(
            `/files/${selectedFilePath}/rename`,
            { newName: newFileName }
        )
    }

}