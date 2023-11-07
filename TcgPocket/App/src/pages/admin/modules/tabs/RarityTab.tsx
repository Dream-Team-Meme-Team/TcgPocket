import { useEffect, useState } from 'react';
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

export const RarityTab: React.FC = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, selectedId, selectedGameId, selectedTab] = useAppSelector(
    (state) => [
      state.admin.searchTerm,
      state.admin.selectedId,
      state.admin.selectedGameId,
      state.admin.selectedTab,
    ],
    shallowEqual
  );

  const [rarities, fetchRarities] = useAsyncFn(async () => {
    const { payload } = await dispatch(
      getAllFilteredRarities({
        gameId: selectedGameId,
        currentPage: page,
        pageSize: 25,
        name: searchTerm,
      })
    );

    return payload?.data;
  }, [page, selectedGameId, searchTerm]);

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
  }, [fetchRarities, selectedGameId, selectedTab]);

  return (
    <div>
      <AdminPaginatedTable
        data={rarities.value}
        loading={rarities.loading}
        page={page}
        setPage={setPage}
        editFn={editSelectedRarity}
        deleteFn={deleteSelectedRarity}
        tableWidth="97%"
      />
    </div>
  );
};
