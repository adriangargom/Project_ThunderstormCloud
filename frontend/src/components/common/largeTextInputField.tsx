import { FC } from "react";


interface LargeTextInputFieldIface {
    value: string
    name: string
    placeholder: string
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}


const LargeTextInputField: FC<LargeTextInputFieldIface> = (
    { value, name, placeholder, onChange }
) => {

    return (
        <textarea
            value={value} 
            name={name} 
            placeholder={placeholder}
            onChange={onChange} 
            readOnly 
            disabled
            className="w-full h-60 max-h-[40rem] p-1 border-2 rounded-md text-wrap
            focus:outline-none"/>
    );

}

export default LargeTextInputField;