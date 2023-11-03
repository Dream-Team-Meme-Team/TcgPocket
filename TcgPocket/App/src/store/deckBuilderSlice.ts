import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface DeckBuilderState {
  name: string;
}

const INITIAL_STATE: DeckBuilderState = {
  name: 'Untitled',
};

export const deckBuilderSlice = createSlice({
  name: 'Inventory',
  initialState: INITIAL_STATE,
  reducers: {
    setName(state, { payload }: PayloadAction<DeckBuilderState['name']>) {
      state.name = payload;
    },
  },
  // extraReducers: (builder) => {

  // },
});

export const { setName } = deckBuilderSlice.actions;
