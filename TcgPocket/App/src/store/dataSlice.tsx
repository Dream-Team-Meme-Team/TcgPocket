import { createSlice } from '@reduxjs/toolkit';
import { AttributeGetDto } from '../types/attributes';
import { CardTypeGetDto } from '../types/card-types';
import { GameGetDto } from '../types/games';
import { RarityGetDto } from '../types/rarities';
import { SetGetDto } from '../types/sets';
import { getAllGames } from '../services/dataServices/GameServices';
import { getAllSets } from '../services/dataServices/SetServices';
import { getAllCardTypes } from '../services/dataServices/CardTypeServices';
import { getAllRarities } from '../services/dataServices/RarityServices';
import { getAllAttributes } from '../services/dataServices/AttributeServices';

type DataState = {
  games: GameGetDto[];
  sets: SetGetDto[];
  cardTypes: CardTypeGetDto[];
  rarities: RarityGetDto[];
  attributes: AttributeGetDto[];
};

const initialState: DataState = {
  games: [],
  sets: [],
  cardTypes: [],
  rarities: [],
  attributes: [],
};

export const dataSlice = createSlice({
  initialState,
  name: 'data',
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllGames.fulfilled, (state, { payload }) => {
      if (!payload.data) {
        state.games = [];
      } else state.games = payload.data;
    });
    builder.addCase(getAllSets.fulfilled, (state, { payload }) => {
      if (!payload.data) {
        state.sets = [];
      } else state.sets = payload.data;
    });
    builder.addCase(getAllCardTypes.fulfilled, (state, { payload }) => {
      if (!payload.data) {
        state.cardTypes = [];
      } else state.cardTypes = payload.data;
    });
    builder.addCase(getAllRarities.fulfilled, (state, { payload }) => {
      if (!payload.data) {
        state.rarities = [];
      } else state.rarities = payload.data;
    });
    builder.addCase(getAllAttributes.fulfilled, (state, { payload }) => {
      if (!payload.data) {
        state.attributes = [];
      } else state.attributes = payload.data;
    });
  },
});