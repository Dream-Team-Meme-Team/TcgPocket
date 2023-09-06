import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Games } from '../constants/fakeData/inventoryData';

export interface InventoryState {
    /** the type will need to change */
    appliedFilters: Games[];
}

const INITIAL_STATE: InventoryState = {
    appliedFilters: [],
};

export const inventorySlice = createSlice({
    name: 'Inventory',
    initialState: INITIAL_STATE,
    reducers: {
        toggleAppliedFilter(
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
    },
});

export const { toggleAppliedFilter } = inventorySlice.actions;

export default inventorySlice.reducer;
