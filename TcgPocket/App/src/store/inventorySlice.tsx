import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CardDisplayDto, CardFilterDto } from '../types/cards';
import { CardTypeGetDto } from '../types/card-types';
import { PagedResult } from '../types/shared';
import { getUserInventory } from '../services/CardsService';

const paged: CardFilterDto = {
    currentPage: 1,
    pageSize: 16,
    cardNumber: undefined,
    cardTypeId: undefined,
    description: undefined,
    gameId: undefined,
    id: undefined,
    imageUrl: undefined,
    name: undefined,
    orderBy: 'asc',
    rarityId: undefined,
    setId: undefined,
    sortBy: 'gameId',
};

export interface InventoryState {
    /** the type will need to change */
    appliedFilters: CardTypeGetDto[];
    queryFilters: CardFilterDto | null;
    cards: PagedResult<CardDisplayDto> | null;
    loading: boolean;
    pagedFilters: CardFilterDto;
}

const INITIAL_STATE: InventoryState = {
    appliedFilters: [],
    queryFilters: null,
    cards: null,
    loading: false,
    pagedFilters: paged,
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
        updatePagedFilters(
            state,
            { payload }: PayloadAction<InventoryState['pagedFilters']>
        ) {
            state.pagedFilters = payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getUserInventory.fulfilled, (state, { payload }) => {
            state.cards = payload.data;
            state.loading = false;
        });
        builder.addCase(getUserInventory.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getUserInventory.rejected, (state) => {
            state.loading = false;
        });
    },
});

export const {
    toggleAppliedFilterOnInventory,
    toggleAllFiltersOnInventory,
    removeAllFiltersOnInventory,
    updatePagedFilters,
} = inventorySlice.actions;
