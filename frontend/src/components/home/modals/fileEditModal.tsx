import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import FileRequests from "../../../axios/home/fileRequests";
import { toast } from "react-toastify";
import CloseButton from "../../common/closeButton";
import { updateFileModalStatus } from "../../../redux/slices/modalsSlice";
import TextInputField from "../../common/textInputField";
import LargeTextInputField from "../../common/largeTextInputField";
import ConfirmButton from "../../common/confirmButton";
import { faDownload, faTrash, faSave } from "@fortawesome/free-solid-svg-icons";
import { ColorStylesEnum } from "../../../enum/colorStylesEnum";
import { FileDataIface } from "../../../types/fileTypes";


const FileEditModal: FC = () => {

    const dispatch: AppDispatch = useDispatch();

    const selectedFileName = useSelector((state: RootState) => state.file.fileName);

    const [fileData, setFileData] = useState<FileDataIface>({name: '', content: ''});

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        event.preventDefault();
        const {name, value} = event.target;

        setFileData({
            ...fileData,
            [name]: value
        })
    }

    const handleDelete = () => {
        FileRequests.deleteFile()
            .then((data) => {
                if(!data.status) {
                    toast.error('Error deleting file');
                    return;
                }

                dispatch(updateFileModalStatus(false));
                toast.success('File deleted successfully');
            });
    }

    const handleDownload = () => {
        FileRequests.downloadFile()
            .then((data) => {
                if(!data) {
                    toast.error('Error downloading file');
                    return;
                }

                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(data);
                link.download = fileData.name;
                link.click();
            });
    }

    const handleRenameFile = (event: React.FormEvent<HTMLElement>) => {
        event.preventDefault();

        FileRequests.renameFile(fileData.name)
            .then((data) => {
                if(!data.status) {
                    toast.error('Error renaming file');
                    return;
                }

                dispatch(updateFileModalStatus(false));
                toast.success('File successfully renamed');
            });
    }

    useEffect(() => {
        if(typeof selectedFileName !== 'string') return;

        FileRequests.getFileContent()
            .then((data) => {
                if(!data.status) {
                    toast.error('Error fetching file data');
                    return;
                }

                setFileData(data.message);
            });

    }, [selectedFileName])

    return (

        <article className="w-screen h-screen absolute flex items-center justify-center
            bg-black bg-opacity-25">
            
            <dialog className="w-9/12 md:w-8/12 xl:w-4/12 p-5 flex flex-col gap-4 bg-white rounded-md">

                <form className="flex flex-col gap-4">

                    <section className="flex gap-4">

                        <TextInputField
                            value={fileData.name}
                            name="name"
                            placeholder="File Name"
                            onChange={handleChange} />

                        <div className="w-2/12 flex items-center justify-end">
                            <CloseButton onClick={() => dispatch(updateFileModalStatus(false))} />
                        </div>

                    </section>

                    <section>

                        <LargeTextInputField
                            value={fileData.content}
                            name="content"
                            placeholder="File Content"
                            onChange={handleChange} />

                    </section>

                    <section className="flex flex-wrap sm:flex-nowrap gap-4">

                        <ConfirmButton
                            title="Delete"
                            icon={faTrash} 
                            styleType={ColorStylesEnum.Danger}
                            onClick={handleDelete} />

                        <ConfirmButton
                            title="Download"
                            icon={faDownload} 
                            onClick={handleDownload}/>

                        <ConfirmButton
                            title="Save"
                            icon={faSave} 
                            buttonType="submit"
                            onClick={handleRenameFile} />
                            
                    </section>

                </form>

            </dialog>

        </article>
    );

}

export default FileEditModal;