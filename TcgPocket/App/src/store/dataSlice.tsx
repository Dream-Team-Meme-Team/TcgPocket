import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AttributeGetDto } from '../types/attributes';
import { CardTypeGetDto } from '../types/card-types';
import { GameGetDto } from '../types/games';
import { RarityGetDto } from '../types/rarities';
import { SetGetDto } from '../types/sets';
import { getAllGames } from '../services/DataServices';

type DataState = {
  searchTerm: string;
  selectedId: number;
  games: GameGetDto[];
  sets: SetGetDto[];
  cardTypes: CardTypeGetDto[];
  rarities: RarityGetDto[];
  attributes: AttributeGetDto[];
};

const initialState: DataState = {
  searchTerm: '',
  selectedId: 0,
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
  },
  extraReducers: (builder) => {
    builder.addCase(getAllGames.fulfilled, (state, { payload }) => {
      state.games = payload.data;
    });
  },
});

export const { setAdminSearchTerm, setSelectedId } = dataSlice.actions;
