import { useEffect, useMemo } from 'react';
import { dispatch, useAppSelector } from '../../../../store/configureStore';
import { TabInfoHeader } from '../headers/TabInfoHeader';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { ActionIcon, MantineTheme, createStyles } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { AttributeGetDto } from '../../../../types/attributes';
import { EditModal } from '../modals/EditModal';
import {
  deleteAttribute,
  editAttribute,
  getAllAttributes,
} from '../../../../services/dataServices/AttributeServices';
import { responseWrapper } from '../../../../services/helpers/responseWrapper';
import { DeleteModal } from '../../../../components/modals/DeleteModal';
import { setSelectedId } from '../../../../store/adminSlice';
import { AdminTabLabel } from '../../../../enums/adminTabLabel';
import { shallowEqual } from 'react-redux';

const titles: string[] = ['Name', 'Game', 'Edit', 'Delete'];
const colValue: string = '1fr ';

export const AttributeTab: React.FC = () => {
  const numOfCol = colValue.repeat(titles.length);
  const { classes } = useStyles(numOfCol);

  const [openDelete, { toggle: toggleDelete }] = useDisclosure();
  const [openEdit, { toggle: toggleEdit }] = useDisclosure();

  // const attributes = useAppSelector((state) => state.data.attributes);
  // const games = useAppSelector((state) => state.data.games);
  // const searchTerm = useAppSelector((state) => state.admin.searchTerm);
  // const selectedId = useAppSelector((state) => state.admin.selectedId);
  // const selectedGameId = useAppSelector((state) => state.admin.selectedGameId);
  // const selectedTab = useAppSelector((state) => state.admin.selectedTab);

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

  return (
    <div className={classes.attributeTabContainer}>
      <TabInfoHeader titles={titles} />

      {renderedAttributes.length !== 0 ? (
        <div>
          {renderedAttributes.map((attribute, index) => {
            return (
              <div key={index} className={classes.renderedAttributeContainer}>
                <div> {attribute.name} </div>

                <div> {findGame(attribute.gameId)} </div>

                <ActionIcon onClick={() => selectAndOpenEdit(attribute)}>
                  <IconEdit />
                </ActionIcon>

                <ActionIcon onClick={() => selectAndOpenDelete(attribute)}>
                  <IconTrash />
                </ActionIcon>

                <div>
                  {selectedId === attribute.id && (
                    <EditModal
                      open={openEdit}
                      setOpen={toggleEdit}
                      submitAction={editSelectedAttribute}
                      value={attribute}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={classes.renderedAttributeContainer}>
          <i> No data to display </i>
        </div>
      )}

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
        backgroundColor: theme.colors.primaryColor[0],

        borderRadius: 7,
        paddingLeft: 8,
      },
    },
  };
});
