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

const emptyCardDisplay: CardDisplayDto = {
  attributes: [],
  cardNumber: '',
  cardType: {
    gameId: 0,
    id: 0,
    name: '',
  },
  description: '',
  game: {
    id: 0,
    name: '',
  },
  id: 0,
  imageUrl: '',
  name: '',
  rarity: {
    gameId: 0,
    id: 0,
    name: '',
  },
  set: {
    gameId: 0,
    id: 0,
    name: '',
  },
};
const emptyCards: CardDisplayDto[] = [
  emptyCardDisplay,
  emptyCardDisplay,
  emptyCardDisplay,
  emptyCardDisplay,
  emptyCardDisplay,
  emptyCardDisplay,
  emptyCardDisplay,
  emptyCardDisplay,
  emptyCardDisplay,
  emptyCardDisplay,
  emptyCardDisplay,
  emptyCardDisplay,
  emptyCardDisplay,
  emptyCardDisplay,
  emptyCardDisplay,
  emptyCardDisplay,
];

export const InventoryDisplay: React.FC<InventoryDisplayProps> = ({
  paginatedCards: cards,
  setCurrentPage,
  currentPage,
  isLoading,
}) => {
  const { classes } = useStyles();

  return (
    <div>
      <Group className={classes.inventoryDisplayGroup}>
        {isLoading &&
          emptyCards.map((cards) => (
            <CardDisplay isLoading={isLoading} card={cards} />
          ))}
        {cards?.items.map((cards: CardDisplayDto) => (
          <CardDisplay isLoading={isLoading} card={cards} />
        ))}
      </Group>
      <Pagination
        color={'violet'}
        withEdges
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
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'baseline',
    width: 1618,
    height: 1050,
    overflow: 'hidden',
  },
}));
