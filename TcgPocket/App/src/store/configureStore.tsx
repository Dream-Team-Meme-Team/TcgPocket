import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { dataSlice } from './DataSlice';
import { authSlice } from './authSlice';
import { adminSlice } from './AdminSlice';
import { inventorySlice } from './inventorySlice';

export const appStore = configureStore({
    reducer: {
        user: authSlice.reducer,
        data: dataSlice.reducer,
        admin: adminSlice.reducer,
        inventory: inventorySlice.reducer,
    },
});

export type AppState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;

export const dispatch = appStore.dispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
