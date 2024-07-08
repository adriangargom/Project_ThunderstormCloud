import React, { FC } from "react";
import TextInputField from "../../common/textInputField";
import { faPlus, faUpload } from "@fortawesome/free-solid-svg-icons";
import ConfirmButton from "../../common/confirmButton";
import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { updateCreateDirectoryModalStatus, updateUploadFileModalStatus } from "../../../redux/slices/modalsSlice";
import { setSearchBarFilter } from "../../../redux/slices/filterSlice";


const UtilsPannel: FC = () => {

    const searchBarFilter = useSelector((state: RootState) => state.filter.searchBar);

    const dispatch: AppDispatch = useDispatch();

    const handleSearchBarInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const formattedSearchInput = event.target.value.toLowerCase();
        dispatch(setSearchBarFilter(formattedSearchInput));
    }

    return (
        <section className="w-10/12 p-2 border-2 rounded-md bg-gray">
            
            <TextInputField 
                value={searchBarFilter} 
                name='search' 
                placeholder='Search' 
                onChange={handleSearchBarInput} />

            <article className="flex gap-2 mt-4">

                <div className="max-w-80">
                    <ConfirmButton 
                        title='Create Directory' 
                        icon={faPlus} 
                        onClick={() => dispatch(updateCreateDirectoryModalStatus(true))}/>
                </div>

                <div>
                    <ConfirmButton
                        title="Upload"
                        icon={faUpload}
                        onClick={() => dispatch(updateUploadFileModalStatus(true))}/>
                </div>

            </article>

        </section>
    );

}

export default UtilsPannel;