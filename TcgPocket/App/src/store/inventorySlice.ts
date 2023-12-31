import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CardDisplayDto } from '../types/cards';
import { PagedResult } from '../types/shared';
import { GameGetDto } from '../types/games';
import { toggleFilters } from '../helpers/toggleFilters';
import { getAllCards, getUserInventory } from '../services/CardsService';

export enum CardDispatchMode {
  inventory = 'inventory',
  all = 'all',
}

export interface InventoryState {
  searchText: string;
  currentPage: number;
  cardTypeFilters: number[];
  setFilters: number[];
  rarityFilters: number[];
  cards: PagedResult<CardDisplayDto> | null;
  loading: boolean;
  selectedGame: GameGetDto | null;
  cardDispatchMode: CardDispatchMode;
}

const INITIAL_STATE: InventoryState = {
  searchText: '',
  currentPage: 1,
  cards: null,
  loading: false,
  selectedGame: null,
  cardTypeFilters: [],
  setFilters: [],
  rarityFilters: [],
  cardDispatchMode: CardDispatchMode.inventory,
};

export const inventorySlice = createSlice({
  name: 'Inventory',
  initialState: INITIAL_STATE,
  reducers: {
    setCardDispatchAction(
      state,
      { payload }: PayloadAction<InventoryState['cardDispatchMode']>
    ) {
      state.cardDispatchMode = payload;
    },
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
    setInventoryCurrentPage(
      state,
      { payload }: PayloadAction<InventoryState['currentPage']>
    ) {
      state.currentPage = payload;
    },
    setInventorySearchText(
      state,
      { payload }: PayloadAction<InventoryState['searchText']>
    ) {
      state.searchText = payload;
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
    builder.addCase(getUserInventory.fulfilled, (state, { payload }) => {
      state.cards = payload.data;
      state.loading = false;
    });
    builder.addCase(getUserInventory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserInventory.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const {
  setCardDispatchAction,
  updateSelectedGame,
  toggleCardTypeFilters,
  toggleRarityFilters,
  toggleSetFilters,
  setInventoryCurrentPage,
  setInventorySearchText,
  resetFilters,
  resetInventorySlice,
} = inventorySlice.actions;
