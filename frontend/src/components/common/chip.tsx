import { FC } from "react"
import { chipStyleAttributes, ChipStylesEnum } from "../../enum/chipStylesEnum"

interface ChipIface {
    title: string
    styleType?: ChipStylesEnum
    onClick?: () => void
}


const Chip: FC<ChipIface> = ({ title, styleType, onClick }) => {

    return (
        <section 
            onClick={onClick}
            className={`p-1 px-2 rounded-md flex align-middle justify-center 
            ${chipStyleAttributes[styleType || ChipStylesEnum.Static]}`}>
            
            <h1 className="text-sm text-white font-bold">
                {title}
            </h1>

        </section>
    );

}

export default Chip;