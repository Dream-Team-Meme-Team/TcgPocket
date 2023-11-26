import { useEffect } from 'react';
import { dispatch, useAppSelector } from '../../../../store/configureStore';
import { responseWrapper } from '../../../../services/helpers/responseWrapper';
import { RarityGetDto } from '../../../../types/rarities';
import { AdminTabLabel } from '../../../../enums/adminTabLabel';
import { shallowEqual } from 'react-redux';
import {
  deleteRarity,
  editRarity,
  getAllFilteredRarities,
} from '../../../../services/dataServices/rarityServices';
import { AdminPaginatedTable } from '../AdminPaginatedTable';
import { useAsyncFn } from 'react-use';
import { setPageCount } from '../../../../store/adminSlice';
import eventBus from '../../../../helpers/eventBus';

export const RarityTab: React.FC = () => {
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

  const [rarities, fetchRarities] = useAsyncFn(async () => {
    const { payload } = await dispatch(
      getAllFilteredRarities({
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

  const deleteSelectedRarity = async () => {
    dispatch(deleteRarity(selectedId)).then(({ payload }) => {
      responseWrapper(payload, 'Rarity Deleted');

      if (payload && !payload.hasErrors) {
        fetchRarities();
      }
    });
  };

  const editSelectedRarity = async (editedRarity: RarityGetDto) => {
    const updatedRarity: RarityGetDto = {
      id: editedRarity.id,
      name: editedRarity.name,
      gameId: selectedGameId,
    };

    dispatch(editRarity(updatedRarity)).then(({ payload }) => {
      responseWrapper(payload, 'Rarity Edited');

      if (payload && !payload.hasErrors) {
        fetchRarities();
      }
    });
  };

  useEffect(() => {
    if (selectedGameId === 0 || selectedTab !== AdminTabLabel.Rarities) return;
    fetchRarities();

    const subscription = eventBus.subscribe('rarityAdded', () => {
      fetchRarities();
    });

    return () => {
      eventBus.unsubscribe('rarityAdded', subscription);
    };
  }, [fetchRarities, selectedGameId, selectedTab]);

  return (
    <div>
      <AdminPaginatedTable
        data={rarities.value?.items}
        loading={rarities.loading}
        editFn={editSelectedRarity}
        deleteFn={deleteSelectedRarity}
        typeName="Rarity"
        tableWidth="100%"
      />
    </div>
  );
};
