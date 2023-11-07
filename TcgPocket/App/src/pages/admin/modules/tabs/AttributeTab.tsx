import { useEffect, useState } from 'react';
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

export const AttributeTab: React.FC = () => {
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

  const [attributes, fetchAttributes] = useAsyncFn(async () => {
    const { payload } = await dispatch(
      getAllFilteredAttributes({
        gameId: selectedGameId,
        currentPage: page,
        pageSize: 25,
        name: searchTerm,
      })
    );

    return payload?.data;
  }, [page, selectedGameId, searchTerm]);

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
        data={attributes.value}
        loading={attributes.loading}
        page={page}
        setPage={setPage}
        editFn={editSelectedAttribute}
        deleteFn={deleteSelectedAttribute}
        tableWidth="97%"
      />
    </div>
  );
};
