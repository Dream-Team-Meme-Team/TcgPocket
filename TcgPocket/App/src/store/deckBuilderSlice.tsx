import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Games } from '../constants/fakeData/inventoryData';

export interface DeckBuilderState {
    appliedFilters: Games[];
}

const INITIAL_STATE: DeckBuilderState = {
    appliedFilters: [],
};

export const deckBuilderSlice = createSlice({
    name: 'Deck Builder',
    initialState: INITIAL_STATE,
    reducers: {
        toggleAppliedFilterOnDeckBuilder(
            state,
            {
                payload,
            }: PayloadAction<DeckBuilderState['appliedFilters'][number]>
        ) {
            const alreadyApplied = state.appliedFilters.some(
                (filter) => filter.id === payload.id
            );

            if (alreadyApplied) {
                state.appliedFilters = state.appliedFilters.filter(
                    (filter) => filter.id !== payload.id
                );
            } else {
                state.appliedFilters.push(payload);
            }
        },
    },
});

export const { toggleAppliedFilterOnDeckBuilder } = deckBuilderSlice.actions;

export default deckBuilderSlice.reducer;
