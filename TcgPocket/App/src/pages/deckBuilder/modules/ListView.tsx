import { createStyles } from '@mantine/core';
import { CardImageDisplay } from '../../../components/cardDisplay/modules/CardImageDisplay';
import { defaultPadding } from '../../../constants/theme';
import { Text } from '@mantine/core';
import { ViewProps } from './GridView';

export function ListView({ cards }: ViewProps): React.ReactElement {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      {cards.map((card, index) => (
        <div key={index} className={classes.list}>
          <CardImageDisplay imageUrl={card.imageUrl} />

          <div>
            <Text>{card.name}</Text>
            <Text>{card.cardType.name}</Text>
            <Text>{card.set.name}</Text>
            <Text>{card.rarity.name}</Text>
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
    },
  };
});
