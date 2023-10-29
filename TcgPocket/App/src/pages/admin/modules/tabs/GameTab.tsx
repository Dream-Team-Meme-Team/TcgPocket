import { dispatch, useAppSelector } from '../../../../store/configureStore';
import {
    deleteGame,
    editGame,
    getAllGames,
} from '../../../../services/dataServices/GameServices';
import { responseWrapper } from '../../../../services/helpers/responseWrapper';
import { ActionIcon, MantineTheme, createStyles } from '@mantine/core';
import { useEffect, useMemo } from 'react';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { DeleteModal } from '../../../../components/modals/DeleteModal';
import { GameGetDto } from '../../../../types/games';
import { EditModal } from '../modals/EditModal';
import { TabInfoHeader } from '../headers/TabInfoHeader';
import { setSelectedId } from '../../../../store/adminSlice';
import { AdminTabLabel } from '../../../../enums/adminTabLabel';
import { shallowEqual } from 'react-redux';

const titles: string[] = ['Name', 'Edit', 'Delete'];
const colValue: string = '1fr ';

export const GameTab: React.FC = () => {
    const numOfCol = colValue.repeat(titles.length);
    const { classes } = useStyles(numOfCol);

    const [openDelete, { toggle: toggleDelete }] = useDisclosure();
    const [openEdit, { toggle: toggleEdit }] = useDisclosure();

    const [games] = useAppSelector((state) => [state.data.games], shallowEqual);

    const [searchTerm, selectedId, selectedTab] = useAppSelector(
        (state) => [
            state.admin.searchTerm,
            state.admin.selectedId,
            state.admin.selectedTab,
        ],
        shallowEqual
    );

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

    const deleteSelectedGame = () => {
        dispatch(deleteGame(selectedId)).then(({ payload }) => {
            responseWrapper(payload, 'Game Deleted');

            if (payload && !payload.hasErrors) {
                loadGames();
            }
        });
    };

    const editSelectedGame = (editedGame: GameGetDto) => {
        dispatch(editGame(editedGame)).then(({ payload }) => {
            responseWrapper(payload, 'Game Edited');

            if (payload && !payload.hasErrors) {
                loadGames();
            }
        });
    };

    useEffect(() => {
        if (selectedTab !== AdminTabLabel.Games) return;
        loadGames();
    }, [selectedTab]);

    return (
        <div className={classes.gameTabContainer}>
            <TabInfoHeader titles={titles} />

            {renderedGames.length !== 0 ? (
                <div>
                    {renderedGames.map((game, index) => {
                        return (
                            <div
                                key={index}
                                className={classes.renderedGameContainer}
                            >
                                <div>{game.name}</div>

                                <ActionIcon
                                    aria-label="Edit Game"
                                    onClick={() => selectAndOpenEdit(game)}
                                >
                                    <IconEdit />
                                </ActionIcon>

                                <ActionIcon
                                    aria-label="Delete Game"
                                    onClick={() => selectAndOpenDelete(game)}
                                >
                                    <IconTrash />
                                </ActionIcon>

                                {selectedId === game.id && (
                                    <EditModal
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
            ) : (
                <div className={classes.renderedGameContainer}>
                    <i> No data to display </i>
                </div>
            )}

            <DeleteModal
                open={openDelete}
                setOpen={toggleDelete}
                submitAction={deleteSelectedGame}
            />
        </div>
    );
};

const useStyles = createStyles((theme: MantineTheme, numOfCol: string) => {
    return {
        gameTabContainer: {
            paddingLeft: '8px',
        },

        renderedGameContainer: {
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

        editAndNameContainer: {
            display: 'flex',
            gap: 8,
        },
    };
});
