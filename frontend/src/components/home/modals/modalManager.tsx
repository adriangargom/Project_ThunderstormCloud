import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import CreateDirectoryModal from "./createDirectoryModal";
import DirectoryEditModal from "./directoryEditModal";
import FileEditModal from "./fileEditModal";
import UploadFileModal from "./uploadFileModal";
import { FC } from "react";


const ModalManager: FC = () => {

    const { createDirectoryModalStatus, directoryModalStatus, fileModalStatus, uploadFileModalStatus} =
        useSelector((state: RootState) => state.modals);

    return (
        <>
            { createDirectoryModalStatus && <CreateDirectoryModal /> }
            { directoryModalStatus && <DirectoryEditModal /> }
            { fileModalStatus && <FileEditModal/> }
            { uploadFileModalStatus && <UploadFileModal /> }
        </>
    );

}

export default ModalManager;