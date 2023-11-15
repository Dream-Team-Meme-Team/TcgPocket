import { createStyles } from '@mantine/styles';
import { CardDisplayDto } from '../../../types/cards';
import { CardImageDisplay } from '../../../components/cardDisplay/modules/CardImageDisplay';
import { defaultGap } from '../../../constants/theme';
import { HoverCard, Popover, Text } from '@mantine/core';

export type ViewProps = {
  cards: CardDisplayDto[];
};

export function GridView({ cards }: ViewProps): React.ReactElement {
  const { classes } = useStyles();

  return (
    <div className={classes.container} onScroll={(e) => console.log(e)}>
      {cards.map((card, index) => (
        <HoverCard key={index} position="top" withArrow>
          <HoverCard.Target>
            <div>
              <CardImageDisplay imageUrl={card.imageUrl} />
            </div>
          </HoverCard.Target>

          <HoverCard.Dropdown>
            <Text> {card.name} </Text>
            <Text> {card.cardType.name} </Text>
          </HoverCard.Dropdown>
        </HoverCard>
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
