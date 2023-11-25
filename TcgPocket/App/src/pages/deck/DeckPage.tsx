import { createStyles, MantineTheme, Text } from '@mantine/core';
import { PrimaryButton } from '../../components/buttons/PrimaryButton';
import { defaultGap, defaultPadding } from '../../constants/theme';
import { IconPlus } from '@tabler/icons-react';
import { useNavbarHeight } from '../../hooks/useNavbarHeight';
import { DecksService } from '../../services/DecksService';
import { useAsync } from 'react-use';
import { responseWrapper } from '../../services/helpers/responseWrapper';
import { DeckView } from './modules/DeckView';
import { useMemo } from 'react';
import { DeckDetailDto } from '../../types/decks';
import { useAppSelector } from '../../store/configureStore';
import { GameGetDto } from '../../types/games';

type GameAndDecks = {
  game: GameGetDto;
  decks: DeckDetailDto[];
};

export function DeckPage(): React.ReactElement {
  const { classes } = useStyles();

  const games = useAppSelector((state) => state.data.games);

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
            <Text className={classes.gameName}>{deck.game.name}</Text>

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
  const { remainingHeight } = useNavbarHeight();

  return {
    container: {
      display: 'grid',
      gridTemplateRows: 'auto 1fr',

      height: remainingHeight,
      padding: defaultPadding,
    },

    header: {
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      justifyItems: 'center',

      fontSize: 32,
      fontWeight: 'bolder',
    },

    body: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, 30vw)',
      justifyContent: 'center',

      paddingTop: defaultPadding,
      gap: defaultGap,
    },

    gameDeckContainer: {
      display: 'grid',
      gridTemplateRows: 'auto 1fr',

      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: theme.colors.primaryPurpleColor,
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
