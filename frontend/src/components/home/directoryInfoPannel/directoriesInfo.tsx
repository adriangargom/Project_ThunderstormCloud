import { useEffect } from "react";
import DirectoryRequests from "../../../axios/home/directoryRequests";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { popDirectory, pushDirectory, setDirectoryData } from "../../../redux/slices/directorySlice";
import { toast } from "react-toastify";
import ConfirmButton from "../../common/confirmButton";
import { faFolder, faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import DirectoryProgressBar from "./directoryProgressBar";


const DirectoriesInfo = () => {

    const dispatch: AppDispatch = useDispatch();

    const modalsStatus = useSelector((state: RootState) => state.modals);

    const searchBarData = useSelector((state: RootState) => state.filter.searchBar);

    const { actualDirectoryPath, actualDirectoryData } = useSelector((state: RootState) => state.directory);

    const filteredDirectories = actualDirectoryData.folders.filter((item: string) => 
        item.toLowerCase().includes(searchBarData)
    );
    
    useEffect(() => {
        DirectoryRequests.getFolderContents()
            .then((data) => {
                if(!data.status) {
                    toast.error('Error fetching directories');
                    return;
                }

                dispatch(setDirectoryData(data.message))
            });
            
    }, [actualDirectoryPath, modalsStatus]);

    return (
        <section className="w-10/12 p-2 flex flex-col gap-2 border-2 rounded-md bg-gray">

            <DirectoryProgressBar />

            <section className="w-full flex gap-2">

                {
                    /* Directory Back Navigation button*/
                    actualDirectoryPath.length > 0 && (
                        <div>
                            <ConfirmButton 
                                icon={faCaretLeft} 
                                title=".." 
                                onClick={() => dispatch(popDirectory())} />
                        </div>
                    )
                }
                 
                {
                    /* Filtered directories list based on the applied filters */
                    filteredDirectories.map((item: string, index: number) => {
                        return (
                            <div key={index}>
                                <ConfirmButton 
                                    title={item} 
                                    icon={faFolder} 
                                    onClick={() => dispatch(pushDirectory(item))} />
                            </div>
                        );
                    })
                }

            </section>

        </section>
    );

}

export default DirectoriesInfo;