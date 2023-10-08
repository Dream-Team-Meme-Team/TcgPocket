import { useEffect, useMemo } from 'react';
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
import { setSelectedId } from '../../../../store/adminSlice';
import { AdminTabLabel } from '../../../../enums/adminTabLabel';
import { shallowEqual } from 'react-redux';

const titles: string[] = ['Name', 'Game', 'Edit', 'Delete'];
const colValue: string = '1fr ';

export const RarityTab: React.FC = () => {
  const numOfCol = colValue.repeat(titles.length);
  const { classes } = useStyles(numOfCol);

  const [openDelete, { toggle: toggleDelete }] = useDisclosure();
  const [openEdit, { toggle: toggleEdit }] = useDisclosure();

  const [rarities, games] = useAppSelector(
    (state) => [state.data.rarities, state.data.games],
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

  const deleteSelectedRarity = () => {
    dispatch(deleteRarity(selectedId)).then(({ payload }) => {
      responseWrapper(payload, 'Rarity Deleted');

      if (payload && !payload.hasErrors) {
        loadRarities();
      }
    });
  };

  const editSelectedRarity = (editedRarity: RarityGetDto) => {
    const updatedRarity: RarityGetDto = {
      id: editedRarity.id,
      name: editedRarity.name,
      gameId: selectedGameId,
    };

    dispatch(editRarity(updatedRarity)).then(({ payload }) => {
      responseWrapper(payload, 'Rarity Edited');

      if (payload && !payload.hasErrors) {
        loadRarities();
      }
    });
  };

  const findGame = (gameId: number) => {
    const foundGame = games.find((game) => game.id === gameId);

    return foundGame ? foundGame.name : 'Unknown';
  };

  useEffect(() => {
    if (selectedGameId === 0 || selectedTab !== AdminTabLabel.Rarities) return;
    loadRarities();
  }, [selectedGameId, selectedTab]);

  return (
    <div className={classes.rarityTabContainer}>
      <TabInfoHeader titles={titles} />

      {renderedRarities.length !== 0 ? (
        <div>
          {renderedRarities.map((rarity, index) => {
            return (
              <div key={index} className={classes.renderedRarityContainer}>
                <div> {rarity.name} </div>

                <div> {findGame(rarity.gameId)} </div>

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
      ) : (
        <div className={classes.renderedRarityContainer}>
          <i> No data to display </i>
        </div>
      )}

      <DeleteModal
        open={openDelete}
        setOpen={toggleDelete}
        submitAction={deleteSelectedRarity}
      />
    </div>
  );
};

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
