import { useEffectOnce } from 'react-use';
import { dispatch, useAppSelector } from '../../../../store/configureStore';
import {
  deleteGame,
  editGame,
  getAllGames,
} from '../../../../services/dataServices/GameServices';
import { responseWrapper } from '../../../../services/responseWrapper';
import { ActionIcon, MantineTheme, createStyles } from '@mantine/core';
import { useMemo } from 'react';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { DeleteModal } from '../../../../components/modals/DeleteModal';
import { setSelectedId } from '../../../../store/dataSlice';
import { GameGetDto } from '../../../../types/games';
import { EditGameModal } from '../modals/EditGameModal';
import { TabInfoHeader } from '../TabInfoHeader';

const titles = ['Name', 'Edit', 'Delete'];

export function GameTab(): React.ReactElement {
  const { classes } = useStyles();

  const [openDelete, { toggle: toggleDelete }] = useDisclosure();
  const [openEdit, { toggle: toggleEdit }] = useDisclosure();

  const games = useAppSelector((state) => state.data.games);
  const searchTerm = useAppSelector((state) => state.data.searchTerm);
  const selectedId = useAppSelector((state) => state.data.selectedId);

  const renderedGames = useMemo(() => {
    return games.filter((game) =>
      game.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, games]);

  const selectAndOpenDelete = (value: GameGetDto) => {
    toggleDelete();
    dispatch(setSelectedId(value.id));
  };

  const selectAndOpenEdit = (value: GameGetDto) => {
    toggleEdit();
    dispatch(setSelectedId(value.id));
  };

  const loadGames = async () => {
    const { payload } = await dispatch(getAllGames());
    responseWrapper(payload);
  };

  const deleteSelectedGame = async () => {
    const { payload } = await dispatch(deleteGame(selectedId));
    responseWrapper(payload, 'Game Deleted');

    if (payload && !payload.hasErrors) {
      loadGames();
    }
  };

  const editSelectedGame = async (editedGame: GameGetDto) => {
    const { payload } = await dispatch(editGame(editedGame));
    responseWrapper(payload, 'Game Edited');

    if (payload && !payload.hasErrors) {
      loadGames();
    }
  };

  useEffectOnce(() => {
    loadGames();
  });

  return (
    <div className={classes.gameTabContainer}>
      <TabInfoHeader titles={titles} />

      <div>
        {renderedGames.map((game, index) => {
          return (
            <div key={index} className={classes.renderedGameContainer}>
              <div>{game.name}</div>

              <ActionIcon onClick={() => selectAndOpenEdit(game)}>
                <IconEdit />
              </ActionIcon>

              <ActionIcon onClick={() => selectAndOpenDelete(game)}>
                <IconTrash />
              </ActionIcon>

              {selectedId === game.id && (
                <EditGameModal
                  open={openEdit}
                  setOpen={toggleEdit}
                  submitAction={editSelectedGame}
                  value={game}
                />
              )}
            </div>
          );
        })}
      </div>

      <DeleteModal
        open={openDelete}
        setOpen={toggleDelete}
        deleteText="Permanently Delete"
        submitAction={deleteSelectedGame}
      />
    </div>
  );
}

const useStyles = createStyles((theme: MantineTheme) => {
  return {
    gameTabContainer: {
      paddingLeft: '8px',
    },

    renderedGameContainer: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',

      ':hover': {
        backgroundColor: theme.colors.primaryColor[0],

        borderRadius: 7,
        paddingLeft: 8,
      },
    },
  };
});
