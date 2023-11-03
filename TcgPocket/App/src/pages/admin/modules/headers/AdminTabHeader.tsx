import { PrimaryTextInput } from '../../../../components/inputs/PrimaryTextInput';
import { IconSearch } from '@tabler/icons-react';
import { dispatch, useAppSelector } from '../../../../store/configureStore';
import { Select, createStyles } from '@mantine/core';
import { useMemo } from 'react';
import { AddModalRenderer } from '../AddModalRenderer';
import {
  setAdminSearchTerm,
  setSelectedGameId,
} from '../../../../store/adminSlice';
import { AdminTabLabel } from '../../../../enums/adminTabLabel';
import { shallowEqual } from 'react-redux';

type AdminTabHeaderProps = {
  label: string;
};

export function AdminTabHeader({
  label,
}: AdminTabHeaderProps): React.ReactElement {
  const { classes } = useStyles();

  const [searchTerm, selectedGameId] = useAppSelector(
    (state) => [state.admin.searchTerm, state.admin.selectedGameId],
    shallowEqual
  );

  const [games] = useAppSelector((state) => [state.data.games], shallowEqual);

  const data = useMemo(() => {
    return games.map((game) => game.name);
  }, [games]);

  const selectedValue = useMemo(() => {
    const foundGame = games.find((game) => game.id === selectedGameId);

    return foundGame ? foundGame.name : null;
  }, [selectedGameId, games]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setAdminSearchTerm(e.target.value));
  };

  const handleSelectChange = (value: string | null) => {
    if (!value) return;

    const foundSelectedGame = games.find((game) => game.name === value);

    if (!foundSelectedGame) return;

    dispatch(setSelectedGameId(foundSelectedGame.id));
  };

  const determineSelect = label !== AdminTabLabel.Games;

  return (
    <div className={classes.adminTabHeaderContainer}>
      <h3> Modify {label} </h3>

      <div className={classes.controlsContainer}>
        <div>
          {determineSelect && (
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

        <AddModalRenderer label={label} />
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
