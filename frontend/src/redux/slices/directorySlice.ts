import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { DirectoryDataIface, DirectoryStateIface } from "../../types/directoryTypes";


const initialState: DirectoryStateIface = {
    actualDirectoryPath: [],
    actualDirectoryData: {
        files: [],
        folders: [],
        path: ''
    }
}


export const directorySlice = createSlice({
    name: 'directory',
    initialState,
    reducers: {
        pushDirectory: (state, action: PayloadAction<string>) => {
            state.actualDirectoryPath.push(action.payload);
        },
        popDirectory: (state) => {
            if(state.actualDirectoryPath.length > 0) {
                state.actualDirectoryPath.pop();
            }
        },
        setDirectoryData: (state, action: PayloadAction<DirectoryDataIface>) => {
            state.actualDirectoryData = action.payload;
        }
    }
});


export const { pushDirectory, popDirectory, setDirectoryData } = directorySlice.actions;

export const selectPath = (state: RootState) => state.directory;

export default directorySlice.reducer;