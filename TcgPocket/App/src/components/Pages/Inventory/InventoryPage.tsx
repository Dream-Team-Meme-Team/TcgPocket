import { createStyles } from '@mantine/core';
import { FilterSelector } from '../../filterSelector/FilterSelector';
import { InventoryHeader } from './modules/InventoryHeader';
import { DisplayCards } from './modules/DisplayCards';

export function InventoryPage(): React.ReactElement {
    const { classes } = useInventoryStyles();

    return (
        <div className={classes.pageContainer}>
            <InventoryHeader />

            <div className={classes.filterAndCardContainer}>
                <FilterSelector />

                <DisplayCards />
            </div>
        </div>
    );
}

const useInventoryStyles = createStyles(() => ({
    pageContainer: {
        display: 'grid',
        gridTemplateRows: 'auto auto',
    },

    filterAndCardContainer: {
        display: 'grid',
        gridTemplateColumns: '20rem auto',
    },
}));
