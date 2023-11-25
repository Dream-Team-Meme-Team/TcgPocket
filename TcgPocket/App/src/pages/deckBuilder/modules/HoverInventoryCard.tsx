import { HoverCard, Text, createStyles } from '@mantine/core';
import { CardImageDisplay } from '../../../components/cardDisplay/modules/CardImageDisplay';
import { CardAttributeDisplayDto, CardDisplayDto } from '../../../types/cards';
import { useMemo } from 'react';
import { defaultGap } from '../../../constants/theme';
import { CardTypeGetDto } from '../../../types/card-types';

type HoverInventoryCardProps = {
  card: CardDisplayDto;
};

export function HoverInventoryCard({
  card,
}: HoverInventoryCardProps): React.ReactElement {
  const { classes } = useStyles();

  return (
    <HoverCard
      position="right"
      withArrow
      withinPortal
      zIndex={0}
      closeDelay={0}
      openDelay={0}
    >
      <HoverCard.Target>
        <div>
          <CardImageDisplay imageUrl={card.imageUrl} />
        </div>
      </HoverCard.Target>

      <HoverCard.Dropdown>
        <div className={classes.dropdown}>
          <div className={classes.topRow}>
            <Text className={classes.name}> {card.name} </Text>

            <DisplayCardTypeAttributes
              attributes={card.attributes}
              cardType={card.cardType}
            />
          </div>

          <div className={classes.bottomRow}>
            <Text> {card.set.name} </Text>|<Text> {card.rarity.name} </Text>
          </div>

          <div className={classes.description}>
            <Text> {card.description} </Text>
          </div>
        </div>
      </HoverCard.Dropdown>
    </HoverCard>
  );
}

type DisplayCardTypeAttributesProps = {
  cardType: CardTypeGetDto;
  attributes: CardAttributeDisplayDto[];
};

function DisplayCardTypeAttributes({
  cardType,
  attributes,
}: DisplayCardTypeAttributesProps) {
  const { classes } = useStyles();

  const properties = useMemo(() => {
    if (attributes.length === 0) return cardType.name;

    const tempAttributes = attributes.map((x) => x.attributeName + ' ');

    return tempAttributes;
  }, [attributes, cardType]);

  return (
    <Text italic className={classes.properties}>
      {properties}
    </Text>
  );
}

const useStyles = createStyles(() => {
  return {
    dropdown: {
      display: 'grid',
      gridTemplateRows: 'auto auto 1fr',
      gap: defaultGap,

      width: '30vw',
    },

    topRow: {
      display: 'grid',
      justifyContent: 'center',
    },

    name: {
      display: 'flex',
      justifyContent: 'center',

      fontWeight: 'bolder',
      fontSize: 24,
    },

    properties: {
      display: 'flex',
      justifyContent: 'center',
    },

    description: {
      display: 'flex',
      justifyContent: 'center',
    },

    bottomRow: {
      display: 'flex',
      justifyContent: 'center',

      gap: defaultGap,
    },
  };
});
