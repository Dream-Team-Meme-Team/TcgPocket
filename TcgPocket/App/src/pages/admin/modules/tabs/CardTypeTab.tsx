import { useEffect, useState } from 'react';
import { dispatch, useAppSelector } from '../../../../store/configureStore';
import {
  deleteCardType,
  editCardType,
  getAllFilteredCardTypes,
} from '../../../../services/dataServices/cardTypeServices';
import { responseWrapper } from '../../../../services/helpers/responseWrapper';
import { CardTypeGetDto } from '../../../../types/card-types';
import { AdminTabLabel } from '../../../../enums/adminTabLabel';
import { shallowEqual } from 'react-redux';
import { AdminPaginatedTable } from '../AdminPaginatedTable';
import { useAsyncFn } from 'react-use';

export const CardTypeTab: React.FC = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, selectedId, selectedGameId, selectedTab] = useAppSelector(
    (state) => [
      state.admin.searchTerm,
      state.admin.selectedIdInPaginatedTable,
      state.admin.selectedGameId,
      state.admin.selectedTab,
    ],
    shallowEqual
  );

  const [cardTypes, fetchCardTypes] = useAsyncFn(async () => {
    const { payload } = await dispatch(
      getAllFilteredCardTypes({
        gameId: selectedGameId,
        currentPage: page,
        pageSize: 25,
        name: searchTerm,
      })
    );

    return payload?.data;
  }, [page, selectedGameId, searchTerm]);

  const deleteSelectedCardType = async () => {
    dispatch(deleteCardType(selectedId)).then(({ payload }) => {
      responseWrapper(payload, 'Card Type Deleted');

      if (payload && !payload.hasErrors) {
        fetchCardTypes();
      }
    });
  };

  const editSelectedCardType = async (editedCardType: CardTypeGetDto) => {
    const updatedCardType: CardTypeGetDto = {
      id: editedCardType.id,
      name: editedCardType.name,
      gameId: selectedGameId,
    };

    dispatch(editCardType(updatedCardType)).then(({ payload }) => {
      responseWrapper(payload, 'Card Type Edited');

      if (payload && !payload.hasErrors) {
        fetchCardTypes();
      }
    });
  };

  useEffect(() => {
    if (selectedGameId === 0 || selectedTab !== AdminTabLabel.CardTypes) return;
    fetchCardTypes();
  }, [fetchCardTypes, selectedGameId, selectedTab]);

  return (
    <div>
      <AdminPaginatedTable
        data={cardTypes.value?.items}
        loading={cardTypes.loading}
        pageCount={cardTypes.value?.pageCount ?? 1}
        page={page}
        setPage={setPage}
        editFn={editSelectedCardType}
        deleteFn={deleteSelectedCardType}
        typeName="Card Type"
        tableWidth="97%"
      />
    </div>
  );
};
