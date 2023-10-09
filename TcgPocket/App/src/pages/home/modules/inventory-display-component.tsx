import {
  Container,
  Flex,
  Group,
  Pagination,
  createStyles,
} from '@mantine/core';
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
    <Container className={classes.inventoryDisplayContainer} fluid>
      <Group className={classes.inventoryDisplayGroup}>
        {cards &&
          cards.items &&
          cards.items.map((g: CardDisplayDto) => <CardDisplay card={g} />)}
        <Flex justify={'end'}>
          <Pagination
            withEdges
            className={classes.paginationControls}
            value={currentPage}
            onChange={setCurrentPage}
            total={cards.pageCount}
          />
        </Flex>
      </Group>
    </Container>
  );
};

const useStyles = createStyles(() => ({
  paginationControls: {
    padding: '10px',
    justifyContent: 'right',
  },

  inventoryDisplayContainer: {},

  inventoryDisplayGroup: {
    backgroundColor: '#1e2e38',
    padding: '35px',
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'start',
  },
}));
