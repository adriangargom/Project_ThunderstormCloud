import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FC } from "react";


export interface CloseButtonIface {
    onClick: () => void
}


const CloseButton: FC<CloseButtonIface> = ({ onClick }) => {
    return (
        <FontAwesomeIcon
            icon={faClose}
            onClick={() => onClick()}
            className="text-2xl text-slate-400 hover:text-purple-500 
            hover:rotate-180 transition cursor-pointer" />
    );
}

export default CloseButton;