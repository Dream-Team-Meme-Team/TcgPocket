import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { dataSlice } from './dataSlice';
import { authSlice } from './authSlice';
import { adminSlice } from './adminSlice';
import { inventorySlice } from './inventorySlice';
import { deckBuilderSlice } from './deckBuilderSlice';
import { deckSlice } from './deckSlice';

export const appStore = configureStore({
  reducer: {
    user: authSlice.reducer,
    data: dataSlice.reducer,
    admin: adminSlice.reducer,
    inventory: inventorySlice.reducer,
    deck: deckSlice.reducer,
    deckBuilder: deckBuilderSlice.reducer,
  },
});

export type AppState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;

export const dispatch = appStore.dispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
