import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export type AppState = ReturnType<typeof store.getState>;

export const dispatch = store.dispatch;
