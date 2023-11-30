import { MantineTheme, ScrollArea, createStyles } from '@mantine/core';
import { CardDisplayDto } from '../../../types/cards';
import { PagedResult } from '../../../types/shared';
import { useMemo } from 'react';
import { CardDisplay } from '../../../components/cardDisplay/CardDisplay';

type InventoryDisplayProps = {
  paginatedCards: PagedResult<CardDisplayDto> | null;
  isLoading: boolean;
};

export function InventoryDisplay({
  paginatedCards: cards,
  isLoading,
}: InventoryDisplayProps) {
  const { classes } = useStyles();

  const renderCards = useMemo(() => {
    return cards ? cards.items : [];
  }, [cards]);

  return (
    <div className={classes.inventoryDisplayContainer}>
      <ScrollArea>
        <div className={classes.inventoryDisplayGroup}>
          {renderCards.map((cards, index) => (
            <CardDisplay key={index} isLoading={isLoading} card={cards} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

const useStyles = createStyles((theme: MantineTheme) => {
  return {
    paginationControls: {
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '10px',
    },

    inventoryDisplayContainer: {
      display: 'grid',

      overflowY: 'hidden',
    },

    inventoryDisplayGroup: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, 368px)',
      justifyContent: 'center',

      columnGap: '15px',
      rowGap: '15px',
      paddingTop: '10px',
      paddingBottom: '10px',

      backgroundColor: theme.colors.inventoryBackgroundColor,
    },
  };
});
