import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './userSlice';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const appStore = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export type AppState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;

export const dispatch = appStore.dispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
