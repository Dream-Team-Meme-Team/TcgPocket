import { useEffect, useState } from 'react';
import { dispatch, useAppSelector } from '../../../../store/configureStore';
import {
  deleteSet,
  editSet,
  getAllFilteredSets,
} from '../../../../services/dataServices/setServices';
import { responseWrapper } from '../../../../services/helpers/responseWrapper';
import { SetGetDto } from '../../../../types/sets';
import { AdminTabLabel } from '../../../../enums/adminTabLabel';
import { shallowEqual } from 'react-redux';
import { useAsyncFn } from 'react-use';
import { AdminPaginatedTable } from '../AdminPaginatedTable';

export const SetTab: React.FC = () => {
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

  const [sets, fetchSets] = useAsyncFn(async () => {
    const { payload } = await dispatch(
      getAllFilteredSets({
        gameId: selectedGameId,
        currentPage: page,
        pageSize: 25,
        name: searchTerm,
      })
    );

    return payload?.data;
  }, [page, selectedGameId, searchTerm]);

  const deleteSelectedSet = async () => {
    dispatch(deleteSet(selectedId)).then(({ payload }) => {
      responseWrapper(payload, 'Set Deleted');

      if (payload && !payload.hasErrors) {
        fetchSets();
      }
    });
  };

  const editSelectedSet = async (editedSet: SetGetDto) => {
    const updatedSet: SetGetDto = {
      id: editedSet.id,
      name: editedSet.name,
      gameId: selectedGameId,
    };

    dispatch(editSet(updatedSet)).then(({ payload }) => {
      responseWrapper(payload, 'Set Edited');

      if (payload && !payload.hasErrors) {
        fetchSets();
      }
    });
  };

  useEffect(() => {
    if (selectedGameId === 0 || selectedTab !== AdminTabLabel.Sets) return;
    fetchSets();
  }, [fetchSets, selectedGameId, selectedTab]);

  return (
    <div>
      <AdminPaginatedTable
        data={sets.value?.items}
        loading={sets.loading}
        pageCount={sets.value?.pageCount ?? 1}
        page={page}
        setPage={setPage}
        editFn={editSelectedSet}
        deleteFn={deleteSelectedSet}
        typeName="Set"
        tableWidth="97%"
      />
    </div>
  );
};
