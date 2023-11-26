import { createSlice } from '@reduxjs/toolkit';
import { AttributeGetDto } from '../types/attributes';
import { CardTypeGetDto } from '../types/card-types';
import { GameGetDto } from '../types/games';
import { RarityGetDto } from '../types/rarities';
import { SetGetDto } from '../types/sets';
import { getAllGames } from '../services/dataServices/gameServices';
import { getAllSets } from '../services/dataServices/setServices';
import { getAllCardTypes } from '../services/dataServices/cardTypeServices';
import { getAllRarities } from '../services/dataServices/rarityServices';
import { getAllAttributes } from '../services/dataServices/attributeServices';

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
      state.games = payload.data;
    });
    builder.addCase(getAllSets.fulfilled, (state, { payload }) => {
      state.sets = payload.data;
    });
    builder.addCase(getAllCardTypes.fulfilled, (state, { payload }) => {
      state.cardTypes = payload.data;
    });
    builder.addCase(getAllRarities.fulfilled, (state, { payload }) => {
      state.rarities = payload.data;
    });
    builder.addCase(getAllAttributes.fulfilled, (state, { payload }) => {
      state.attributes = payload.data;
    });
  },
});
