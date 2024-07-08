import { store } from "../../redux/store";
import { CreateDirectoryIface, RenameDirectoryIface } from "../../types/directoryTypes";
import ResponseIface, { DirectoryResponseIface } from "../../types/responseTypes";
import Requests from "../requests";


export default class DirectoryRequests {

    // Fetch all te directory contents ( files, folders, path )
    public static async getFolderContents(): Promise<DirectoryResponseIface> {
        const state = store.getState();
        const currentFormattedPath = state.directory.actualDirectoryPath.join('-');

        return await Requests.getRequest<DirectoryResponseIface>(
            `/folders/${currentFormattedPath}`
        );
    }

    // Delete a directory based on the provided path
    public static async deleteFolder(): Promise<ResponseIface> {
        const state = store.getState();
        const currentFormattedPath = state.directory.actualDirectoryPath.join('-');

        return await Requests.deleteRequest<ResponseIface>(
            `/folders/${currentFormattedPath}`
        );
    }

    // Creates a new directory based on the provided path
    public static async createFolder(payload: CreateDirectoryIface): Promise<ResponseIface> {
        const state = store.getState();
        const currentFormattedPath = state.directory.actualDirectoryPath.join('-');

        return await Requests.postRequest<ResponseIface>(
            `/folders/${currentFormattedPath}/create`, 
            payload
        );
    }

    // Renames an existing directory based on the provided path
    public static async renameFolder(payload: RenameDirectoryIface): Promise<ResponseIface> {
        const state = store.getState();
        const currentFormattedPath = state.directory.actualDirectoryPath.join('-');

        return await Requests.putRequest<ResponseIface>(
            `/folders/${currentFormattedPath}/rename`, 
            payload
        );
    }

}