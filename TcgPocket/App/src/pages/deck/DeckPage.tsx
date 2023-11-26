import { createStyles, MantineTheme, Text } from '@mantine/core';
import { PrimaryButton } from '../../components/buttons/PrimaryButton';
import { defaultGap, defaultPadding } from '../../constants/theme';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import { DecksService } from '../../services/DecksService';
import { useAsync, useEffectOnce } from 'react-use';
import { responseWrapper } from '../../services/helpers/responseWrapper';
import { DeckView } from './modules/DeckView';
import { useMemo } from 'react';
import { DeckDetailDto } from '../../types/decks';
import { dispatch, useAppSelector } from '../../store/configureStore';
import { GameGetDto } from '../../types/games';
import { getAllGames } from '../../services/dataServices/gameServices';
import { getAllCardTypes } from '../../services/dataServices/cardTypeServices';
import { getAllRarities } from '../../services/dataServices/rarityServices';
import { getAllSets } from '../../services/dataServices/setServices';
import { shallowEqual } from 'react-redux';
import { getAllAttributes } from '../../services/dataServices/attributeServices';
import { PrimaryTextInput } from '../../components/inputs/PrimaryTextInput';

type GameAndDecks = {
  game: GameGetDto;
  decks: DeckDetailDto[];
};

export function DeckPage(): React.ReactElement {
  const { classes } = useStyles();

  const [games, cardTypes, attributes, sets, rarities] = useAppSelector(
    (state) => [
      state.data.games,
      state.data.cardTypes,
      state.data.attributes,
      state.data.sets,
      state.data.rarities,
    ],
    shallowEqual
  );

  const decks = useAsync(async () => {
    const promise = await DecksService.getAllDecks();
    responseWrapper(promise);

    return promise.data;
  });

  const organizedDecks = useMemo(() => {
    const tempDecks: GameAndDecks[] = [];

    games.forEach((game) => {
      tempDecks.push({ game: game, decks: [] });
    });

    decks.value?.forEach((deck) => {
      tempDecks.find((x) => x.game.id === deck.gameId)?.decks.push(deck);
    });

    return tempDecks;
  }, [decks, games]);

  useEffectOnce(() => {
    if (games.length === 0) {
      dispatch(getAllGames()).then(({ payload }) => responseWrapper(payload));
    }

    if (cardTypes.length === 0) {
      dispatch(getAllCardTypes()).then(({ payload }) =>
        responseWrapper(payload)
      );
    }

    if (rarities.length === 0) {
      dispatch(getAllRarities()).then(({ payload }) =>
        responseWrapper(payload)
      );
    }

    if (sets.length === 0) {
      dispatch(getAllSets()).then(({ payload }) => responseWrapper(payload));
    }

    if (attributes.length === 0) {
      dispatch(getAllAttributes()).then(({ payload }) =>
        responseWrapper(payload)
      );
    }
  });

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Text> Manage Decks </Text>

        {/* justify center */}
        <PrimaryButton leftIcon={<IconPlus />}> Create New Deck </PrimaryButton>
      </div>

      <div className={classes.body}>
        {organizedDecks.map((deck, index) => (
          <div key={index} className={classes.gameDeckContainer}>
            <div className={classes.gameDeckHeader}>
              <Text className={classes.gameName}>{deck.game.name}</Text>

              <PrimaryTextInput placeholder="Search" icon={<IconSearch />} />
            </div>

            <div className={classes.decks}>
              {deck.decks.map((x, index) => (
                <DeckView key={index} deck={x} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const useStyles = createStyles((theme: MantineTheme) => {
  return {
    container: {
      display: 'grid',
      gridTemplateRows: 'auto 1fr',

      height: '100%',
      padding: defaultPadding,
    },

    header: {
      display: 'grid',
      gridTemplateRows: 'auto auto',

      fontSize: 32,
      fontWeight: 'bolder',
    },

    body: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, 30vw)',
      justifyContent: 'space-evenly',

      paddingTop: defaultPadding,
    },

    gameDeckContainer: {
      display: 'grid',
      gridTemplateRows: 'auto 1fr',

      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: theme.colors.primaryPurpleColor,
    },

    gameDeckHeader: {
      display: 'grid',

      padding: defaultPadding,
      gap: defaultGap,
    },

    gameName: {
      display: 'flex',
      justifyContent: 'center',

      fontSize: 24,
      fontWeight: 'bold',
    },

    decks: {
      display: 'grid',
    },
  };
});
