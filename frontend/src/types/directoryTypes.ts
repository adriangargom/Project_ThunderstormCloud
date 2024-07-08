
export interface DirectoryDataIface {
    files: string[]
    folders: string[]
    path: string
}

export interface DirectoryStateIface {
    actualDirectoryPath: string[]
    actualDirectoryData: DirectoryDataIface
}



export interface CreateDirectoryIface {
    folderName: string
}

export interface RenameDirectoryIface {
    newName: string
}