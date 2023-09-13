import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fakeCardTypes } from '../constants/fakeData/fakeCardTypes';
import { fakeRarities } from '../constants/fakeData/fakeRarities';
import { fakeSets } from '../constants/fakeData/fakeSets';
import { GameGetDto } from '../types/games';
import { CardTypeGetDto } from '../types/card-types';
import { SetGetDto } from '../types/sets';
import { RarityGetDto } from '../types/rarities';
import axios from 'axios';

/**
 *
 * Will need to rename this file to something better.
 * Main purpose is to hold the state for the card properties such
 * as games, rarity, set, cardType, etc...
 *
 */

export const getGames = createAsyncThunk<GameGetDto[], void>(
    'api/games',
    async () => {
        const { data } = await axios.get<GameGetDto[]>(
            `${import.meta.env.VITE_BASE_API_URL}games`
        );
        return data;
    }
);

export interface DataState {
    games: GameGetDto[];
    cardTypes: CardTypeGetDto[];
    sets: SetGetDto[];
    rarities: RarityGetDto[];
}

const INITIAL_STATE: DataState = {
    games: [],
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
    extraReducers: (builder) => {
        builder.addCase(getGames.fulfilled, (state, { payload }) => {
            state.games = payload;
        });
    },
});

export const { addGame } = dataSlice.actions;

export default dataSlice.reducer;
