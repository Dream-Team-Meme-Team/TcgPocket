import { HoverCard, Text, createStyles } from '@mantine/core';
import { CardImageDisplay } from '../../../components/cardDisplay/modules/CardImageDisplay';
import { CardAttributeDisplayDto, CardDisplayDto } from '../../../types/cards';
import { useState, useEffect } from 'react';
import { CardTypeGetDto } from '../../../types/card-types';
import { defaultGap } from '../../../constants/theme';

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
              cardType={card.cardType}
              attributes={card.attributes}
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

  const [properties, setProperties] = useState<string[]>([]);

  useEffect(() => {
    if (attributes[0].attributeName.includes(cardType.name)) {
      setProperties([cardType.name]);
    } else {
      const temp: string[] = [];

      attributes.forEach((attribute) => {
        temp.push(attribute.attributeName, ' ');
      });

      setProperties(temp);
    }
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
