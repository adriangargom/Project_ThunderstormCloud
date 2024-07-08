import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import ConfirmButton from "../../common/confirmButton";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { setFileName } from "../../../redux/slices/fileSlice";
import { updateFileModalStatus } from "../../../redux/slices/modalsSlice";
import { ColorStylesEnum } from "../../../enum/colorStylesEnum";


const FilesInfo: FC = () => {

    const dispatch: AppDispatch = useDispatch();

    const searchBarData = useSelector((state: RootState) => state.filter.searchBar);
    const {actualDirectoryData} = useSelector((state: RootState) => state.directory);

    const filteredFiles = actualDirectoryData.files.filter((item: string) => 
        item.toLowerCase().includes(searchBarData)
    )

    const handleFileSelection = (fileName: string) => {
        dispatch(setFileName(fileName));
        dispatch(updateFileModalStatus(true));
    }

    return (
        <section className="w-10/12 p-2 flex flex-col gap-2 border-2 rounded-md bg-gray">

            {
                /* Message in case that the directory is empty */
                filteredFiles.length <= 0 && (
                    <article className="w-full flex items-center justify-center text-center">
                        <h1 className="text-slate-500"> Empty Directory </h1>
                    </article>
                )
            }

            {
                /* List that contains all the filtered files inside of the actual directory */
                filteredFiles.length > 0 && (
                    <article className="w-full flex gap-2">

                        {
                            filteredFiles.map((item: string, index: number) => {
                                return (
                                    <div key={index}>
                                        <ConfirmButton
                                            title={item}
                                            icon={faFile}
                                            styleType={ColorStylesEnum.DefaultLight}
                                            onClick={() => handleFileSelection(item)} />
                                    </div>
                                );
                            })
                        }

                    </article>
                )
            }
            
        </section>
    );

}

export default FilesInfo;