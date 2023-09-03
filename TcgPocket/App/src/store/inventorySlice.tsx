import { createSlice } from '@reduxjs/toolkit';

export interface InventoryState {
    /** the type will need to change */
    appliedFilters: string[];
    /** string, File, HTMLImageElement ? */
    uploadedCards: string[];
    selectedCard: string;
}

const INITIAL_STATE: InventoryState = {
    appliedFilters: [],
    uploadedCards: [],
    selectedCard: '',
};

export const inventorySlice = createSlice({
    name: 'Inventory',
    initialState: INITIAL_STATE,
    reducers: {},
});
