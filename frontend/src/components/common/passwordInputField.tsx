import { FC, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";


interface PasswordInputFieldIface {
    value: string
    name: string
    placeholder?: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}


const PasswordInputField: FC<PasswordInputFieldIface> = ({ value, name, placeholder, onChange }) => {

    const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);

    return (
        <section className="flex gap-2">

            <input
                value={value} 
                name={name} 
                placeholder={placeholder || "Password"}
                onChange={onChange} 
                type={(passwordVisibility ? "text" : "password")}
                required
                className="w-full p-1 border-2 rounded-md 
                focus:outline-none focus:bg-purple-100"/>


            <div 
                onClick={() => setPasswordVisibility(!passwordVisibility)}
                className="w-2/12 flex items-center justify-center 
                border-2 rounded-md hover:bg-purple-100 transition">

                <FontAwesomeIcon
                    icon={(passwordVisibility) ? faEye : faEyeSlash}
                    className="text-purple-500" />

            </div>

        </section>
    );

}

export default PasswordInputField;