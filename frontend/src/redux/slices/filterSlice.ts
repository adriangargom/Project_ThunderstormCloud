import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { FilterIface } from "../../types/filterTypes";


const initialState: FilterIface = {
    searchBar: '',
}


export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSearchBarFilter: (state, action: PayloadAction<string>) => {
            state.searchBar = action.payload;
        }
    }
});


export const { setSearchBarFilter } = filterSlice.actions;

export const selectPath = (state: RootState) => state.filter;

export default filterSlice.reducer;