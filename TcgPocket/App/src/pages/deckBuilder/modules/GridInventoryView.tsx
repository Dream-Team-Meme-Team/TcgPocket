import { createStyles } from '@mantine/styles';
import { CardDisplayDto } from '../../../types/cards';
import { defaultGap } from '../../../constants/theme';
import { HoverInventoryCard } from './HoverInventoryCard';

export type ViewProps = {
  cards: CardDisplayDto[];
};

export function GridInventoryView({ cards }: ViewProps): React.ReactElement {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      {cards.map((card, index) => (
        <HoverInventoryCard key={index} card={card} />
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
