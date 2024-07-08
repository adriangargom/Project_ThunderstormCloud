import { FC } from "react";


interface TextInputFieldIface {
    value: string
    name: string
    placeholder: string
    required?: boolean
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}


const TextInputField: FC<TextInputFieldIface> = (
    { value, name, placeholder, required, onChange }
) => {

    return (
        <input
            value={value} 
            name={name} 
            placeholder={placeholder}
            onChange={onChange} 
            type="text" 
            required={required || false}
            className="w-full p-1 border-2 rounded-md 
            focus:outline-none focus:bg-purple-100"/>
    );

}

export default TextInputField;