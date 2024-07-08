import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { updateUploadFileModalStatus } from "../../../redux/slices/modalsSlice";
import FilePickerInputField from "../../common/filePickerInputField";
import { toast } from "react-toastify";
import FileRequests from "../../../axios/home/fileRequests";
import ConfirmButton from "../../common/confirmButton";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import SelectedFileList from "./common/selectedFilesList";
import ModalHeader from "./common/modalHeader";


const UploadFileModal: FC = () => {

    const dispatch = useDispatch();

    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

    const handleUploadFiles = () => {
        if(!selectedFiles) {
            toast.error('No files selected');
            return;
        }

        FileRequests.uploadFile(selectedFiles)
            .then((data) => {
                if(!data.status) {
                    toast.error('Error uploading files');
                    return;
                }

                dispatch(updateUploadFileModalStatus(false));
                toast.success('Files uploaded successfully');
            });
    
    }

    return (
        <article className="w-screen h-screen absolute flex items-center justify-center
            bg-black bg-opacity-25">
            
            <dialog className="w-9/12 md:w-6/12 xl:w-4/12 p-5 flex flex-col gap-4 bg-white rounded-md">

                <ModalHeader 
                    title={"Upload Files"} 
                    handleClose={() => dispatch(updateUploadFileModalStatus(false))} />

                <article className="w-full flex flex-col gap-4">

                    <FilePickerInputField 
                        onChange={(event) => setSelectedFiles(event.target.files)} />

                    { 
                        /* List that contains all the selected files by the user */
                        selectedFiles && <SelectedFileList fileList={selectedFiles} /> 
                    }

                    <div>
                        <ConfirmButton 
                            title="Save"
                            icon={faSave}
                            onClick={handleUploadFiles}/>
                    </div>

                </article>

            </dialog>

        </article>
    );

}

export default UploadFileModal;