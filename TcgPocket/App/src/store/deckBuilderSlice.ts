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
  selectedRuleSet: string;
  appliedFilters: CardFilterDto | null;
  searchTerm: string;
}

const INITIAL_STATE: DeckBuilderState = {
  name: 'Untitled',
  pagination: defaultPagination,
  selectedGame: null,
  selectedRuleSet: '',
  appliedFilters: null,
  searchTerm: '',
};

export const deckBuilderSlice = createSlice({
  name: 'Inventory',
  initialState: INITIAL_STATE,
  reducers: {
    setDeckName(state, { payload }: PayloadAction<DeckBuilderState['name']>) {
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
    setDeckBuilderSearchTerm(
      state,
      { payload }: PayloadAction<DeckBuilderState['searchTerm']>
    ) {
      state.searchTerm = payload;
    },
    setSelectedRuleSet(
      state,
      { payload }: PayloadAction<DeckBuilderState['selectedRuleSet']>
    ) {
      state.selectedRuleSet = payload;
    },
  },
  // extraReducers: (builder) => {

  // },
});

export const {
  setDeckName,
  setCurrentPage,
  setPageSize,
  setSelectedDeckBuilderGame,
  setAppliedFilters,
  setDeckBuilderSearchTerm,
  setSelectedRuleSet,
} = deckBuilderSlice.actions;
