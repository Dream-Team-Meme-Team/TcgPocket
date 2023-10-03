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

const titles: string[] = ['Name', 'Edit', 'Delete'];
const colValue: string = '1fr ';

export function AttributeTab(): React.ReactElement {
  const numOfCol = colValue.repeat(titles.length);
  const { classes } = useStyles(numOfCol);

  const [openDelete, { toggle: toggleDelete }] = useDisclosure();
  const [openEdit, { toggle: toggleEdit }] = useDisclosure();

  const attributes = useAppSelector((state) => state.data.attributes);
  const searchTerm = useAppSelector((state) => state.admin.searchTerm);
  const selectedId = useAppSelector((state) => state.admin.selectedId);
  const selectedGameId = useAppSelector((state) => state.admin.selectedGameId);
  const selectedTab = useAppSelector((state) => state.admin.selectedTab);

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
    const { payload } = await dispatch(deleteAttribute(selectedId));
    responseWrapper(payload, 'Attribute Deleted');

    if (payload && !payload.hasErrors) {
      loadAttributes();
    }
  };

  const editSelectedAttribute = async (editedAttribute: AttributeGetDto) => {
    const updatedAttribute: AttributeGetDto = {
      id: editedAttribute.id,
      name: editedAttribute.name,
      gameId: selectedGameId,
    };

    const { payload } = await dispatch(editAttribute(updatedAttribute));
    responseWrapper(payload, 'Attribute Edited');

    if (payload && !payload.hasErrors) {
      loadAttributes();
    }
  };

  useEffect(() => {
    if (selectedGameId === 0 || selectedTab !== AdminTabLabel.ATTRIBUTES)
      return;
    loadAttributes();
  }, [selectedGameId, selectedTab]);

  return (
    <div className={classes.attributeTabContainer}>
      <TabInfoHeader titles={titles} />

      <div>
        {renderedAttributes.map((attribute, index) => {
          return (
            <div key={index} className={classes.renderedAttributeContainer}>
              <div> {attribute.name} </div>

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

      <DeleteModal
        open={openDelete}
        setOpen={toggleDelete}
        deleteText="Permanently Delete"
        submitAction={deleteSelectedAttribute}
      />
    </div>
  );
}

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
