import { FC } from "react";
import UtilsPannel from "./utilsPannel/utilsPannel";
import DirectoriesInfo from "./directoryInfoPannel/directoriesInfo";
import HomeHeaderBar from "./common/homeHeaderBar";
import FilesInfo from "./directoryInfoPannel/filesInfo";
import ModalManager from "./modals/modalManager";


const HomeScreen: FC = () => {

    return (
        <main className="w-full h-full flex flex-col gap-4 select-none">

            <HomeHeaderBar />

            <article className="w-full flex flex-col gap-4 place-items-center justify-center 
                select-none">

                <UtilsPannel />
                <DirectoriesInfo/>
                <FilesInfo />

            </article>

            <ModalManager />

        </main>
    );
    
}

export default HomeScreen;