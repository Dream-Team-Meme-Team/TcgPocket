import { Flex, Group, Pagination, createStyles } from '@mantine/core';
import { CardDisplay } from '../../../components/card-display/card-display';
import { CardDisplayDto } from '../../../types/cards';
import { PagedResult } from '../../../types/shared';

type InventoryDisplayProps = {
  paginatedCards: PagedResult<CardDisplayDto> | undefined;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  isLoading: boolean;
};

export const InventoryDisplay: React.FC<InventoryDisplayProps> = ({
  paginatedCards: cards,
  setCurrentPage,
  currentPage,
  isLoading,
}) => {
  const { classes } = useStyles();

  return (
    <div>
      <Group spacing={20} className={classes.inventoryDisplayGroup}>
        {cards?.items.map((cards: CardDisplayDto) => (
          <CardDisplay key={cards.id} isLoading={isLoading} card={cards} />
        ))}
      </Group>
      <Pagination
        color={'violet'}
        withEdges
        siblings={2}
        boundaries={2}
        className={classes.paginationControls}
        value={currentPage}
        onChange={setCurrentPage}
        total={cards?.pageCount ?? 16}
      />
      <Flex justify={'end'}></Flex>
    </div>
  );
};

const useStyles = createStyles(() => ({
  paginationControls: {
    padding: '10px',
    paddingRight: '20px',
    justifyContent: 'right',
  },

  inventoryDisplayContainer: {
    width: '100%',
    height: '100%',
  },

  inventoryDisplayGroup: {
    backgroundColor: '#514254',
    padding: '40px',
    paddingTop: '10px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignContent: 'baseline',
    width: 1618,
    height: 1050,
    overflow: 'hidden',
  },
}));
