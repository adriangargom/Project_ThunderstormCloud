import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC } from "react";


interface FilePickerInputFieldIface {
    onChange: (files: React.ChangeEvent<HTMLInputElement>) => void
}


const FilePickerInputField: FC<FilePickerInputFieldIface> = ({ onChange }) => {

    return (
        <section className="border-2 rounded-md border-dashed border-purple-500">

            <input 
                type="file" 
                id="file" 
                className="hidden" 
                multiple
                onInput={onChange} />

            <label 
                htmlFor="file"
                className={`w-full h-20 p-1 px-2 flex gap-2 justify-center items-center 
                text-purple-500 rounded-md
                cursor-pointer transition`}>

                <FontAwesomeIcon icon={faUpload} />
                <h1> Upload File </h1>

            </label>

        </section>
    );

}

export default FilePickerInputField;