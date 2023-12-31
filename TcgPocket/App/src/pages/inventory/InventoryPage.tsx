import { useEffect, useMemo, useState } from 'react';
import { InventoryDisplay } from './modules/InventoryDisplay';
import { MantineTheme, createStyles, Text } from '@mantine/core';
import { FilterMenu } from '../../components/filterMenu/FilterMenu';
import { useNavbarHeight } from '../../hooks/useNavbarHeight';
import { dispatch, useAppSelector } from '../../store/configureStore';
import { shallowEqual } from 'react-redux';
import { responseWrapper } from '../../services/helpers/responseWrapper';
import { CardFilterDto } from '../../types/cards';
import { GameGetDto } from '../../types/games';
import { PrimarySelect } from '../../components/inputs/PrimarySelect';
import { defaultGap, defaultPadding } from '../../constants/theme';
import { IconCards, IconSearch } from '@tabler/icons-react';
import { PaginationSelect } from '../../components/pagination/PaginationSelect';
import { PrimaryTextInput } from '../../components/inputs/PrimaryTextInput';
import {
  CardDispatchMode,
  resetFilters,
  resetInventorySlice,
  setInventoryCurrentPage,
  setInventorySearchText,
  toggleCardTypeFilters,
  toggleRarityFilters,
  toggleSetFilters,
} from '../../store/inventorySlice';
import { PrimaryButton } from '../../components/buttons/PrimaryButton';
import { AppliedFilters } from '../../types/applied-filters';
import { FilterActions } from '../../types/filter-actions';
import { pageSizeOptions } from '../../enums/shared';
import { getAllCards, getUserInventory } from '../../services/CardsService';

export function InventoryPage(): React.ReactElement {
  const { classes } = useStyles();

  const [
    cards,
    loading,
    cardTypeFilters,
    setFilters,
    rarityFilters,
    searchText,
    currentPage,
    cardDispatchMode,
  ] = useAppSelector(
    (state) => [
      state.inventory.cards,
      state.inventory.loading,
      state.inventory.cardTypeFilters,
      state.inventory.setFilters,
      state.inventory.rarityFilters,
      state.inventory.searchText,
      state.inventory.currentPage,
      state.inventory.cardDispatchMode,
    ],
    shallowEqual
  );

  const [pageSize, setPageSize] = useState<number>(15);
  const [selectedGame, setSelectedGame] = useState<GameGetDto | null>(null);

  const cardDispatchAction = useMemo(() => {
    switch (cardDispatchMode) {
      case CardDispatchMode.inventory:
        return getUserInventory;

      case CardDispatchMode.all:
        return getAllCards;

      default:
        return getUserInventory;
    }
  }, [cardDispatchMode]);

  const appliedFilters: AppliedFilters = useMemo(() => {
    return {
      cardTypeFilters: cardTypeFilters,
      rarityFilters: rarityFilters,
      setFilters: setFilters,
    };
  }, [cardTypeFilters, rarityFilters, setFilters]);

  const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setInventoryCurrentPage(1));
    dispatch(setInventorySearchText(e.target.value));
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

    dispatch(cardDispatchAction(filtered)).then(({ payload }) =>
      responseWrapper(payload)
    );
  };

  const toggleCardTypes = (id: number) => {
    dispatch(toggleCardTypeFilters(id));
  };

  const toggleSets = (id: number) => {
    dispatch(toggleSetFilters(id));
  };

  const toggleRarities = (id: number) => {
    dispatch(toggleRarityFilters(id));
  };

  const filterActions: FilterActions = useMemo(() => {
    return {
      toggleCardTypes: toggleCardTypes,
      toggleRarities: toggleRarities,
      toggleSets: toggleSets,
    };
  }, []);

  useEffect(() => {
    dispatch(resetFilters());
    dispatch(setInventorySearchText(''));
    dispatch(setInventoryCurrentPage(1));
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

    dispatch(cardDispatchAction(filtered)).then(({ payload }) =>
      responseWrapper(payload)
    );
  }, [
    cardTypeFilters,
    setFilters,
    rarityFilters,
    selectedGame,
    currentPage,
    pageSize,
    cardDispatchAction,
  ]);

  useEffect(() => {
    return () => {
      dispatch(resetInventorySlice());
    };
  }, []);

  return (
    <div className={classes.wrapper}>
      <FilterMenu
        selectedGame={selectedGame}
        setSelectedGame={setSelectedGame}
        filters={appliedFilters}
        actions={filterActions}
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

          <PrimaryTextInput
            icon={<IconSearch />}
            placeholder="Search Cards"
            value={searchText}
            onChange={handleSearchText}
          />

          <PrimaryButton onClick={search}>Search</PrimaryButton>

          <PaginationSelect
            currentPage={currentPage}
            setCurrentPage={(arg) => dispatch(setInventoryCurrentPage(arg))}
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
