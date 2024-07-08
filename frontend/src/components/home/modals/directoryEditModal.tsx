import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import TextInputField from "../../common/textInputField";
import ConfirmButton from "../../common/confirmButton";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import DirectoryRequests from "../../../axios/home/directoryRequests";
import { toast } from "react-toastify";
import { popDirectory } from "../../../redux/slices/directorySlice";
import { updateDirectoryModalStatus } from "../../../redux/slices/modalsSlice";
import ModalHeader from "./common/modalHeader";
import { ColorStylesEnum } from "../../../enum/colorStylesEnum";


const DirectoryEditModal: FC = () => {

    const dispatch: AppDispatch = useDispatch();

    const directoryPath = useSelector((state: RootState) => state.directory.actualDirectoryPath);

    const [newDirectoryName, setNewDirectoryName] = useState<string>(
        directoryPath[directoryPath.length-1]
    );

    const handleDirectoryDelete = () => {
        DirectoryRequests.deleteFolder()
            .then((data) => {
                if(!data.status) {
                    toast.error('Error deleting directory')
                    return;
                }

                handleDirectoryReload();
                toast.success('Directory deleted');
            });
    }

    const handleDirectoryRename = (event: React.FormEvent<HTMLElement>) => {
        event.preventDefault();
        
        DirectoryRequests.renameFolder({ newName: newDirectoryName })
            .then((data) => {
                if(!data.status) {
                    toast.error('Error renaming directory');
                    return;
                }

                handleDirectoryReload();
                toast.success('Directory renamed')
            });
    }

    const handleDirectoryReload = () => {
        dispatch(popDirectory());
        dispatch(updateDirectoryModalStatus(false));
    }

    return (
        <article className="w-screen h-screen absolute flex items-center justify-center
            bg-black bg-opacity-25">
            
            <dialog className="w-9/12 md:w-6/12 xl:w-4/12 p-5 flex flex-col gap-4 
                bg-white rounded-md">

                <ModalHeader 
                    title="Directory Settings"
                    handleClose={() => dispatch(updateDirectoryModalStatus(false))}/>

                <form onSubmit={handleDirectoryRename} className="w-full flex flex-col gap-4">
                    
                    <TextInputField 
                        value={newDirectoryName} 
                        name='directoryName'
                        placeholder='Directory Name'
                        onChange={(event) => setNewDirectoryName(event.target.value)} />

                    <section className="flex gap-4">

                        <ConfirmButton
                            title="Delete"
                            icon={faTrash}
                            styleType={ColorStylesEnum.Danger}
                            onClick={handleDirectoryDelete}/>

                        <ConfirmButton 
                            title="Save"
                            buttonType="submit" />

                    </section>

                </form>

            </dialog>

        </article>
    );

}

export default DirectoryEditModal;
