import { FC } from "react";


interface SelectedFileListIface {
    fileList: FileList
}


const SelectedFileList: FC<SelectedFileListIface> = ({ fileList }) => {

    return (
        <section>

            <ul className="p-2 border-2 rounded-md border-dashed">
                {
                    Array.from(fileList).map((item: File, index: number) => (
                        <li key={index} 
                            className="text-gray-400">
                            
                            { item.name }
                        </li>
                    ))
                }
            </ul>
        
        </section>        
    );

}

export default SelectedFileList;