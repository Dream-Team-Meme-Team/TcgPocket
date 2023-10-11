import { useState } from 'react';
import { CardsService } from '../../services/CardsService';
import { useAppSelector } from '../../store/configureStore';
import { CardDisplayDto, CardFilterDto } from '../../types/cards';
import { InventoryDisplay } from '../home/modules/inventory-display-component';
import { useAsync } from 'react-use';
import { error } from '../../services/helpers/notification';
import { PagedResult } from '../../types/shared';
import { Group, createStyles } from '@mantine/core';

export function InventoryPage(): React.ReactElement {
  const { classes } = useStyles();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const user = useAppSelector((state) => state.user);

  const paged: CardFilterDto = {
    currentPage: currentPage,
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
  const fetchCards = useAsync(async () => {
    const response = await CardsService.getUserInventory(paged);

    if (response.hasErrors) {
      return response.errors.forEach((err) => error(err.message));
    }

    return response;
  }, [currentPage, user]);

  const pagedCards: PagedResult<CardDisplayDto> | undefined =
    fetchCards?.value?.data;
  return (
    <div>
      <Group className={classes.y}>
        <div className={classes.x} />
        {pagedCards && pagedCards.items && (
          <InventoryDisplay
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            paginatedCards={fetchCards?.value?.data}
            isLoading={fetchCards.loading}
          />
        )}
      </Group>
    </div>
  );
}

const useStyles = createStyles(() => ({
  x: {
    height: 500,
    margin: 0,
    padding: 0,
    width: 200,
    display: 'flex',
    justifyContent: 'start',
  },
  y: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
}));
