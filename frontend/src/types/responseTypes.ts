import { DirectoryDataIface } from "./directoryTypes"
import { FileDataIface } from "./fileTypes"

export default interface ResponseIface {
    status: boolean
    message: string
}

export interface DirectoryResponseIface {
    status: boolean
    message: DirectoryDataIface
}

export interface FileResponseIface {
    status: boolean
    message: FileDataIface
}