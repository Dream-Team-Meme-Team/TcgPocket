import { Dispatch, configureStore } from '@reduxjs/toolkit';
import dataSlice from './dataSlice';
import deckBuilderSlice from './deckBuilderSlice';
import inventorySlice from './inventorySlice';
import thunkMiddleware from 'redux-thunk';

export const store = configureStore({
    reducer: {
        data: dataSlice,
        inventory: inventorySlice,
        deckBuilder: deckBuilderSlice,
    },
    middleware: [thunkMiddleware],
});

export type AppState = ReturnType<typeof store.getState>;

export const dispatch: Dispatch = store.dispatch;
