import { createStyles } from '@mantine/core';
import { FilterSideMenu } from '../../components/FilterSideMenu/FilterSideMenu';
import { DisplayCards } from './modules/DisplayCards';
import { useSelector } from 'react-redux';
import { AppState, dispatch } from '../../store/configureStore';
import {
    toggleAllFiltersOnInventory,
    toggleAppliedFilterOnInventory,
} from '../../store/inventorySlice';
import { GameDTO } from '../../models/Game';
import { GameProperty } from '../../models/GameProperty';

export function InventoryPage(): React.ReactElement {
    const { classes } = useStyles();

    const $appliedFilters = useSelector(
        (state: AppState) => state.inventory.appliedFilters
    );

    const handleTogglingFilter = (option: GameDTO) => {
        dispatch(toggleAppliedFilterOnInventory(option));
    };

    const handleSelectAll = (filterOptions: GameProperty[]) => {
        void dispatch(toggleAllFiltersOnInventory(filterOptions));
    };

    const handleRemoveFilter = (filter: GameDTO) => {
        dispatch(toggleAppliedFilterOnInventory(filter));
    };

    return (
        <div className={classes.pageContainer}>
            <div className={classes.filterAndCardContainer}>
                <FilterSideMenu
                    appliedFilters={$appliedFilters}
                    handleTogglingFilter={handleTogglingFilter}
                    handleSelectAllFilters={handleSelectAll}
                    handleRemoveFilter={handleRemoveFilter}
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
