import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PageDto, PagedResult } from '../types/shared';
import { GameGetDto } from '../types/games';
import { CardDisplayDto, CardFilterDto } from '../types/cards';
import { getAllCards } from '../services/CardsService';

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
  cards: PagedResult<CardDisplayDto> | null;
  deck: CardDisplayDto[];
}

const INITIAL_STATE: DeckBuilderState = {
  name: 'Untitled',
  pagination: defaultPagination,
  selectedGame: null,
  selectedRuleSet: '',
  appliedFilters: null,
  searchTerm: '',
  cards: null,
  deck: [],
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
    setDeck(state, { payload }: PayloadAction<DeckBuilderState['deck']>) {
      state.deck = payload;
    },
    setSelectedRuleSet(
      state,
      { payload }: PayloadAction<DeckBuilderState['selectedRuleSet']>
    ) {
      state.selectedRuleSet = payload;
    },
    resetDeckBuilder() {
      return INITIAL_STATE;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCards.fulfilled, (state, { payload }) => {
      state.cards = payload.data;
    });
  },
});

export const {
  setDeckName,
  setCurrentPage,
  setPageSize,
  setSelectedDeckBuilderGame,
  setAppliedFilters,
  setDeckBuilderSearchTerm,
  setSelectedRuleSet,
  resetDeckBuilder,
  setDeck,
} = deckBuilderSlice.actions;
