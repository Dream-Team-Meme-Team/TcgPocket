import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PageDto } from '../types/shared';
import { GameGetDto } from '../types/games';
import { CardFilterDto } from '../types/cards';

const defaultPagination: PageDto = {
  currentPage: 1,
  pageSize: 16,
};

export interface DeckBuilderState {
  name: string;
  pagination: PageDto;
  selectedGame: GameGetDto | null;
  appliedFilters: CardFilterDto | null;
}

const INITIAL_STATE: DeckBuilderState = {
  name: 'Untitled',
  pagination: defaultPagination,
  selectedGame: null,
  appliedFilters: null,
};

export const deckBuilderSlice = createSlice({
  name: 'Inventory',
  initialState: INITIAL_STATE,
  reducers: {
    setName(state, { payload }: PayloadAction<DeckBuilderState['name']>) {
      state.name = payload;
    },
    setCurrentPage(
      state,
      { payload }: PayloadAction<DeckBuilderState['pagination']['currentPage']>
    ) {
      state.pagination.currentPage = payload;
    },
    setPageSize(
      state,
      { payload }: PayloadAction<DeckBuilderState['pagination']['pageSize']>
    ) {
      state.pagination.pageSize = payload;
    },
    setSelectedDeckBuilderGame(
      state,
      { payload }: PayloadAction<DeckBuilderState['selectedGame']>
    ) {
      state.selectedGame = payload;
    },
    setAppliedFilters(
      state,
      { payload }: PayloadAction<DeckBuilderState['appliedFilters']>
    ) {
      state.appliedFilters = payload;
    },
  },
  // extraReducers: (builder) => {

  // },
});

export const {
  setName,
  setCurrentPage,
  setPageSize,
  setSelectedDeckBuilderGame,
  setAppliedFilters,
} = deckBuilderSlice.actions;
