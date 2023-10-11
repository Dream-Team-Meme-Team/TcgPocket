import { createStyles } from '@mantine/core';
import { DisplayCards } from './modules/DisplayCards';
import { dispatch, useAppSelector } from '../../store/configureStore';
import {
    toggleAllFiltersOnInventory,
    toggleAppliedFilterOnInventory,
} from '../../store/inventorySlice';
import React from 'react';
import { CardTypeGetDto } from '../../types/card-types';
import { FilterMenu } from './modules/FilterMenu';

export function InventoryPage(): React.ReactElement {
    const { classes } = useStyles();

    const appliedFilters = useAppSelector(
        (state) => state.inventory.appliedFilters
    );

    const handleTogglingFilter = (option: CardTypeGetDto) => {
        dispatch(toggleAppliedFilterOnInventory(option));
    };

    const handleSelectAll = (filterOptions: CardTypeGetDto[]) => {
        void dispatch(toggleAllFiltersOnInventory(filterOptions));
    };

    const handleRemoveFilter = (filter: CardTypeGetDto) => {
        dispatch(toggleAppliedFilterOnInventory(filter));
    };

    return (
        <div className={classes.pageContainer}>
            <div className={classes.filterAndCardContainer}>
                {/* <FilterSideMenu
                    appliedFilters={appliedFilters}
                    handleTogglingFilter={handleTogglingFilter}
                    handleSelectAllFilters={handleSelectAll}
                    handleRemoveFilter={handleRemoveFilter}
                /> */}
                <FilterMenu
                    appliedFilters={appliedFilters}
                    actions={{
                        handleRemoveFilter: handleRemoveFilter,
                        handleSelectAllFilters: handleSelectAll,
                        handleTogglingFilter: handleTogglingFilter,
                    }}
                />

                <DisplayCards />
            </div>
        </div>
    );
}

const useStyles = createStyles(() => ({
    pageContainer: {
        display: 'grid',
        gridTemplateRows: 'auto auto',
    },

    filterAndCardContainer: {
        display: 'grid',
        gridTemplateColumns: '15rem auto',
    },
}));
