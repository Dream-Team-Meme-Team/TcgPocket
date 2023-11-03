import { useEffect, useState } from 'react';
import { InventoryDisplay } from './modules/InventoryDisplay';
import { MantineTheme, createStyles, Text } from '@mantine/core';
import { FilterMenu } from './modules/FilterMenu';
import { useNavbarHeight } from '../../hooks/useNavbarHeight';
import { dispatch, useAppSelector } from '../../store/configureStore';
import { shallowEqual } from 'react-redux';
import { getAllCards } from '../../services/CardsService';
import { responseWrapper } from '../../services/helpers/responseWrapper';
import { CardFilterDto } from '../../types/cards';
import { GameGetDto } from '../../types/games';
import { PrimarySelect } from '../../components/inputs/PrimarySelect';
import { defaultGap, defaultPadding } from '../../constants/theme';
import { IconCards, IconSearch } from '@tabler/icons-react';
import { PaginationSelect } from '../../components/pagination/PaginationSelect';
import { PrimaryTextInput } from '../../components/inputs/PrimaryTextInput';
import { resetFilters } from '../../store/inventorySlice';
import { PrimaryButton } from '../../components/buttons/PrimaryButton';

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
  const [searchText, setSearchText] = useState('');

  const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const search = () => {
    const gameId = selectedGame ? [selectedGame.id] : undefined;

    const filtered: CardFilterDto = {
      name: searchText,
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
  };

  useEffect(() => {
    dispatch(resetFilters());
  }, [selectedGame]);

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

          {/* currently we do not have any implementation in place for this. using as a placeholder */}
          <PrimaryTextInput
            icon={<IconSearch />}
            placeholder="Search Cards"
            value={searchText}
            onChange={handleSearchText}
          />

          <PrimaryButton onClick={search}>Search</PrimaryButton>

          <PaginationSelect
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            total={cards ? cards.pageCount : 16}
            className={classes.paginationControls}
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
      gridTemplateColumns: 'auto 1fr auto auto',
      alignItems: 'center',
      gap: defaultGap,

      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
      borderBottomColor: theme.colors.primaryPurpleColor[0],
    },

    pageSizeControls: {
      display: 'flex',
      alignItems: 'center',

      gap: defaultGap,
      padding: defaultPadding,
    },

    select: {
      width: 100,
    },

    pagination: {
      display: 'flex',
      justifyContent: 'flex-end',

      width: 500,
    },

    paginationControls: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',

      padding: '10px',
      gap: defaultGap,
    },
  };
});
