import { dispatch, useAppSelector } from '../../../../store/configureStore';
import {
  deleteGame,
  editGame,
  getAllGames,
} from '../../../../services/dataServices/gameServices';
import { responseWrapper } from '../../../../services/helpers/responseWrapper';
import {
  Container,
  Flex,
  Loader,
  MantineTheme,
  Table,
  createStyles,
} from '@mantine/core';
import { useEffect, useMemo } from 'react';
import { GameGetDto } from '../../../../types/games';
import { AdminTabLabel } from '../../../../enums/adminTabLabel';
import { shallowEqual } from 'react-redux';
import { TableRow } from '../AdminPaginatedTable';
import { PaginationSelect } from '../../../../components/pagination/PaginationSelect';

const titles: string[] = ['Name', 'Edit', 'Delete'];

export const GameTab: React.FC = () => {
  const { classes } = useStyles();

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

  const loadGames = async () => {
    const { payload } = await dispatch(getAllGames());
    responseWrapper(payload);
  };

  const deleteSelectedGame = async () => {
    dispatch(deleteGame(selectedId)).then(({ payload }) => {
      responseWrapper(payload, 'Game Deleted');

      if (payload && !payload.hasErrors) {
        loadGames();
      }
    });
  };

  const editSelectedGame = async (editedGame: GameGetDto) => {
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
    <div>
      <Container pt={'0.5%'} pb={'1%'} fluid className={classes.tableContainer}>
        <Table
          mt="15px"
          mb="5px"
          highlightOnHover
          className={classes.table}
          w={'97%'}
        >
          <thead>
            <Flex
              dir="row"
              gap={'lg'}
              justify="space-around"
              className={classes.tableHeader}
            >
              <div className={classes.tableColumnFirstItem}>{titles[0]}</div>
              <div className={classes.tableColumnItem}>{titles[1]}</div>
              <div className={classes.tableColumnLastItem}>{titles[2]}</div>
            </Flex>
          </thead>
          {renderedGames ? (
            renderedGames.map((value, index) => (
              <TableRow
                value={value}
                index={index}
                editFn={editSelectedGame}
                deleteFn={deleteSelectedGame}
              />
            ))
          ) : (
            <div className={classes.loaderContainer}>
              <Loader size="150px" color="#9d65db" />
            </div>
          )}
          {renderedGames?.length === 0 && (
            <Flex
              dir="row"
              gap={'lg'}
              justify="space-around"
              className={classes.noData}
            >
              <i> No data to display </i>
            </Flex>
          )}
        </Table>
      </Container>

      <Flex dir="row" justify="flex-end" pb="5px" pr="25px">
        <PaginationSelect currentPage={1} setCurrentPage={() => {}} total={1} />
      </Flex>
    </div>
  );
};

const useStyles = createStyles((theme: MantineTheme) => {
  return {
    tableContainer: {
      backgroundColor: 'transparent',
      justifyContent: 'center',
      display: 'flex',
      wrap: 'wrap',
      margin: 'auto',
    },

    table: {
      backgroundColor: theme.colors.secondaryBackgroundColor[0],
      border: `solid 1px ${theme.colors.primaryPurpleColor[0]}`,
    },

    noData: {
      padding: 15,
      fontSize: 22,
    },

    tableRow: {
      padding: 6,
      borderBottom: `solid 0.25px rgba(157, 101, 219, 0.25)`,

      ':hover': {
        backgroundColor: theme.fn.darken(
          theme.colors.primaryPurpleColor[0],
          0.2
        ),
      },
    },

    tableRowOther: {
      padding: 6,
      borderBottom: `solid 0.25px rgba(157, 101, 219, 0.25)`,
      backgroundColor: 'rgba(117, 55, 130, 0.1)',
      ':hover': {
        backgroundColor: theme.fn.darken(
          theme.colors.primaryPurpleColor[0],
          0.2
        ),
      },
    },

    tableHeader: {
      fontWeight: 'bold',
      padding: '7px',
      backgroundColor: 'rgba(35, 0, 43, 0.45)',
      border: `solid 1px ${theme.colors.primaryPurpleColor[0]}`,
    },

    tableColumnFirstItem: {
      width: '30%',
      padding: '0.1% 1.25%',
      display: 'flex',
      justifyContent: 'flex-start',
      textAlign: 'start',
      margin: 'auto',
    },

    tableColumnItem: {
      width: '100%',
      padding: '0.1% 1%',
      display: 'flex',
      justifyContent: 'flex-start',
      textAlign: 'start',
      margin: 'auto',
    },

    tableColumnLastItem: {
      width: '100%',
      padding: '0.1% 1.5%',
      display: 'flex',
      justifyContent: 'flex-end',
      textAlign: 'end',
      margin: 'auto',
    },

    loaderContainer: {
      backgroundColor: 'rgba(0,0,0,0.6)',
      height: '1104px',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
    },
  };
});
