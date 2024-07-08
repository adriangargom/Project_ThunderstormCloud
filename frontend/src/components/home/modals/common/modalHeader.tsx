import { FC } from "react";
import CloseButton from "../../../common/closeButton";


interface ModalHeaderIface {
    title: string
    handleClose: () => void
}


const ModalHeader: FC<ModalHeaderIface> = ({ title, handleClose }) => {

    return (
        <header className="flex flex-col gap-2">

            <section className="flex gap-4">

                <h1 className="w-full text-xl text-slate-400">
                    {title}
                </h1>

                <div className="w-2/12 flex items-center justify-end">
                    <CloseButton onClick={handleClose} />
                </div>

            </section>

            <hr className="border-2 rounded-md" />

        </header>
    );
}

export default ModalHeader;