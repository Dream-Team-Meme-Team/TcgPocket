import { createStyles } from '@mantine/core';
import { DisplayCards } from './modules/DisplayCards';
import { useSelector } from 'react-redux';
import { AppState, dispatch } from '../../store/configureStore';
import {
    toggleAllFiltersOnInventory,
    toggleAppliedFilterOnInventory,
} from '../../store/inventorySlice';
import { FilterSideMenu } from '../../components/filterSideMenu/FilterSideMenu';
import { GameGetDto } from '../../types/games';

export function InventoryPage(): React.ReactElement {
    const { classes } = useStyles();

    const $appliedFilters = useSelector(
        (state: AppState) => state.inventory.appliedFilters
    );

    const handleTogglingFilter = (option: GameGetDto) => {
        dispatch(toggleAppliedFilterOnInventory(option));
    };

    const handleSelectAll = (filterOptions: GameGetDto[]) => {
        void dispatch(toggleAllFiltersOnInventory(filterOptions));
    };

    const handleRemoveFilter = (filter: GameGetDto) => {
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
