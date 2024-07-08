import { configureStore } from "@reduxjs/toolkit";
import directoryReducer from './slices/directorySlice';
import fileReducer from './slices/fileSlice';
import modalsReducer from './slices/modalsSlice';
import filterReducer from './slices/filterSlice';


export const store = configureStore({
    reducer: {
        directory: directoryReducer,
        file: fileReducer,
        modals: modalsReducer,
        filter: filterReducer
    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;