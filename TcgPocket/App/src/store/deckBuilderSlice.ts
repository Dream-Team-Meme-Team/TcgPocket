import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { GameGetDto } from '../types/games';
import { CardDisplayDto } from '../types/cards';
import { toggleFilters } from '../helpers/toggleFilters';
import { PagedResult } from '../types/shared';
import { getAllCards } from '../services/CardsService';

export const untitledName: string = 'Untitled';

export interface DeckBuilderState {
  deck: CardDisplayDto[];
  draggedCard: CardDisplayDto | null;
  /** deck dto things */
  name: string;
  cards: PagedResult<CardDisplayDto> | null;
  loading: boolean;
  selectedGame: GameGetDto | null;
  selectedRuleSet: string;
  /** deck builder inventory */
  searchTerm: string;
  currentPage: number;
  pageSize: number;
  cardTypeFilters: number[];
  setFilters: number[];
  rarityFilters: number[];
}

const INITIAL_STATE: DeckBuilderState = {
  name: untitledName,
  selectedGame: null,
  selectedRuleSet: '',
  searchTerm: '',
  cards: null,
  loading: false,
  deck: [],
  draggedCard: null,
  cardTypeFilters: [],
  setFilters: [],
  rarityFilters: [],
  currentPage: 1,
  pageSize: 15,
};

export const deckBuilderSlice = createSlice({
  name: 'Inventory',
  initialState: INITIAL_STATE,
  reducers: {
    setDraggedCard(
      state,
      { payload }: PayloadAction<DeckBuilderState['draggedCard']>
    ) {
      state.draggedCard = payload;
    },
    setDeckName(state, { payload }: PayloadAction<DeckBuilderState['name']>) {
      state.name = payload;
    },
    setSelectedDeckBuilderGame(
      state,
      { payload }: PayloadAction<DeckBuilderState['selectedGame']>
    ) {
      state.selectedGame = payload;
    },
    setDeckBuilderSearchTerm(
      state,
      { payload }: PayloadAction<DeckBuilderState['searchTerm']>
    ) {
      state.searchTerm = payload;
    },
    setDeckBuilderCurrentPage(
      state,
      { payload }: PayloadAction<DeckBuilderState['currentPage']>
    ) {
      state.currentPage = payload;
    },
    setDeckBuilderPageSize(
      state,
      { payload }: PayloadAction<DeckBuilderState['pageSize']>
    ) {
      state.pageSize = payload;
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
    toggleDeckBuilderCardTypeFilters(
      state,
      { payload }: PayloadAction<DeckBuilderState['cardTypeFilters'][number]>
    ) {
      state.cardTypeFilters = toggleFilters(state.cardTypeFilters, payload);
    },
    toggleDeckBuilderSetFilters(
      state,
      { payload }: PayloadAction<DeckBuilderState['setFilters'][number]>
    ) {
      state.setFilters = toggleFilters(state.setFilters, payload);
    },
    toggleDeckBuilderRarityFilters(
      state,
      { payload }: PayloadAction<DeckBuilderState['rarityFilters'][number]>
    ) {
      state.rarityFilters = toggleFilters(state.rarityFilters, payload);
    },
    resetDeckBuilder() {
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
  setDeckName,
  setSelectedDeckBuilderGame,
  setDeckBuilderSearchTerm,
  setSelectedRuleSet,
  resetDeckBuilder,
  setDeck,
  toggleDeckBuilderCardTypeFilters,
  toggleDeckBuilderSetFilters,
  toggleDeckBuilderRarityFilters,
  setDeckBuilderCurrentPage,
  setDeckBuilderPageSize,
  setDraggedCard,
} = deckBuilderSlice.actions;
