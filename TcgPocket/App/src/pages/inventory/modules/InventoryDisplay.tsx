import {
  MantineTheme,
  Pagination,
  ScrollArea,
  createStyles,
} from '@mantine/core';
import { CardDisplay } from '../../../components/card-display/CardDisplay';
import { CardDisplayDto } from '../../../types/cards';
import { PagedResult } from '../../../types/shared';
import { useMemo } from 'react';

type InventoryDisplayProps = {
  paginatedCards: PagedResult<CardDisplayDto> | undefined;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  isLoading: boolean;
};

export function InventoryDisplay({
  paginatedCards: cards,
  setCurrentPage,
  currentPage,
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

      <Pagination
        color={'violet'}
        withEdges
        siblings={2}
        boundaries={2}
        className={classes.paginationControls}
        value={currentPage}
        onChange={setCurrentPage}
        total={cards ? cards.pageCount : 16}
      />
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
      gridTemplateRows: '1fr auto',

      overflowY: 'hidden',
    },

    inventoryDisplayGroup: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, 368px)',
      justifyContent: 'center',

      columnGap: '8px',
      rowGap: '20px',
      paddingTop: '10px',
      paddingBottom: '10px',

      backgroundColor: theme.colors.inventoryBackgroundColor,
    },
  };
});
