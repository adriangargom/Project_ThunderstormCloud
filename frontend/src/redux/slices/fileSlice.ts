import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store";
import { SelectedFileIface } from "../../types/fileTypes";


const initialState: SelectedFileIface = {
    fileName: null
}


export const fileSlice = createSlice({
    name: 'file',
    initialState,
    reducers: {
        setFileName: (state, action: PayloadAction<string>) => {
            state.fileName = action.payload;
        },
        clearFileName: (state) => {
            state.fileName = null;
        }
    }
});


export const { setFileName, clearFileName } = fileSlice.actions;

export const selectPath = (state: RootState) => state.file;

export default fileSlice.reducer;