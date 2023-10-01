import { PayloadAction, createSlice } from '@reduxjs/toolkit';
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
  searchTerm: string;
  selectedId: number;
  selectedGameId: number;
  games: GameGetDto[];
  sets: SetGetDto[];
  cardTypes: CardTypeGetDto[];
  rarities: RarityGetDto[];
  attributes: AttributeGetDto[];
};

const initialState: DataState = {
  searchTerm: '',
  selectedId: 0,
  selectedGameId: 0,
  games: [],
  sets: [],
  cardTypes: [],
  rarities: [],
  attributes: [],
};

export const dataSlice = createSlice({
  initialState,
  name: 'data',
  reducers: {
    setAdminSearchTerm(
      state,
      { payload }: PayloadAction<DataState['searchTerm']>
    ) {
      state.searchTerm = payload;
    },
    setSelectedId(state, { payload }: PayloadAction<DataState['selectedId']>) {
      state.selectedId = payload;
    },
    setSelectedGameId(
      state,
      { payload }: PayloadAction<DataState['selectedGameId']>
    ) {
      state.selectedGameId = payload;
    },
  },
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

export const { setAdminSearchTerm, setSelectedId, setSelectedGameId } =
  dataSlice.actions;
