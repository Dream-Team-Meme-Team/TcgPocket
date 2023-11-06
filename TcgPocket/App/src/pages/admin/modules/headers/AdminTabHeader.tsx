import { PrimaryTextInput } from '../../../../components/inputs/PrimaryTextInput';
import { IconSearch } from '@tabler/icons-react';
import { dispatch, useAppSelector } from '../../../../store/configureStore';
import { Select, SelectItem, createStyles } from '@mantine/core';
import { useMemo, useState } from 'react';
import { AddModalRenderer } from '../AddModalRenderer';
import {
  setAdminSearchTerm,
  setSelectedGameId,
} from '../../../../store/adminSlice';
import { AdminTabLabel } from '../../../../enums/adminTabLabel';
import { shallowEqual } from 'react-redux';
import { useAsync } from 'react-use';
import { getOptions } from '../../../../services/dataServices/gameServices';
import { OptionItemDto } from '../../../../types/shared';

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

  const fetchGames = useAsync(async () => {
    const { payload } = await dispatch(getOptions());
    console.log('fdsjkhfsdk');
    return payload?.data;
  });

  const games = useMemo(() => {
    const response = fetchGames;

    return response;
  }, [fetchGames]);

  const [game, setGame] = useState<string | undefined>();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setAdminSearchTerm(e.target.value));
  };

  const handleSelectChange = (value: string | null) => {
    if (!value) return;

    setGame(value);
    dispatch(setSelectedGameId(parseInt(value)));
  };

  const determineSelect = label !== AdminTabLabel.Games;

  return (
    <div className={classes.adminTabHeaderContainer}>
      <h3> Modify {label} </h3>

      <div className={classes.controlsContainer}>
        <div>
          {determineSelect && games && (
            <Select
              data={games.value as SelectItem[]}
              value={game}
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
