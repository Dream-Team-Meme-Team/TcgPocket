import { dispatch, useAppSelector } from '../../../../store/configureStore';
import {
  deleteGame,
  editGame,
  getAllGames,
} from '../../../../services/dataServices/gameServices';
import { responseWrapper } from '../../../../services/helpers/responseWrapper';
import { useEffect, useMemo } from 'react';
import { GameGetDto } from '../../../../types/games';
import { AdminTabLabel } from '../../../../enums/adminTabLabel';
import { shallowEqual } from 'react-redux';
import { AdminPaginatedTable } from '../AdminPaginatedTable';

export const GameTab: React.FC = () => {
  const [games] = useAppSelector((state) => [state.data.games], shallowEqual);

  const [searchTerm, selectedId, selectedTab] = useAppSelector(
    (state) => [
      state.admin.searchTerm,
      state.admin.selectedIdInPaginatedTable,
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
      <AdminPaginatedTable
        data={renderedGames}
        loading={false}
        editFn={editSelectedGame}
        deleteFn={deleteSelectedGame}
        typeName="Game"
        tableWidth="100%"
      />
    </div>
  );
};
