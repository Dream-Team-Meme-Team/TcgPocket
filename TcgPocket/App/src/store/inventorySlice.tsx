import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { GameGetDto } from '../types/games';
import { CardFilterDto } from '../types/cards';
import { CardTypeGetDto } from '../types/card-types';

export interface InventoryState {
    /** the type will need to change */
    appliedFilters: CardTypeGetDto[];
    queryFilters: CardFilterDto | null;
}

const INITIAL_STATE: InventoryState = {
    appliedFilters: [],
    queryFilters: null,
};

export const inventorySlice = createSlice({
    name: 'Inventory',
    initialState: INITIAL_STATE,
    reducers: {
        toggleAppliedFilterOnInventory(
            state,
            { payload }: PayloadAction<InventoryState['appliedFilters'][number]>
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
        toggleAllFiltersOnInventory(
            state,
            { payload }: PayloadAction<InventoryState['appliedFilters']>
        ) {
            if (state.appliedFilters.length === 0) {
                payload.forEach((propery) => {
                    state.appliedFilters.push(propery);
                });
            } else state.appliedFilters = [];
        },
        removeAllFiltersOnInventory(state) {
            state.appliedFilters = [];
        },
    },
});

export const {
    toggleAppliedFilterOnInventory,
    toggleAllFiltersOnInventory,
    removeAllFiltersOnInventory,
} = inventorySlice.actions;
