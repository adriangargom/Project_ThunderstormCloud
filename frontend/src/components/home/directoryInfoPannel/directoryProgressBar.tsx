import { FC } from "react";
import Chip from "../../common/chip";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { updateDirectoryModalStatus } from "../../../redux/slices/modalsSlice";
import { ChipStylesEnum } from "../../../enum/chipStylesEnum";


const DirectoryProgressBar: FC = () => {
    
    const dispatch: AppDispatch = useDispatch();

    const { actualDirectoryPath } = useSelector((state: RootState) => state.directory);
    
    return (
        <article className="w-full flex gap-2">

            <Chip title="/"/>

            {
                actualDirectoryPath.map((item: string, index: number) => {
                    return (
                        <section 
                            key={index} 
                            className="flex gap-2 align-middle justify-center items-center">
                            
                            <FontAwesomeIcon icon={faCaretRight} />
                            
                            {
                                (actualDirectoryPath.length-1 === index)
                                    ? ( 
                                        <Chip 
                                            title={item}
                                            styleType={ChipStylesEnum.Dynamic} 
                                            onClick={() => dispatch(updateDirectoryModalStatus(true))} /> 
                                    )
                                    : ( 
                                        <Chip title={item} /> 
                                    )
                            }

                        </section>
                    );
                })
            }

        </article>
    );

}

export default DirectoryProgressBar;