import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CardDisplayDto, CardFilterDto } from '../types/cards';
import { PagedResult } from '../types/shared';
import { getAllCards } from '../services/CardsService';
import { GameGetDto } from '../types/games';
import { toggleFilters } from '../helpers/toggleFilters';

const paged: CardFilterDto = {
    currentPage: 1,
    pageSize: 16,
    cardNumber: undefined,
    cardTypeIds: undefined,
    description: undefined,
    gameIds: undefined,
    id: undefined,
    imageUrl: undefined,
    name: undefined,
    orderBy: 'asc',
    rarityIds: undefined,
    setIds: undefined,
    sortBy: 'gameId',
};

export interface InventoryState {
    cardTypeFilters: number[];
    setFilters: number[];
    rarityFilters: number[];
    cards: PagedResult<CardDisplayDto> | null;
    loading: boolean;
    pagedFilters: CardFilterDto;
    selectedGame: GameGetDto | null;
}

const INITIAL_STATE: InventoryState = {
    cards: null,
    loading: false,
    pagedFilters: paged,
    selectedGame: null,
    cardTypeFilters: [],
    setFilters: [],
    rarityFilters: [],
};

export const inventorySlice = createSlice({
    name: 'Inventory',
    initialState: INITIAL_STATE,
    reducers: {
        toggleCardTypeFilters(
            state,
            {
                payload,
            }: PayloadAction<InventoryState['cardTypeFilters'][number]>
        ) {
            const applied = state.cardTypeFilters.some(
                (filterId) => filterId === payload
            );

            if (applied) {
                state.cardTypeFilters = state.cardTypeFilters.filter(
                    (filter) => filter !== payload
                );
            } else state.cardTypeFilters.push(payload);
        },
        toggleSetFilters(
            state,
            { payload }: PayloadAction<InventoryState['setFilters'][number]>
        ) {
            toggleFilters(state, payload);
        },
        toggleRarityFilters(
            state,
            { payload }: PayloadAction<InventoryState['rarityFilters'][number]>
        ) {
            toggleFilters(state, payload);
        },
        updateSelectedGame(
            state,
            { payload }: PayloadAction<InventoryState['selectedGame']>
        ) {
            state.selectedGame = payload;
        },
        // toggleAppliedFilterOnInventory(
        //     state,
        //     { payload }: PayloadAction<InventoryState['appliedFilters'][number]>
        // ) {
        //     const alreadyApplied = state.appliedFilters.some(
        //         (filter) => filter.id === payload.id
        //     );

        //     if (alreadyApplied) {
        //         state.appliedFilters = state.appliedFilters.filter(
        //             (filter) => filter.id !== payload.id
        //         );
        //     } else {
        //         state.appliedFilters.push(payload);
        //     }
        // },
        // toggleAllFiltersOnInventory(
        //     state,
        //     { payload }: PayloadAction<InventoryState['appliedFilters']>
        // ) {
        //     if (state.appliedFilters.length === 0) {
        //         payload.forEach((propery) => {
        //             state.appliedFilters.push(propery);
        //         });
        //     } else state.appliedFilters = [];
        // },
        // removeAllFiltersOnInventory(state) {
        //     state.appliedFilters = [];
        // },
        updatePagedFilters(
            state,
            { payload }: PayloadAction<InventoryState['pagedFilters']>
        ) {
            state.pagedFilters = payload;
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
    updatePagedFilters,
    updateSelectedGame,
    toggleCardTypeFilters,
    toggleRarityFilters,
    toggleSetFilters,
} = inventorySlice.actions;
