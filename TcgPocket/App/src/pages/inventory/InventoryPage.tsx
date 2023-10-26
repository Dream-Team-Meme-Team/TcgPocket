import { useMemo, useState } from 'react';
import { CardsService } from '../../services/CardsService';
import { CardFilterDto } from '../../types/cards';
import { InventoryDisplay } from './modules/InventoryDisplay';
import { useAsync } from 'react-use';
import { error } from '../../services/helpers/Notification';
import { createStyles } from '@mantine/core';
import { useNavbarHeight } from '../../hooks/useNavbarHeight';

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
import { createStyles } from '@mantine/core';
import { dispatch, useAppSelector } from '../../store/configureStore';
import {
    toggleAllFiltersOnInventory,
    toggleAppliedFilterOnInventory,
} from '../../store/inventorySlice';
import React, { useEffect, useState } from 'react';
import { CardTypeGetDto } from '../../types/card-types';
import { FilterMenu } from './modules/FilterMenu';
import { InventoryDisplay } from './modlues/inventory-display-component';
import { getUserInventory } from '../../services/CardsService';
import { useNavbarHeight } from '../../hooks/use-navbar-height';
import { responseWrapper } from '../../services/helpers/responseWrapper';

export function InventoryPage(): React.ReactElement {
    const { classes } = useStyles();

    const appliedFilters = useAppSelector(
        (state) => state.inventory.appliedFilters
    );

    const user = useAppSelector((state) => state.user.user);

    const [cards, loading, pagedFilters] = useAppSelector((state) => [
        state.inventory.cards,
        state.inventory.loading,
        state.inventory.pagedFilters,
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const [cardFilters, setCardFilters] = useState(pagedFilters);

    const handleTogglingFilter = (option: CardTypeGetDto) => {
        dispatch(toggleAppliedFilterOnInventory(option));
    };

    const handleSelectAll = (filterOptions: CardTypeGetDto[]) => {
        void dispatch(toggleAllFiltersOnInventory(filterOptions));
    };

    const handleRemoveFilter = (filter: CardTypeGetDto) => {
        dispatch(toggleAppliedFilterOnInventory(filter));
    };

    useEffect(() => {
        dispatch(getUserInventory(cardFilters)).then(({ payload }) => {
            responseWrapper(payload);
        });
    }, [currentPage, user, cardFilters]);

    return (
        <div className={classes.filterAndCardContainer}>
            <FilterMenu
                appliedFilters={appliedFilters}
                actions={{
                    handleRemoveFilter: handleRemoveFilter,
                    handleSelectAllFilters: handleSelectAll,
                    handleTogglingFilter: handleTogglingFilter,
                    setCardFilters: setCardFilters,
                    cardFilters: cardFilters,
                }}
            />

            <InventoryDisplay
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                paginatedCards={cards}
                isLoading={loading}
            />
        </div>
    );
}

const useStyles = createStyles(() => {
    const { remainingHeight } = useNavbarHeight();

    return {
        filterAndCardContainer: {
            display: 'grid',
            gridTemplateColumns: '15rem 1fr',

            height: remainingHeight,
            overflow: 'hidden',
        },
    };
});
