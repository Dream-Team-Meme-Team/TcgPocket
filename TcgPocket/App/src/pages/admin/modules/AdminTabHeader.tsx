import { PrimaryTextInput } from '../../../components/inputs/PrimaryTextInput';
import { IconSearch } from '@tabler/icons-react';
import { dispatch, useAppSelector } from '../../../store/configureStore';
import {
  setAdminSearchTerm,
  setSelectedGameId,
} from '../../../store/dataSlice';
import { Select, createStyles } from '@mantine/core';
import { useMemo } from 'react';

type AdminTabHeaderProps = {
  tabTitle: string;
  addModal: React.ReactNode;
  gameSelect?: boolean;
};

export function AdminTabHeader({
  tabTitle,
  addModal,
  gameSelect,
}: AdminTabHeaderProps): React.ReactElement {
  const { classes } = useStyles();

  const searchTerm = useAppSelector((state) => state.data.searchTerm);
  const games = useAppSelector((state) => state.data.games);
  const selectedGameId = useAppSelector((state) => state.data.selectedGameId);

  const data = useMemo(() => {
    return games.map((game) => game.name);
  }, [games]);

  const selectedValue = useMemo(() => {
    const foundGame = games.find((game) => game.id === selectedGameId);

    return foundGame ? foundGame.name : undefined;
  }, [selectedGameId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setAdminSearchTerm(e.target.value));
  };

  const handleSelectChange = (value: string | null) => {
    if (!value) return;

    const foundSelectedGame = games.find((game) => game.name === value);

    if (!foundSelectedGame) return;

    dispatch(setSelectedGameId(foundSelectedGame.id));
    dispatch(setAdminSearchTerm(''));
  };

  return (
    <div className={classes.adminTabHeaderContainer}>
      <h3> Modify {tabTitle} </h3>

      <div className={classes.controlsContainer}>
        <div>
          {gameSelect && (
            <Select
              data={data}
              value={selectedValue}
              onChange={handleSelectChange}
              placeholder="Select Game"
            />
          )}
        </div>

        <PrimaryTextInput
          icon={<IconSearch />}
          placeholder="Search"
          value={searchTerm}
          onChange={handleInputChange}
        />

        {addModal}
      </div>
    </div>
  );
}

const useStyles = createStyles(() => {
  return {
    adminTabHeaderContainer: {
      display: 'grid',
      gridTemplateRows: 'auto auto auto',
    },

    controlsContainer: {
      display: 'grid',
      gridTemplateColumns: 'auto 1fr auto',

      gap: '8px',
      paddingRight: '2rem',
    },
  };
});
