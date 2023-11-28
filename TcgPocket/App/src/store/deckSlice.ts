import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type DeckState = {
  searchTerm: string;
  selectedDeckId: number;
  selectedTab: string | null;
};

const initialState: DeckState = {
  searchTerm: '',
  selectedDeckId: 0,
  selectedTab: null,
};

export const deckSlice = createSlice({
  initialState,
  name: 'deck',
  reducers: {
    setDeckSearchTerm(
      state,
      { payload }: PayloadAction<DeckState['searchTerm']>
    ) {
      state.searchTerm = payload;
    },
    setSelectedDeckId(
      state,
      { payload }: PayloadAction<DeckState['selectedDeckId']>
    ) {
      state.selectedDeckId = payload;
    },
    setSelectedDeckTab(
      state,
      { payload }: PayloadAction<DeckState['selectedTab']>
    ) {
      state.selectedTab = payload;
    },
  },
});

export const { setDeckSearchTerm, setSelectedDeckId, setSelectedDeckTab } =
  deckSlice.actions;
