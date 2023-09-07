import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Games } from '../constants/fakeData/inventoryData';

export interface InventoryState {
    /** the type will need to change */
    appliedFilters: Games[];
    otherProperty: string;
}

const INITIAL_STATE: InventoryState = {
    appliedFilters: [],
    otherProperty: '',
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
        removeAllFiltersOnInventory(state) {
            state.appliedFilters = [];
        },
    },
});

export const { toggleAppliedFilterOnInventory, removeAllFiltersOnInventory } =
    inventorySlice.actions;

export default inventorySlice.reducer;
