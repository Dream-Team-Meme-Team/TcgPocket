import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
    GameProperty,
    Games,
    fakeCardTypes,
    fakeGames,
    fakeRarities,
    fakeSets,
} from '../constants/fakeData/inventoryData';

/**
 *
 * Will need to rename this file to something better.
 * Main purpose is to hold the state for the card properties such
 * as games, rarity, set, cardType, etc...
 *
 */

export interface DataState {
    games: Games[];
    cardTypes: GameProperty[];
    sets: GameProperty[];
    rarities: GameProperty[];
}

const INITIAL_STATE: DataState = {
    games: fakeGames,
    cardTypes: fakeCardTypes,
    rarities: fakeRarities,
    sets: fakeSets,
};

export const dataSlice = createSlice({
    name: 'data',
    initialState: INITIAL_STATE,
    reducers: {
        addGame(state, { payload }: PayloadAction<DataState['games'][0]>) {
            state.games.push(payload);
        },
    },
});

export const { addGame } = dataSlice.actions;

export default dataSlice.reducer;
