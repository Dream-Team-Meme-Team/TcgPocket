import { configureStore } from '@reduxjs/toolkit';
import { inventorySlice } from './inventorySlice';
import { dataSlice } from './dataSlice';

export const store = configureStore({
    reducer: {
        data: dataSlice.reducer,
        inventory: inventorySlice.reducer,
    },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
