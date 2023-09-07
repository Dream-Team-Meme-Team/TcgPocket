import { Dispatch, configureStore } from '@reduxjs/toolkit';
import dataSlice from './dataSlice';
import deckBuilderSlice from './deckBuilderSlice';
import inventorySlice from './inventorySlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
    reducer: {
        data: dataSlice,
        inventory: inventorySlice,
        deckBuilder: deckBuilderSlice,
    },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const dispatch: Dispatch = store.dispatch;
