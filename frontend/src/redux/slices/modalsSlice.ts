import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ModalsStateIface } from "../../types/modalTypes";


const initialState: ModalsStateIface = {
    createDirectoryModalStatus: false,
    directoryModalStatus: false,
    fileModalStatus: false,
    uploadFileModalStatus: false
}


export const modalsSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        updateCreateDirectoryModalStatus: (state, action: PayloadAction<boolean>) => {
            state.createDirectoryModalStatus = action.payload;
        },
        updateDirectoryModalStatus: (state, action: PayloadAction<boolean>) => {
            state.directoryModalStatus = action.payload;
        },
        updateFileModalStatus: (state, action: PayloadAction<boolean>) => {
            state.fileModalStatus = action.payload;
        },
        updateUploadFileModalStatus: (state, action: PayloadAction<boolean>) => {
            state.uploadFileModalStatus = action.payload;
        }
    }
});


export const { 
    updateCreateDirectoryModalStatus, 
    updateDirectoryModalStatus, 
    updateFileModalStatus,
    updateUploadFileModalStatus
} = modalsSlice.actions;

export const selectPath = (state: RootState) => state.modals;

export default modalsSlice.reducer;