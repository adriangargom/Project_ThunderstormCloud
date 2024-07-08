import React, { FC } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { colorStyleAttributes, ColorStylesEnum } from "../../enum/colorStylesEnum";


interface ConfirmButtonIface {
    title?: string
    icon?: IconProp,
    buttonType?: "submit" | "reset" | "button" | undefined
    styleType?: ColorStylesEnum
    onClick?: (event: React.MouseEvent<HTMLElement>) => void
}


const ConfirmButton: FC<ConfirmButtonIface> = ({ title, icon, buttonType, styleType, onClick }) => {

    return (
        <button 
            onClick={onClick}
            type={buttonType || 'button'}
            className={`w-full p-1 px-2 flex gap-2 justify-center items-center 
            text-white rounded-md transition
            ${colorStyleAttributes[styleType || ColorStylesEnum.Default]}`}>

            {icon && <FontAwesomeIcon icon={icon} />}
            {title}
        </button>
    );

}

export default ConfirmButton;