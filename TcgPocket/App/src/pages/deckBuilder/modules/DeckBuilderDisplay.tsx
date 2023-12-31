import { Box, MantineTheme, ScrollArea, createStyles } from '@mantine/core';
import { PrimarySelect } from '../../../components/inputs/PrimarySelect';
import { defaultGap, defaultPadding } from '../../../constants/theme';
import { Text } from '@mantine/core';
import { useEffect, useMemo } from 'react';
import { dispatch, useAppSelector } from '../../../store/configureStore';
import { ViewStyle } from '../../../enums/viewStyle';
import { useForm } from '@mantine/form';
import {
  setDeck,
  setDraggedCard,
  setSelectedDeckBuilderGame,
} from '../../../store/deckBuilderSlice';
import { shallowEqual } from 'react-redux';
import { DeckCardDisplayDto } from '../../../types/cards';
import {
  IconCards,
  IconChecklist,
  IconGridDots,
  IconList,
} from '@tabler/icons-react';
import { GameGetDto } from '../../../types/games';
import { CardImageDisplay } from '../../../components/cardDisplay/modules/CardImageDisplay';

enum DisplayRender {
  SelectGame = 'Select Game',
  AddCards = 'Drag Cards to Add',
  DisplayDeck = 'Display Deck',
}

type CategorizedDeck = {
  category: string;
  cards: DeckCardDisplayDto[];
  numberOfCards: number;
};

export function BuilderDisplay(): React.ReactElement {
  const { classes } = useStyles();

  const games = useAppSelector((state) => state.data.games);

  const [selectedGame, draggedCard, deck, id] = useAppSelector(
    (state) => [
      state.deckBuilder.selectedGame,
      state.deckBuilder.draggedCard,
      state.deckBuilder.deck,
      state.deckBuilder.id,
    ],
    shallowEqual
  );

  const form = useForm({
    initialValues: {
      gameName: selectedGame?.name,
      ruleSet: 'No Rules',
      view: ViewStyle.List,
    },
  });

  const viewStyle: string[] = [ViewStyle.Grid, ViewStyle.List];

  const categorizedDeck = useMemo(() => {
    const temp: CategorizedDeck[] = [];

    deck.forEach((cards) => {
      const foundCategory = temp.find(
        (category) =>
          category.category.trim() === cards.cardDisplay.cardType.name.trim()
      );

      if (foundCategory) {
        foundCategory.cards.push(cards);
        foundCategory.numberOfCards = foundCategory.cards.length;
      } else
        temp.push({
          category: cards.cardDisplay.cardType.name,
          cards: [cards],
          numberOfCards: 1,
        });
    });

    return temp;
  }, [deck]);

  const addCardToDeck = () => {
    const tempDeck = [...deck];

    if (draggedCard) {
      tempDeck.push({ deckId: id, cardDisplay: draggedCard, count: 0 });
    }

    dispatch(setDeck(tempDeck));
    dispatch(setDraggedCard(null));
  };

  useEffect(() => {
    const foundGame = games.find((game) => game.name === form.values.gameName);

    dispatch(setSelectedDeckBuilderGame(foundGame ? foundGame : null));
  }, [form.values.gameName, games]);

  useEffect(() => {
    const name = selectedGame ? selectedGame.name : '';
    form.setValues({ gameName: name });
    // disabled because we DONT want to re-render when the form changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGame]);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <PrimarySelect
          icon={
            form.values.view === ViewStyle.Grid ? (
              <IconGridDots />
            ) : (
              <IconList />
            )
          }
          data={viewStyle}
          {...form.getInputProps('view')}
        />

        <PrimarySelect
          placeholder="Game"
          icon={<IconCards />}
          disabled={selectedGame !== null}
          data={games.map((game) => game.name)}
          {...form.getInputProps('gameName')}
        />

        <PrimarySelect
          disabled
          placeholder="Rule Set"
          icon={<IconChecklist />}
          data={['No Rules']}
          {...form.getInputProps('ruleSet')}
        />
      </div>

      <ScrollArea
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={(e) => e.preventDefault()}
        onDrop={addCardToDeck}
      >
        <DeckBuilderBodyDisplay
          selectedGame={selectedGame}
          deck={categorizedDeck}
        />
      </ScrollArea>
    </div>
  );
}

type DeckBuilderBodyDisplayProps = {
  deck: CategorizedDeck[];
  selectedGame: GameGetDto | null;
};

function DeckBuilderBodyDisplay({
  deck,
  selectedGame,
}: DeckBuilderBodyDisplayProps): React.ReactElement {
  const { classes } = useStyles();

  const displayRendered = useMemo(() => {
    return !selectedGame
      ? DisplayRender.SelectGame
      : deck.length === 0
      ? DisplayRender.AddCards
      : DisplayRender.DisplayDeck;
  }, [selectedGame, deck]);

  switch (displayRendered) {
    case DisplayRender.SelectGame:
      return (
        <div className={classes.emptyBody}> {DisplayRender.SelectGame} </div>
      );
    case DisplayRender.AddCards:
      return (
        <div className={classes.emptyBody}> {DisplayRender.AddCards} </div>
      );
    default:
      return (
        <div className={classes.body}>
          {/* this is what allows us to drop the cards */}
          <input className={classes.input} />

          {deck.map((deck, index) => (
            <div key={index}>
              <Text className={classes.cardTypeHeader}>
                {deck.category} ({deck.numberOfCards})
              </Text>

              <div className={classes.cards}>
                {deck.cards.map((card, index) => (
                  <Box key={index}>
                    <CardImageDisplay
                      width={100}
                      imageUrl={card.cardDisplay.imageUrl}
                    />
                  </Box>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
  }
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
      gridTemplateColumns: '1fr 4fr 3fr',

      padding: defaultPadding,
      gap: defaultGap,
    },

    emptyBody: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

      height: '65vh',

      fontSize: 26,
      fontWeight: 'bold',
      fontStyle: 'italic',
    },

    body: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, 250px)',
      alignContent: 'flex-start',
      justifyContent: 'center',

      height: '65vh',

      padding: defaultPadding,
      gap: defaultGap,
    },

    cards: {
      display: 'grid',
      gridTemplateColumns: 'auto auto',
    },

    input: {
      display: 'none',
    },

    group: {
      display: 'grid',
      gridTemplateRows: 'auto 1fr',
    },

    cardTypeHeader: {
      display: 'flex',
      justifyContent: 'center',

      fontSize: 18,
      fontWeight: 'bold',
    },
  };
});
