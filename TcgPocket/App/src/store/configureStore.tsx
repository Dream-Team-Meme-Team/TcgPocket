import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './userSlice';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { inventorySlice } from './inventorySlice';
import { dataSlice } from './dataSlice';

export const appStore = configureStore({
    reducer: {
        user: userSlice.reducer,
        data: dataSlice.reducer,
        inventory: inventorySlice.reducer,
    },
});

export type AppState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;

export const dispatch = appStore.dispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
