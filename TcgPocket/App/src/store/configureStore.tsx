import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './authSlice';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const appStore = configureStore({
  reducer: {
    user: authSlice.reducer,
  },
});

export type AppState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;

export const dispatch = appStore.dispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
