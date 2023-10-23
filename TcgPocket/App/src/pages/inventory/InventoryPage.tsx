import { useMemo, useState } from 'react';
import { CardsService } from '../../services/CardsService';
import { CardFilterDto } from '../../types/cards';
import { InventoryDisplay } from './modules/InventoryDisplay';
import { useAsync } from 'react-use';
import { error } from '../../services/helpers/notification';
import { createStyles } from '@mantine/core';
import { useNavbarHeight } from '../../hooks/use-navbar-height';

const paged: CardFilterDto = {
  currentPage: 1,
  pageSize: 16,
  cardNumber: undefined,
  cardTypeId: undefined,
  description: undefined,
  gameId: undefined,
  id: undefined,
  imageUrl: undefined,
  name: undefined,
  orderBy: 'asc',
  rarityId: undefined,
  setId: undefined,
  sortBy: 'gameId',
};

export function InventoryPage(): React.ReactElement {
  const { classes } = useStyles();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const pagedCardsRequest = paged;

  const fetchCards = useAsync(async () => {
    const response = await CardsService.getUserInventory(pagedCardsRequest);

    if (response.hasErrors) {
      return response.errors.forEach((err) => error(err.message));
    }

    return response;
  }, [currentPage]);

  const paginatedCards = useMemo(() => {
    return fetchCards && fetchCards.value ? fetchCards.value.data : undefined;
  }, [fetchCards]);

  return (
    <div className={classes.wrapper}>
      {/* Used as filter placeholder*/}
      <div />

      <InventoryDisplay
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        paginatedCards={paginatedCards}
        isLoading={fetchCards.loading}
      />
    </div>
  );
}

const useStyles = createStyles(() => {
  const { remainingHeight } = useNavbarHeight();

  return {
    wrapper: {
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',

      height: remainingHeight,
    },
  };
});
