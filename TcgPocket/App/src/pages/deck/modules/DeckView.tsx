import { createStyles, Text } from '@mantine/core';
import { DeckDetailDto } from '../../../types/decks';
import { CardImageDisplay } from '../../../components/cardDisplay/modules/CardImageDisplay';
import { PrimaryButton } from '../../../components/buttons/PrimaryButton';
import { defaultPadding } from '../../../constants/theme';

type DeckViewProps = {
  deck: DeckDetailDto;
};

export function DeckView({ deck }: DeckViewProps): React.ReactElement {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.deckHeader}>
        <Text>{deck.name}</Text>

        <PrimaryButton> Modify Deck </PrimaryButton>
      </div>

      <div className={classes.cardContainer}>
        {deck.cards.map((card, index) => (
          <CardImageDisplay key={index} imageUrl={card.imageUrl} />
        ))}
      </div>
    </div>
  );
}

const useStyles = createStyles(() => {
  return {
    container: {
      display: 'grid',
      gridTemplateRows: 'auto 1fr',
    },

    deckHeader: {
      display: 'flex',
      justifyContent: 'space-between',

      padding: defaultPadding,
    },

    cardContainer: {
      display: 'flex',
      flexDirection: 'row',

      overflow: 'auto',
    },
  };
});
