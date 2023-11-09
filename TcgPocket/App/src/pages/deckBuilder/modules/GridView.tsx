import { createStyles } from '@mantine/styles';
import { CardDisplayDto } from '../../../types/cards';
import { CardImageDisplay } from '../../../components/cardDisplay/modules/CardImageDisplay';
import { defaultGap } from '../../../constants/theme';

export type ViewProps = {
  cards: CardDisplayDto[];
};

export function GridView({ cards }: ViewProps): React.ReactElement {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      {cards.map((card, index) => (
        <CardImageDisplay key={index} imageUrl={card.imageUrl} />
      ))}
    </div>
  );
}

const useStyles = createStyles(() => {
  return {
    container: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, 150px)',
      justifyContent: 'center',

      gap: defaultGap,
    },
  };
});
