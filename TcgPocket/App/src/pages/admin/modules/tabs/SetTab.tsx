import { useEffect } from 'react';
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
import { setPageCount } from '../../../../store/adminSlice';
import eventBus from '../../../../helpers/eventBus';

export const SetTab: React.FC = () => {
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

  const [sets, fetchSets] = useAsyncFn(async () => {
    const { payload } = await dispatch(
      getAllFilteredSets({
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
  }, [pageSize, currentPage, selectedGameId, searchTerm]);

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

    const subscription = eventBus.subscribe('setAdded', () => {
      fetchSets();
    });

    return () => {
      eventBus.unsubscribe('setAdded', subscription);
    };
  }, [fetchSets, selectedGameId, selectedTab]);

  return (
    <div>
      <AdminPaginatedTable
        data={sets.value?.items}
        loading={sets.loading}
        editFn={editSelectedSet}
        deleteFn={deleteSelectedSet}
        typeName="Set"
        tableWidth="100%"
      />
    </div>
  );
};
