import { createStyles } from '@mantine/core';
import { dispatch, useAppSelector } from '../../store/configureStore';
import {
    toggleAllFiltersOnInventory,
    toggleAppliedFilterOnInventory,
} from '../../store/inventorySlice';
import React, { useEffect, useState } from 'react';
import { CardTypeGetDto } from '../../types/card-types';
import { FilterMenu } from './modules/FilterMenu';
import { InventoryDisplay } from './modlues/inventory-display-component';
import { getUserInventory } from '../../services/CardsService';
import { useNavbarHeight } from '../../hooks/use-navbar-height';
import { responseWrapper } from '../../services/helpers/responseWrapper';

export function InventoryPage(): React.ReactElement {
    const { classes } = useStyles();

    const appliedFilters = useAppSelector(
        (state) => state.inventory.appliedFilters
    );

    const user = useAppSelector((state) => state.user.user);

    const [cards, loading, pagedFilters] = useAppSelector((state) => [
        state.inventory.cards,
        state.inventory.loading,
        state.inventory.pagedFilters,
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const [cardFilters, setCardFilters] = useState(pagedFilters);

    const handleTogglingFilter = (option: CardTypeGetDto) => {
        dispatch(toggleAppliedFilterOnInventory(option));
    };

    const handleSelectAll = (filterOptions: CardTypeGetDto[]) => {
        void dispatch(toggleAllFiltersOnInventory(filterOptions));
    };

    const handleRemoveFilter = (filter: CardTypeGetDto) => {
        dispatch(toggleAppliedFilterOnInventory(filter));
    };

    useEffect(() => {
        dispatch(getUserInventory(cardFilters)).then(({ payload }) => {
            responseWrapper(payload);
        });
    }, [currentPage, user, cardFilters]);

    return (
        <div className={classes.filterAndCardContainer}>
            <FilterMenu
                appliedFilters={appliedFilters}
                actions={{
                    handleRemoveFilter: handleRemoveFilter,
                    handleSelectAllFilters: handleSelectAll,
                    handleTogglingFilter: handleTogglingFilter,
                    setCardFilters: setCardFilters,
                    cardFilters: cardFilters,
                }}
            />

            <InventoryDisplay
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                paginatedCards={cards}
                isLoading={loading}
            />
        </div>
    );
}

const useStyles = createStyles(() => {
    const { remainingHeight } = useNavbarHeight();

    return {
        filterAndCardContainer: {
            display: 'grid',
            gridTemplateColumns: '15rem 1fr',

            height: remainingHeight,
            overflow: 'hidden',
        },
    };
});
