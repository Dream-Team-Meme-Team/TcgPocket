import { useState } from 'react';
import { CardsService } from '../../services/CardsService';
import { useAppSelector } from '../../store/configureStore';
import { CardFilterDto } from '../../types/cards';
import { InventoryDisplay } from './modlues/inventory-display-component';
import { useAsync } from 'react-use';
import { error } from '../../services/helpers/notification';
import { Group, createStyles } from '@mantine/core';

const paged: CardFilterDto = {
  currentPage: 1,
  pageSize: 16,
  cardNumber: undefined,
  cardTypeIds: undefined,
  description: undefined,
  gameIds: undefined,
  id: undefined,
  imageUrl: undefined,
  name: undefined,
  orderBy: 'asc',
  rarityIds: undefined,
  setIds: undefined,
  sortBy: 'gameId',
};

type InventoryPageProps = {
  pagedCardsRequest: CardFilterDto;
};

export const InventoryPage: React.FC<InventoryPageProps> = ({
  pagedCardsRequest,
}) => {
  const { classes } = useStyles();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const user = useAppSelector((state) => state.user);

  //to make it work for testing and PR purpuses. can be removed post pr
  pagedCardsRequest = paged;

  //things we may want to keep for consistency with presenting, like page size
  pagedCardsRequest.currentPage = currentPage;
  pagedCardsRequest.pageSize = 16;
  pagedCardsRequest.orderBy = 'asc';

  const fetchCards = useAsync(async () => {
    const response = await CardsService.getUserInventory(pagedCardsRequest);

    if (response.hasErrors) {
      return response.errors.forEach((err) => error(err.message));
    }

    return response;
  }, [currentPage, user]);

  return (
    <div>
      <Group className={classes.wrapper}>
        {/* Used as filter placeholder*/}
        <div className={classes.filterPlaceholder} />
        <InventoryDisplay
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          paginatedCards={fetchCards?.value?.data}
          isLoading={fetchCards.loading}
        />
      </Group>
    </div>
  );
};

const useStyles = createStyles(() => ({
  filterPlaceholder: {
    height: 500,
    margin: 0,
    padding: 0,
    width: 200,
    display: 'flex',
    justifyContent: 'start',
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
}));