import { useEffect, useMemo } from 'react';
import { dispatch, useAppSelector } from '../../../../store/configureStore';
import {
  deleteSet,
  editSet,
  getAllSets,
} from '../../../../services/dataServices/SetServices';
import { responseWrapper } from '../../../../services/responseWrapper';
import { TabInfoHeader } from '../TabInfoHeader';
import { ActionIcon, MantineTheme, createStyles } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { DeleteModal } from '../../../../components/modals/DeleteModal';
import { useDisclosure } from '@mantine/hooks';
import { EditModal } from '../modals/EditModal';
import { SetGetDto } from '../../../../types/sets';
import { setSelectedId } from '../../../../store/dataSlice';

const titles = ['Name', 'Game', 'Edit', 'Delete'];

export function SetTab(): React.ReactElement {
  const { classes } = useStyles();

  const [openDelete, { toggle: toggleDelete }] = useDisclosure();
  const [openEdit, { toggle: toggleEdit }] = useDisclosure();

  const sets = useAppSelector((state) => state.data.sets);
  const games = useAppSelector((state) => state.data.games);
  const searchTerm = useAppSelector((state) => state.data.searchTerm);
  const selectedId = useAppSelector((state) => state.data.selectedId);
  const selectedGameId = useAppSelector((state) => state.data.selectedGameId);

  const renderedSets = useMemo(() => {
    return sets
      .filter((set) => set.gameId === selectedGameId)
      .filter((set) =>
        set.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [sets, searchTerm, selectedGameId]);

  const selectAndOpenDelete = (value: SetGetDto) => {
    toggleDelete();
    dispatch(setSelectedId(value.id));
  };

  const selectAndOpenEdit = (value: SetGetDto) => {
    toggleEdit();
    dispatch(setSelectedId(value.id));
  };

  const loadSets = async () => {
    const { payload } = await dispatch(getAllSets());
    responseWrapper(payload);
  };

  const deleteSelectedSet = async () => {
    const { payload } = await dispatch(deleteSet(selectedId));
    responseWrapper(payload, 'Set Deleted');

    if (payload && !payload.hasErrors) {
      loadSets();
    }
  };

  const editSelectedSet = async (editedSet: SetGetDto) => {
    const { payload } = await dispatch(editSet(editedSet));
    responseWrapper(payload, 'Set Edited');

    if (payload && !payload.hasErrors) {
      loadSets();
    }
  };

  const findGame = (gameId: number) => {
    const foundGame = games.find((game) => game.id === gameId);

    return foundGame ? foundGame.name : 'Unknown';
  };

  useEffect(() => {
    if (selectedGameId === 0) return;
    loadSets();
  }, [selectedGameId]);

  return (
    <div className={classes.setTabContainer}>
      <TabInfoHeader titles={titles} />

      <div>
        {renderedSets.map((set, index) => {
          return (
            <div key={index} className={classes.renderedSetContainer}>
              <div> {set.name} </div>

              <div> {findGame(set.gameId)} </div>

              <ActionIcon onClick={() => selectAndOpenEdit(set)}>
                <IconEdit />
              </ActionIcon>

              <ActionIcon onClick={() => selectAndOpenDelete(set)}>
                <IconTrash />
              </ActionIcon>

              <div>
                {selectedId === set.id && (
                  <EditModal
                    open={openEdit}
                    setOpen={toggleEdit}
                    submitAction={editSelectedSet}
                    value={set}
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
        submitAction={deleteSelectedSet}
      />
    </div>
  );
}

const useStyles = createStyles((theme: MantineTheme) => {
  return {
    setTabContainer: {
      paddingLeft: '8px',
    },

    renderedSetContainer: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr',

      ':hover': {
        backgroundColor: theme.colors.primaryColor[0],

        borderRadius: 7,
        paddingLeft: 8,
      },
    },
  };
});
