import { useState } from 'react';
import { InventoryDisplay } from './modules/InventoryDisplay';
import { createStyles } from '@mantine/core';
import { FilterMenu } from './modules/FilterMenu';
import { useNavbarHeight } from '../../hooks/useNavbarHeight';
import { useAppSelector } from '../../store/ConfigureStore';
import { shallowEqual } from 'react-redux';

export function InventoryPage(): React.ReactElement {
    const { classes } = useStyles();

    const [cards, loading, allCards] = useAppSelector(
        (state) => [
            state.inventory.cards,
            state.inventory.loading,
            state.inventory.allCards,
        ],
        shallowEqual
    );

    console.log(cards);

    const [currentPage, setCurrentPage] = useState<number>(1);

    return (
        <div className={classes.wrapper}>
            <FilterMenu />

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
        wrapper: {
            display: 'grid',
            gridTemplateColumns: '250px 1fr',

            height: remainingHeight,
        },
    };
});
