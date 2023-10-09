import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './authSlice';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { dataSlice } from './dataSlice';
import { adminSlice } from './adminSlice';

export const appStore = configureStore({
  reducer: {
    user: authSlice.reducer,
    data: dataSlice.reducer,
    admin: adminSlice.reducer,
  },
});

export type AppState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;

export const dispatch = appStore.dispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
