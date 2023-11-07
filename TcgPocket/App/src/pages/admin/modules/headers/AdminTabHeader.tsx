import { PrimaryTextInput } from '../../../../components/inputs/PrimaryTextInput';
import { IconSearch } from '@tabler/icons-react';
import { dispatch, useAppSelector } from '../../../../store/configureStore';
import { Select, SelectItem, createStyles } from '@mantine/core';
import { useMemo } from 'react';
import { AddModalRenderer } from '../AddModalRenderer';
import {
  setAdminSearchTerm,
  setSelectedGameId,
} from '../../../../store/adminSlice';
import { AdminTabLabel } from '../../../../enums/adminTabLabel';
import { shallowEqual } from 'react-redux';
import { useAsync } from 'react-use';
import { getOptions } from '../../../../services/dataServices/gameServices';

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

  const fetchGameOptions = useAsync(async () => {
    const { payload } = await dispatch(getOptions());
    return payload?.data;
  });

  const gameOptions = useMemo(() => {
    const response = fetchGameOptions;

    return response.value as SelectItem[];
  }, [fetchGameOptions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setAdminSearchTerm(e.target.value));
  };

  const handleSelectChange = (value: string | null) => {
    if (!value) return;

    dispatch(setSelectedGameId(parseInt(value)));
  };

  const determineSelect = label !== AdminTabLabel.Games;

  return (
    <div className={classes.adminTabHeaderContainer}>
      <h3> Modify {label} </h3>

      <div className={classes.controlsContainer}>
        <div>
          {determineSelect && gameOptions && (
            <Select
              data={gameOptions}
              value={selectedGameId.toString()}
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
