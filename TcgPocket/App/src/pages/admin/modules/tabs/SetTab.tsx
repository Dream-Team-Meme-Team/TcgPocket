import { useEffect, useMemo } from 'react';
import { dispatch, useAppSelector } from '../../../../store/configureStore';
import {
  deleteSet,
  editSet,
  getAllSets,
} from '../../../../services/dataServices/setServices';
import { responseWrapper } from '../../../../services/helpers/responseWrapper';
import { TabInfoHeader } from '../headers/TabInfoHeader';
import { ActionIcon, MantineTheme, createStyles } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { DeleteModal } from '../../../../components/modals/DeleteModal';
import { useDisclosure } from '@mantine/hooks';
import { EditModal } from '../modals/EditModal';
import { SetGetDto } from '../../../../types/sets';
import { setSelectedId } from '../../../../store/adminSlice';
import { AdminTabLabel } from '../../../../enums/adminTabLabel';
import { shallowEqual } from 'react-redux';

const titles: string[] = ['Name', 'Game', 'Edit', 'Delete'];
const colValue: string = '1fr ';

export const SetTab: React.FC = () => {
  const numOfCol = colValue.repeat(titles.length);
  const { classes } = useStyles(numOfCol);

  const [openDelete, { toggle: toggleDelete }] = useDisclosure();
  const [openEdit, { toggle: toggleEdit }] = useDisclosure();

  const [sets, games] = useAppSelector(
    (state) => [state.data.sets, state.data.games],
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

  const deleteSelectedSet = () => {
    dispatch(deleteSet(selectedId)).then(({ payload }) => {
      responseWrapper(payload, 'Set Deleted');

      if (payload && !payload.hasErrors) {
        loadSets();
      }
    });
  };

  const editSelectedSet = (editedSet: SetGetDto) => {
    const updatedSet: SetGetDto = {
      id: editedSet.id,
      name: editedSet.name,
      gameId: selectedGameId,
    };

    dispatch(editSet(updatedSet)).then(({ payload }) => {
      responseWrapper(payload, 'Set Edited');

      if (payload && !payload.hasErrors) {
        loadSets();
      }
    });
  };

  const findGame = (gameId: number) => {
    const foundGame = games.find((game) => game.id === gameId);

    return foundGame ? foundGame.name : 'Unknown';
  };

  useEffect(() => {
    if (selectedGameId === 0 || selectedTab !== AdminTabLabel.Sets) return;
    loadSets();
  }, [selectedGameId, selectedTab]);

  return (
    <div className={classes.setTabContainer}>
      <TabInfoHeader titles={titles} />

      {renderedSets.length !== 0 ? (
        <div>
          {renderedSets.map((set, index) => {
            return (
              <div key={index} className={classes.renderedSetContainer}>
                <div> {set.name} </div>

                <div> {findGame(set.gameId)} </div>

                <ActionIcon
                  aria-label="Edit Set"
                  onClick={() => selectAndOpenEdit(set)}
                >
                  <IconEdit />
                </ActionIcon>

                <ActionIcon
                  aria-label="Delete Set"
                  onClick={() => selectAndOpenDelete(set)}
                >
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
      ) : (
        <div className={classes.renderedSetContainer}>
          <i> No data to display </i>
        </div>
      )}

      <DeleteModal
        open={openDelete}
        setOpen={toggleDelete}
        submitAction={deleteSelectedSet}
      />
    </div>
  );
};

const useStyles = createStyles((theme: MantineTheme, numOfCol: string) => {
  return {
    setTabContainer: {
      paddingLeft: '8px',
    },

    renderedSetContainer: {
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
