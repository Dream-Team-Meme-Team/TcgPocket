import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CardDisplayDto, CardFilterDto } from '../types/cards';
import { PagedResult } from '../types/shared';
import { GameGetDto } from '../types/games';
import { toggleFilters } from '../helpers/toggleFilters';
import { getAllCards } from '../services/CardsService';

const paged: CardFilterDto = {
  currentPage: 1,
  pageSize: 16,
  cardNumber: undefined,
  cardTypeIds: undefined,
  description: undefined,
  gameIds: undefined,
  id: undefined,
  imageUrl: undefined,
  name: undefined,
  orderBy: 'asc',
  rarityIds: undefined,
  setIds: undefined,
  sortBy: 'gameId',
};

export interface InventoryState {
  searchText: string;
  cardTypeFilters: number[];
  setFilters: number[];
  rarityFilters: number[];
  cards: PagedResult<CardDisplayDto> | null;
  loading: boolean;
  pagedFilters: CardFilterDto;
  selectedGame: GameGetDto | null;
}

const INITIAL_STATE: InventoryState = {
  searchText: '',
  cards: null,
  loading: false,
  pagedFilters: paged,
  selectedGame: null,
  cardTypeFilters: [],
  setFilters: [],
  rarityFilters: [],
};

export const inventorySlice = createSlice({
  name: 'Inventory',
  initialState: INITIAL_STATE,
  reducers: {
    resetFilters(state) {
      state.cardTypeFilters = [];
      state.setFilters = [];
      state.rarityFilters = [];
    },
    setSearchTextInventory(
      state,
      { payload }: PayloadAction<InventoryState['searchText']>
    ) {
      state.searchText = payload;
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
    updatePagedFilters(
      state,
      { payload }: PayloadAction<InventoryState['pagedFilters']>
    ) {
      state.pagedFilters = payload;
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
  setSearchTextInventory,
  updatePagedFilters,
  updateSelectedGame,
  toggleCardTypeFilters,
  toggleRarityFilters,
  toggleSetFilters,
  resetFilters,
} = inventorySlice.actions;
