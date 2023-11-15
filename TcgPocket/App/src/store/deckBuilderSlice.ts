import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { GameGetDto } from '../types/games';
import { CardDisplayDto } from '../types/cards';
import { toggleFilters } from '../helpers/toggleFilters';
import { PagedResult } from '../types/shared';
import { getAllCards } from '../services/CardsService';

export const untitledName: string = 'Untitled';

export interface DeckBuilderState {
  name: string;
  selectedGame: GameGetDto | null;
  selectedRuleSet: string;
  searchTerm: string;
  cards: PagedResult<CardDisplayDto> | null;
  loading: boolean;
  deck: CardDisplayDto[];
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
  cardTypeFilters: [],
  setFilters: [],
  rarityFilters: [],
};

export const deckBuilderSlice = createSlice({
  name: 'Inventory',
  initialState: INITIAL_STATE,
  reducers: {
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
} = deckBuilderSlice.actions;
