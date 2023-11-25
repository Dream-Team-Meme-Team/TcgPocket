import { createStyles } from '@mantine/core';
import { defaultGap, defaultPadding } from '../../../constants/theme';
import { Text } from '@mantine/core';
import { ViewProps } from './GridInventoryView';
import { HoverInventoryCard } from './HoverInventoryCard';

export function ListInventoryView({ cards }: ViewProps): React.ReactElement {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      {cards.map((card, index) => (
        <div key={index} className={classes.list}>
          <HoverInventoryCard key={index} card={card} />

          <div className={classes.information}>
            <div>
              <Text>{card.set.name}</Text>
              <Text className={classes.name}>{card.name}</Text>
            </div>

            <div className={classes.cardTypeRarity}>
              <Text>{card.cardType.name}</Text>|<Text>{card.rarity.name}</Text>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const useStyles = createStyles(() => {
  return {
    container: {
      display: 'grid',
      justifyContent: 'flex-start',

      paddingLeft: defaultPadding,
      paddingRight: defaultPadding,
    },

    list: {
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
    },

    information: {
      display: 'grid',
      gridTemplateRows: 'auto auto',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',

      padding: defaultPadding,
    },

    name: {
      fontSize: 20,
      fontWeight: 'bolder',
    },

    cardTypeRarity: {
      display: 'flex',
      justifyContent: 'center',

      gap: defaultGap,
    },

    description: {
      display: 'flex',
      justifyContent: 'center',

      width: '30vw',
    },
  };
});
