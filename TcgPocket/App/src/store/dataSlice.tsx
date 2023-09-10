import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fakeGames } from '../constants/fakeData/fakeGames';
import { GameProperty } from '../models/GameProperty';
import { GameDTO } from '../models/Game';
import { fakeCardTypes } from '../constants/fakeData/fakeCardTypes';
import { fakeRarities } from '../constants/fakeData/fakeRarities';
import { fakeSets } from '../constants/fakeData/fakeSets';

/**
 *
 * Will need to rename this file to something better.
 * Main purpose is to hold the state for the card properties such
 * as games, rarity, set, cardType, etc...
 *
 */

export interface DataState {
    games: GameDTO[];
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
