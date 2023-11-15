import { useEffect } from 'react';
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
import { setPageCount } from '../../../../store/adminSlice';

export const CardTypeTab: React.FC = () => {
  const [
    searchTerm,
    selectedId,
    selectedGameId,
    selectedTab,
    currentPage,
    pageSize,
  ] = useAppSelector(
    (state) => [
      state.admin.searchTerm,
      state.admin.selectedIdInPaginatedTable,
      state.admin.selectedGameId,
      state.admin.selectedTab,
      state.admin.currentPage,
      state.admin.pageSize,
    ],
    shallowEqual
  );

  const [cardTypes, fetchCardTypes] = useAsyncFn(async () => {
    const { payload } = await dispatch(
      getAllFilteredCardTypes({
        gameId: selectedGameId,
        currentPage: currentPage,
        pageSize: pageSize,
        name: searchTerm,
      })
    );

    if (payload && !payload.hasErrors) {
      dispatch(setPageCount(payload.data.pageCount));
    }

    return payload?.data;
  }, [currentPage, pageSize, selectedGameId, searchTerm]);

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
        editFn={editSelectedCardType}
        deleteFn={deleteSelectedCardType}
        typeName="Card Type"
        tableWidth="100%"
      />
    </div>
  );
};
