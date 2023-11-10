import { MantineTheme, createStyles } from '@mantine/styles';
import { PrimaryTextInput } from '../../../components/inputs/PrimaryTextInput';
import { defaultGap, defaultPadding } from '../../../constants/theme';
import { IconFilter, IconSearch } from '@tabler/icons-react';
import { PrimarySelect } from '../../../components/inputs/PrimarySelect';
import { useEffect, useMemo, useState } from 'react';
import { PrimaryBadge } from '../../../components/badges/PrimaryBadge';
import { GridView } from './GridView';
import { ViewStyle } from '../../../enums/viewStyle';
import { Drawer, ScrollArea } from '@mantine/core';
import { dispatch, useAppSelector } from '../../../store/configureStore';
import { ListView } from './ListView';
import { shallowEqual } from 'react-redux';
import { useDisclosure } from '@mantine/hooks';
import { FilterMenu } from '../../inventory/modules/FilterMenu';
import { PrimaryButton } from '../../../components/buttons/PrimaryButton';
import { CardFilterDto } from '../../../types/cards';
import { getAllCards } from '../../../services/CardsService';
import { responseWrapper } from '../../../services/helpers/responseWrapper';

export function DeckBuilderInventory(): React.ReactElement {
  const { classes } = useStyles();

  const [selectedGame, deckName, cards, pagination] = useAppSelector(
    (state) => [
      state.deckBuilder.selectedGame,
      state.deckBuilder.name,
      state.deckBuilder.cards,
      state.deckBuilder.pagination,
    ],
    shallowEqual
  );

  const [view, setView] = useState<string>(ViewStyle.Grid);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [open, { toggle }] = useDisclosure();

  const viewStyle: string[] = [ViewStyle.Grid, ViewStyle.List];

  const filteredCards = useMemo(() => {
    if (!cards) return [];

    return cards.items.filter((card) =>
      card.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, cards]);

  const handleSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleViewChange = (
    e: string | React.ChangeEvent<HTMLInputElement> | null
  ) => {
    if (typeof e === 'string') {
      setView(e);
    }
  };

  useEffect(() => {
    if (deckName === 'Untitled' || !selectedGame) return;

    const gameId = selectedGame ? [selectedGame.id] : undefined;

    const filtered: CardFilterDto = {
      gameIds: gameId,
      currentPage: pagination.currentPage,
      pageSize: pagination.pageSize,
    };

    dispatch(getAllCards(filtered)).then(({ payload }) => {
      responseWrapper(payload);
    });
  }, [selectedGame, deckName, pagination]);

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
            value={view}
            data={viewStyle}
            onChange={handleViewChange}
          />
        </div>

        <div className={classes.bottomRow}>
          <PrimaryButton onClick={toggle}>View Filters</PrimaryButton>

          <PrimaryBadge leftSection={<IconFilter />}> Card Types </PrimaryBadge>
          <PrimaryBadge leftSection={<IconFilter />}> Sets </PrimaryBadge>
          <PrimaryBadge leftSection={<IconFilter />}> Rarities </PrimaryBadge>

          <Drawer opened={open} onClose={toggle}>
            <FilterMenu selectedGame={selectedGame} />
          </Drawer>
        </div>
      </div>

      <ScrollArea className={classes.body}>
        {view === ViewStyle.Grid ? (
          <GridView cards={filteredCards} />
        ) : (
          <ListView cards={filteredCards} />
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

    bottomRow: {
      display: 'flex',
      alignItems: 'center',

      gap: defaultGap,
    },

    body: {
      // this, this is bad
      height: '65vh',
    },
  };
});
