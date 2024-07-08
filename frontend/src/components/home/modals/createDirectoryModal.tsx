import { FC, useState } from "react";
import { updateCreateDirectoryModalStatus } from "../../../redux/slices/modalsSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import TextInputField from "../../common/textInputField";
import ConfirmButton from "../../common/confirmButton";
import DirectoryRequests from "../../../axios/home/directoryRequests";
import { toast } from "react-toastify";
import ModalHeader from "./common/modalHeader";


const CreateDirectoryModal: FC = () => {

    const dispatch: AppDispatch = useDispatch();

    const [newDirectoryName, setNewDirectoryName] = useState<string>('');

    const handleCreateDirectory = (event: React.FormEvent<HTMLElement>) => {
        event.preventDefault();

        DirectoryRequests.createFolder({ folderName: newDirectoryName })
            .then((data) => {
                if(!data.status) {
                    toast.error('Error creating directory')
                    return;
                }

                dispatch(updateCreateDirectoryModalStatus(false));
                toast.success('Directory created');
            });
    }

    return (
        <article className="w-screen h-screen absolute flex items-center justify-center
            bg-black bg-opacity-25">
            
            <dialog className="w-9/12 md:w-6/12 xl:w-4/12 p-5 flex flex-col gap-4 bg-white rounded-md">

                <ModalHeader
                    title="Create Directory"
                    handleClose={() => dispatch(updateCreateDirectoryModalStatus(false))} />

                <form 
                    onSubmit={handleCreateDirectory} 
                    className="w-full flex gap-4 items-center">

                    <TextInputField 
                        value={newDirectoryName} 
                        name='directoryName'
                        placeholder='Directory Name'
                        onChange={(event) => setNewDirectoryName(event.target.value)} />


                    <div className="w-2/12">
                        <ConfirmButton title="Save" />
                    </div>

                </form>

            </dialog>
        
        </article>
    );

}

export default CreateDirectoryModal;