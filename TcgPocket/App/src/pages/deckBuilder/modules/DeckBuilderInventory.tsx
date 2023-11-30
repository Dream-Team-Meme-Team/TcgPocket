import { MantineTheme, createStyles } from '@mantine/styles';
import { PrimaryTextInput } from '../../../components/inputs/PrimaryTextInput';
import { defaultGap, defaultPadding } from '../../../constants/theme';
import {
  IconCards,
  IconGridDots,
  IconList,
  IconSearch,
} from '@tabler/icons-react';
import { PrimarySelect } from '../../../components/inputs/PrimarySelect';
import { useEffect, useMemo, useState } from 'react';
import { GridInventoryView } from './GridInventoryView';
import { ViewStyle } from '../../../enums/viewStyle';
import { Drawer, ScrollArea } from '@mantine/core';
import { dispatch, useAppSelector } from '../../../store/configureStore';
import { ListInventoryView } from './ListInventoryView';
import { shallowEqual } from 'react-redux';
import { useDisclosure } from '@mantine/hooks';
import { FilterMenu } from '../../../components/filterMenu/FilterMenu';
import { PrimaryButton } from '../../../components/buttons/PrimaryButton';
import { CardFilterDto } from '../../../types/cards';
import { getAllCards } from '../../../services/CardsService';
import { responseWrapper } from '../../../services/helpers/responseWrapper';
import { PaginationSelect } from '../../../components/pagination/PaginationSelect';
import {
  setDeckBuilderCurrentPage,
  setDeckBuilderPageSize,
  setDeckBuilderSearchTerm,
  toggleDeckBuilderCardTypeFilters,
  toggleDeckBuilderRarityFilters,
  toggleDeckBuilderSetFilters,
} from '../../../store/deckBuilderSlice';
import { AppliedFilterBadges } from './AppliedFilterBadges';
import { AppliedFilters } from '../../../types/applied-filters';
import { FilterActions } from '../../../types/filter-actions';

const pageSizeOptions: string[] = ['15', '30', '45'];

export function DeckBuilderInventory(): React.ReactElement {
  const { classes } = useStyles();

  const [selectedGame, deckName] = useAppSelector(
    (state) => [state.deckBuilder.selectedGame, state.deckBuilder.name],
    shallowEqual
  );

  const [
    cards,
    cardTypeFilters,
    setFilters,
    rarityFilters,
    searchTerm,
    currentPage,
    pageSize,
  ] = useAppSelector(
    (state) => [
      state.deckBuilder.cards,
      state.deckBuilder.cardTypeFilters,
      state.deckBuilder.setFilters,
      state.deckBuilder.rarityFilters,
      state.deckBuilder.searchTerm,
      state.deckBuilder.currentPage,
      state.deckBuilder.pageSize,
    ],
    shallowEqual
  );

  const [view, setView] = useState<string>(ViewStyle.Grid);

  const [open, { toggle }] = useDisclosure();

  const viewStyle: string[] = [ViewStyle.Grid, ViewStyle.List];

  const filteredCards = useMemo(() => {
    if (!cards) return [];

    return cards.items.filter((card) =>
      card.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, cards]);

  const appliedFilters: AppliedFilters = useMemo(() => {
    return {
      cardTypeFilters: cardTypeFilters,
      rarityFilters: rarityFilters,
      setFilters: setFilters,
    };
  }, [cardTypeFilters, rarityFilters, setFilters]);

  const handleSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setDeckBuilderSearchTerm(e.target.value));
  };

  const handleViewChange = (
    e: string | React.ChangeEvent<HTMLInputElement> | null
  ) => {
    if (typeof e === 'string') {
      setView(e);
    }
  };

  const toggleCardTypes = (id: number) => {
    dispatch(toggleDeckBuilderCardTypeFilters(id));
  };

  const toggleSets = (id: number) => {
    dispatch(toggleDeckBuilderSetFilters(id));
  };

  const toggleRarities = (id: number) => {
    dispatch(toggleDeckBuilderRarityFilters(id));
  };

  const setCurrentPage = (page: number) => {
    dispatch(setDeckBuilderCurrentPage(page));
  };

  const filterActions: FilterActions = useMemo(() => {
    return {
      toggleCardTypes: toggleCardTypes,
      toggleRarities: toggleRarities,
      toggleSets: toggleSets,
    };
  }, []);

  useEffect(() => {
    if (!deckName || !selectedGame) return;

    const gameId = selectedGame ? [selectedGame.id] : undefined;

    const filtered: CardFilterDto = {
      gameIds: gameId,
      cardTypeIds: cardTypeFilters ?? undefined,
      setIds: setFilters ?? undefined,
      rarityIds: rarityFilters ?? undefined,
      currentPage: currentPage,
      pageSize: pageSize,
    };

    dispatch(getAllCards(filtered)).then(({ payload }) => {
      responseWrapper(payload);
    });
  }, [
    selectedGame,
    deckName,
    currentPage,
    pageSize,
    cardTypeFilters,
    setFilters,
    rarityFilters,
  ]);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.topRow}>
          <PrimaryTextInput
            icon={<IconSearch />}
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchTerm}
          />

          <PrimarySelect
            icon={view === ViewStyle.Grid ? <IconGridDots /> : <IconList />}
            value={view}
            data={viewStyle}
            onChange={handleViewChange}
          />
        </div>

        <div className={classes.middleRow}>
          <PrimaryButton onClick={toggle}>View Filters</PrimaryButton>

          <PrimarySelect
            value={pageSize.toString()}
            data={pageSizeOptions}
            icon={<IconCards />}
            onChange={(value) => {
              if (!value) return;

              dispatch(setDeckBuilderPageSize(parseInt(value.toString())));
            }}
          />

          <PaginationSelect
            currentPage={currentPage}
            total={cards?.pageCount ?? 1}
            setCurrentPage={setCurrentPage}
          />

          <Drawer opened={open} onClose={toggle} padding={0}>
            <FilterMenu
              selectedGame={selectedGame}
              filters={appliedFilters}
              actions={filterActions}
            />
          </Drawer>
        </div>

        <div className={classes.bottomRow}>
          <AppliedFilterBadges />
        </div>
      </div>

      <ScrollArea className={classes.body}>
        {view === ViewStyle.Grid ? (
          <GridInventoryView cards={filteredCards} />
        ) : (
          <ListInventoryView cards={filteredCards} />
        )}
      </ScrollArea>
    </div>
  );
}

const useStyles = createStyles((theme: MantineTheme) => {
  return {
    container: {
      display: 'grid',
      gridTemplateRows: 'auto 1fr',

      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: theme.colors.primaryPurpleColor[0],
    },

    header: {
      display: 'grid',
      gridTemplateRows: 'auto 1fr',

      gap: defaultGap,
      padding: defaultPadding,

      borderBottomWidth: 2,
      borderBottomStyle: 'solid',
      borderBottomColor: theme.colors.primaryPurpleColor[0],
    },

    title: {
      display: 'flex',

      fontSize: '25px',
      fontWeight: 'bolder',
    },

    topRow: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: defaultGap,
    },

    middleRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',

      gap: defaultGap,
    },

    bottomRow: {
      display: 'flex',

      gap: defaultGap,
    },

    body: {
      // this, this is bad
      height: '65vh',
    },
  };
});
