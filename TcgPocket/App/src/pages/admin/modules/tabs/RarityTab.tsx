import { useMemo } from 'react';
import { dispatch, useAppSelector } from '../../../../store/configureStore';
import { TabInfoHeader } from '../headers/TabInfoHeader';
import { ActionIcon, MantineTheme, createStyles } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { EditModal } from '../modals/EditModal';
import { useDisclosure } from '@mantine/hooks';
import {
  deleteRarity,
  editRarity,
  getAllRarities,
} from '../../../../services/dataServices/RarityServices';
import { responseWrapper } from '../../../../services/helpers/responseWrapper';
import { RarityGetDto } from '../../../../types/rarities';
import { DeleteModal } from '../../../../components/modals/DeleteModal';
import { setSelectedId } from '../../../../store/dataSlice';

const titles: string[] = ['Name', 'Edit', 'Delete'];
const colValue: string = '1fr ';

export function RarityTab(): React.ReactElement {
  const numOfCol = colValue.repeat(titles.length);
  const { classes } = useStyles(numOfCol);

  const [openDelete, { toggle: toggleDelete }] = useDisclosure();
  const [openEdit, { toggle: toggleEdit }] = useDisclosure();

  const rarities = useAppSelector((state) => state.data.rarities);
  const searchTerm = useAppSelector((state) => state.data.searchTerm);
  const selectedId = useAppSelector((state) => state.data.selectedId);
  const selectedGameId = useAppSelector((state) => state.data.selectedGameId);

  const renderedRarities = useMemo(() => {
    return rarities
      .filter((rarity) => rarity.gameId === selectedGameId)
      .filter((rarity) =>
        rarity.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [rarities, searchTerm, selectedGameId]);

  const selectAndOpenDelete = (value: RarityGetDto) => {
    toggleDelete();
    dispatch(setSelectedId(value.id));
  };

  const selectAndOpenEdit = (value: RarityGetDto) => {
    toggleEdit();
    dispatch(setSelectedId(value.id));
  };

  const loadRarities = async () => {
    const { payload } = await dispatch(getAllRarities());
    responseWrapper(payload);
  };

  const deleteSelectedRarity = async () => {
    const { payload } = await dispatch(deleteRarity(selectedId));
    responseWrapper(payload, 'Rarity Deleted');

    if (payload && !payload.hasErrors) {
      loadRarities();
    }
  };

  const editSelectedRarity = async (editedRarity: RarityGetDto) => {
    const updatedRarity: RarityGetDto = {
      id: editedRarity.id,
      name: editedRarity.name,
      gameId: selectedGameId,
    };

    const { payload } = await dispatch(editRarity(updatedRarity));
    responseWrapper(payload, 'Rarity Edited');

    if (payload && !payload.hasErrors) {
      loadRarities();
    }
  };

  return (
    <div className={classes.rarityTabContainer}>
      <TabInfoHeader titles={titles} />

      <div>
        {renderedRarities.map((rarity, index) => {
          return (
            <div key={index} className={classes.renderedRarityContainer}>
              <div> {rarity.name} </div>

              <ActionIcon onClick={() => selectAndOpenEdit(rarity)}>
                <IconEdit />
              </ActionIcon>

              <ActionIcon onClick={() => selectAndOpenDelete(rarity)}>
                <IconTrash />
              </ActionIcon>

              <div>
                {selectedId === rarity.id && (
                  <EditModal
                    open={openEdit}
                    setOpen={toggleEdit}
                    submitAction={editSelectedRarity}
                    value={rarity}
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
        submitAction={deleteSelectedRarity}
      />
    </div>
  );
}

const useStyles = createStyles((theme: MantineTheme, numOfCol: string) => {
  return {
    rarityTabContainer: {
      paddingLeft: '8px',
    },

    renderedRarityContainer: {
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
