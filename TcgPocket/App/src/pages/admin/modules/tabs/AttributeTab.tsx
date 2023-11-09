import { useEffect } from 'react';
import { dispatch, useAppSelector } from '../../../../store/configureStore';
import { AttributeGetDto } from '../../../../types/attributes';
import {
  deleteAttribute,
  editAttribute,
  getAllFilteredAttributes,
} from '../../../../services/dataServices/attributeServices';
import { responseWrapper } from '../../../../services/helpers/responseWrapper';
import { AdminTabLabel } from '../../../../enums/adminTabLabel';
import { shallowEqual } from 'react-redux';
import { useAsyncFn } from 'react-use';
import { AdminPaginatedTable } from '../AdminPaginatedTable';
import { setPageCount } from '../../../../store/adminSlice';

export const AttributeTab: React.FC = () => {
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

  const [attributes, fetchAttributes] = useAsyncFn(async () => {
    const { payload } = await dispatch(
      getAllFilteredAttributes({
        gameId: selectedGameId,
        currentPage: currentPage,
        pageSize: pageSize,
        name: searchTerm,
      })
    );

    if (payload && !payload.hasErrors) {
      dispatch(setPageCount(payload?.data.pageCount));
    }

    return payload?.data;
  }, [currentPage, pageSize, selectedGameId, searchTerm]);

  const editSelectedAttribute = async (editedAttribute: AttributeGetDto) => {
    const updatedAttribute: AttributeGetDto = {
      id: editedAttribute.id,
      name: editedAttribute.name,
      gameId: selectedGameId,
    };

    dispatch(editAttribute(updatedAttribute)).then(({ payload }) => {
      responseWrapper(payload, 'Attribute Edited');

      if (payload && !payload.hasErrors) {
        fetchAttributes();
      }
    });
  };

  const deleteSelectedAttribute = async () => {
    dispatch(deleteAttribute(selectedId)).then(({ payload }) => {
      responseWrapper(payload, 'Attribute Deleted');

      if (payload && !payload.hasErrors) {
        fetchAttributes();
      }
    });
  };

  useEffect(() => {
    if (selectedGameId === 0 || selectedTab !== AdminTabLabel.Attributes)
      return;
    fetchAttributes();
  }, [fetchAttributes, selectedGameId, selectedTab]);

  return (
    <div>
      <AdminPaginatedTable
        data={attributes.value?.items}
        loading={attributes.loading}
        editFn={editSelectedAttribute}
        deleteFn={deleteSelectedAttribute}
        typeName="Attribute"
        tableWidth="97%"
      />
    </div>
  );
};
