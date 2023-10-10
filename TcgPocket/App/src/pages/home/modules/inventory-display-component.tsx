import { Flex, Group, Pagination, createStyles } from '@mantine/core';
import { CardDisplay } from '../../../components/card-display/card-display';
import { CardDisplayDto } from '../../../types/cards';
import { PagedResult } from '../../../types/shared';

type InventoryDisplayProps = {
  paginatedCards: PagedResult<CardDisplayDto>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
};

export const InventoryDisplay: React.FC<InventoryDisplayProps> = ({
  paginatedCards: cards,
  currentPage,
  setCurrentPage,
}) => {
  const { classes } = useStyles();
  return (
    <div className={classes.inventoryDisplayContainer}>
      <Group className={classes.inventoryDisplayGroup}>
        {cards &&
          cards.items &&
          cards.items.map((g: CardDisplayDto) => <CardDisplay card={g} />)}
      </Group>
      <Pagination
        color={'violet'}
        withEdges
        className={classes.paginationControls}
        value={currentPage}
        onChange={setCurrentPage}
        total={cards.pageCount}
      />
      <Flex justify={'end'}></Flex>
    </div>
  );
};

const useStyles = createStyles(() => ({
  paginationControls: {
    padding: '10px',
    justifyContent: 'right',
  },

  inventoryDisplayContainer: {
    width: 1618,
    height: 1050,
  },

  inventoryDisplayGroup: {
    backgroundColor: '#514254',
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'baseline',
    width: 1618,
    height: 1050,
    overflow: 'hidden',
  },
}));
