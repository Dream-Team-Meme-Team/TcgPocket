import { useEffect, useMemo, useState } from 'react';
import { dispatch, useAppSelector } from '../../../../store/configureStore';
import { MantineTheme, createStyles } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { AttributeGetDto } from '../../../../types/attributes';
import {
  deleteAttribute,
  editAttribute,
  getAllAttributes,
  getAllFilteredAttributes,
} from '../../../../services/dataServices/attributeServices';
import { responseWrapper } from '../../../../services/helpers/responseWrapper';
import { DeleteModal } from '../../../../components/modals/DeleteModal';
import { setSelectedId } from '../../../../store/adminSlice';
import { AdminTabLabel } from '../../../../enums/adminTabLabel';
import { shallowEqual } from 'react-redux';
import { useAsync } from 'react-use';
import { PaginatedTable } from '../../../../components/PaginatedTable';

const titles: string[] = ['Name', 'Game', 'Edit', 'Delete'];
const colValue: string = '1fr ';

export const AttributeTab: React.FC = () => {
  const numOfCol = colValue.repeat(titles.length);
  const { classes } = useStyles(numOfCol);

  const [openDelete, { toggle: toggleDelete }] = useDisclosure();
  const [openEdit, { toggle: toggleEdit }] = useDisclosure();

  const [attributes, games] = useAppSelector(
    (state) => [state.data.attributes, state.data.games],
    shallowEqual
  );

  const [searchTerm, selectedId, selectedGameId, selectedTab] = useAppSelector(
    (state) => [
      state.admin.searchTerm,
      state.admin.selectedId,
      state.admin.selectedGameId,
      state.admin.selectedTab,
    ],
    shallowEqual
  );

  const renderedAttributes = useMemo(() => {
    return attributes
      .filter((attribute) => attribute.gameId === selectedGameId)
      .filter((attribute) =>
        attribute.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [attributes, searchTerm, selectedGameId]);

  const selectAndOpenDelete = (value: AttributeGetDto) => {
    toggleDelete();
    dispatch(setSelectedId(value.id));
  };

  const selectAndOpenEdit = (value: AttributeGetDto) => {
    toggleEdit();
    dispatch(setSelectedId(value.id));
  };

  const loadAttributes = async () => {
    const { payload } = await dispatch(getAllAttributes());
    responseWrapper(payload);
  };

  const deleteSelectedAttribute = async () => {
    dispatch(deleteAttribute(selectedId)).then(({ payload }) => {
      responseWrapper(payload, 'Attribute Deleted');

      if (payload && !payload.hasErrors) {
        loadAttributes();
      }
    });
  };

  const editSelectedAttribute = async (editedAttribute: AttributeGetDto) => {
    const updatedAttribute: AttributeGetDto = {
      id: editedAttribute.id,
      name: editedAttribute.name,
      gameId: selectedGameId,
    };

    dispatch(editAttribute(updatedAttribute)).then(({ payload }) => {
      responseWrapper(payload, 'Attribute Edited');

      if (payload && !payload.hasErrors) {
        loadAttributes();
      }
    });
  };

  const findGame = (gameId: number) => {
    const foundGame = games.find((game) => game.id === gameId);

    return foundGame ? foundGame.name : 'Unknown';
  };

  useEffect(() => {
    if (selectedGameId === 0 || selectedTab !== AdminTabLabel.Attributes)
      return;
    loadAttributes();
  }, [selectedGameId, selectedTab]);

  const [page, setPage] = useState(1);

  const fetchAttributes = useAsync(async () => {
    const { payload } = await dispatch(
      getAllFilteredAttributes({
        gameId: 1,
        currentPage: page,
        pageSize: 25,
        name: searchTerm,
      })
    );
    return payload?.data;
  }, [page, searchTerm]);

  const attributesForTable = useMemo(() => {
    const response = fetchAttributes;

    return response;
  }, [fetchAttributes]);

  console.log(attributesForTable);

  return (
    <div>
      <PaginatedTable
        data={attributesForTable.value}
        loading={attributesForTable.loading}
        page={page}
        setPage={setPage}
        tableWidth="95%"
      />

      <DeleteModal
        open={openDelete}
        setOpen={toggleDelete}
        submitAction={deleteSelectedAttribute}
      />
    </div>
  );
};

const useStyles = createStyles((theme: MantineTheme, numOfCol: string) => {
  return {
    attributeTabContainer: {
      paddingLeft: '8px',
    },

    renderedAttributeContainer: {
      display: 'grid',
      gridTemplateColumns: numOfCol,

      ':hover': {
        backgroundColor: theme.fn.darken(
          theme.colors.primaryPurpleColor[0],
          0.2
        ),

        borderRadius: 7,
        paddingLeft: 8,
      },
    },
  };
});
