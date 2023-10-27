import { useEffect, useState } from 'react';
import { InventoryDisplay } from './modules/InventoryDisplay';
import { MantineTheme, Pagination, createStyles, Text } from '@mantine/core';
import { FilterMenu } from './modules/FilterMenu';
import { useNavbarHeight } from '../../hooks/useNavbarHeight';
import { dispatch, useAppSelector } from '../../store/ConfigureStore';
import { shallowEqual } from 'react-redux';
import { getAllCards } from '../../services/CardsService';
import { responseWrapper } from '../../services/helpers/responseWrapper';
import { CardFilterDto } from '../../types/cards';
import { GameGetDto } from '../../types/games';
import { PrimarySelect } from '../../components/inputs/PrimarySelect';
import { defaultGap, defaultPadding } from '../../constants/theme';
import { IconCards } from '@tabler/icons-react';

const pageSizeOptions: string[] = ['15', '24', '36'];

export function InventoryPage(): React.ReactElement {
    const { classes } = useStyles();

    const [cards, loading, cardTypeFilters, setFilters, rarityFilters] =
        useAppSelector(
            (state) => [
                state.inventory.cards,
                state.inventory.loading,
                state.inventory.cardTypeFilters,
                state.inventory.setFilters,
                state.inventory.rarityFilters,
            ],
            shallowEqual
        );

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(15);
    const [selectedGame, setSelectedGame] = useState<GameGetDto | null>(null);

    useEffect(() => {
        const gameId = selectedGame ? [selectedGame.id] : undefined;

        const filtered: CardFilterDto = {
            gameIds: gameId,
            cardTypeIds: cardTypeFilters ?? undefined,
            setIds: setFilters ?? undefined,
            rarityIds: rarityFilters ?? undefined,
            currentPage: currentPage,
            pageSize: pageSize,
        };

        dispatch(getAllCards(filtered)).then(({ payload }) =>
            responseWrapper(payload)
        );
    }, [
        cardTypeFilters,
        setFilters,
        rarityFilters,
        selectedGame,
        currentPage,
        pageSize,
    ]);

    return (
        <div className={classes.wrapper}>
            <FilterMenu
                selectedGame={selectedGame}
                setSelectedGame={setSelectedGame}
            />

            <div className={classes.display}>
                <div className={classes.header}>
                    <div className={classes.pageSizeControls}>
                        <Text> Cards Per Page </Text>

                        <div className={classes.select}>
                            <PrimarySelect
                                value={pageSize.toString()}
                                data={pageSizeOptions}
                                icon={<IconCards />}
                                onChange={(value) => {
                                    if (!value) return;

                                    setPageSize(parseInt(value.toString()));
                                }}
                            />
                        </div>
                    </div>

                    <Pagination
                        color={'violet'}
                        withEdges
                        siblings={2}
                        boundaries={2}
                        className={classes.paginationControls}
                        value={currentPage}
                        onChange={setCurrentPage}
                        total={cards ? cards.pageCount : 16}
                    />
                </div>

                <InventoryDisplay paginatedCards={cards} isLoading={loading} />
            </div>
        </div>
    );
}

const useStyles = createStyles((theme: MantineTheme) => {
    const { remainingHeight } = useNavbarHeight();

    return {
        wrapper: {
            display: 'grid',
            gridTemplateColumns: '250px 1fr',

            overflow: 'hidden',
        },

        display: {
            display: 'grid',
            gridTemplateRows: 'auto 1fr',

            height: remainingHeight,
        },

        header: {
            display: 'grid',
            gridTemplateColumns: 'auto auto',

            borderBottomWidth: 2,
            borderBottomStyle: 'solid',
            bottomBottomColor: theme.colors.primaryPurpleColor[0],
        },

        pageSizeControls: {
            display: 'flex',
            alignItems: 'center',

            // width: 'auto',

            gap: defaultGap,
            padding: defaultPadding,
        },

        select: {
            width: 90,
        },

        pagination: {
            display: 'flex',
            justifyContent: 'flex-end',

            width: 500,
        },

        paginationControls: {
            display: 'flex',
            justifyContent: 'flex-end',

            padding: '10px',
        },
    };
});
