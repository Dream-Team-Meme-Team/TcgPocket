import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CardDisplayDto } from '../types/cards';
import { PagedResult } from '../types/shared';
import { GameGetDto } from '../types/games';
import { toggleFilters } from '../helpers/toggleFilters';
import { getAllCards } from '../services/CardsService';

export interface InventoryState {
  cardTypeFilters: number[];
  setFilters: number[];
  rarityFilters: number[];
  cards: PagedResult<CardDisplayDto> | null;
  loading: boolean;
  selectedGame: GameGetDto | null;
}

const INITIAL_STATE: InventoryState = {
  cards: null,
  loading: false,
  selectedGame: null,
  cardTypeFilters: [],
  setFilters: [],
  rarityFilters: [],
};

export const inventorySlice = createSlice({
  name: 'Inventory',
  initialState: INITIAL_STATE,
  reducers: {
    toggleCardTypeFilters(
      state,
      { payload }: PayloadAction<InventoryState['cardTypeFilters'][number]>
    ) {
      state.cardTypeFilters = toggleFilters(state.cardTypeFilters, payload);
    },
    toggleSetFilters(
      state,
      { payload }: PayloadAction<InventoryState['setFilters'][number]>
    ) {
      state.setFilters = toggleFilters(state.setFilters, payload);
    },
    toggleRarityFilters(
      state,
      { payload }: PayloadAction<InventoryState['rarityFilters'][number]>
    ) {
      state.rarityFilters = toggleFilters(state.rarityFilters, payload);
    },
    updateSelectedGame(
      state,
      { payload }: PayloadAction<InventoryState['selectedGame']>
    ) {
      state.selectedGame = payload;
    },
    resetFilters(state) {
      state.cardTypeFilters = [];
      state.setFilters = [];
      state.rarityFilters = [];
    },
    resetInventorySlice() {
      return INITIAL_STATE;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCards.fulfilled, (state, { payload }) => {
      state.cards = payload.data;
      state.loading = false;
    });
    builder.addCase(getAllCards.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllCards.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const {
  updateSelectedGame,
  toggleCardTypeFilters,
  toggleRarityFilters,
  toggleSetFilters,
  resetFilters,
  resetInventorySlice,
} = inventorySlice.actions;
