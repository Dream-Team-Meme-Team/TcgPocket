import { PrimaryTextInput } from '../../../../components/inputs/PrimaryTextInput';
import { IconCards, IconSearch } from '@tabler/icons-react';
import { dispatch, useAppSelector } from '../../../../store/configureStore';
import { MantineTheme, SelectItem, createStyles } from '@mantine/core';
import { useEffect, useMemo, useState } from 'react';
import {
  setAdminSearchTerm,
  setCurrentPage,
  setPageSize,
  setSelectedGameId,
} from '../../../../store/adminSlice';
import { AdminTabLabel } from '../../../../enums/adminTabLabel';
import { shallowEqual } from 'react-redux';
import { useAsync } from 'react-use';
import { getOptions } from '../../../../services/dataServices/gameServices';
import { PaginationSelect } from '../../../../components/pagination/PaginationSelect';
import { defaultGap, defaultPadding } from '../../../../constants/theme';
import { PrimarySelect } from '../../../../components/inputs/PrimarySelect';
import { useNavbarHeight } from '../../../../hooks/useNavbarHeight';
import useDebounce from '../../../../hooks/useDebounce';

type AdminTabHeaderProps = {
  label: string;
};

export function AdminTabHeader({
  label,
}: AdminTabHeaderProps): React.ReactElement {
  const { classes } = useStyles();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [selectedGameId, pageCount, pageSize, currentPage] = useAppSelector(
    (state) => [
      state.admin.selectedGameId,
      state.admin.pageCount,
      state.admin.pageSize,
      state.admin.currentPage,
    ],
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
    setSearchTerm(e.target.value);
  };

  const handleSelectChange = (value: string | null) => {
    if (!value) return;

    dispatch(setSelectedGameId(parseInt(value)));
  };

  const determineSelect = label !== AdminTabLabel.Games;

  const handleSetCurrentPage = (value: number) => {
    dispatch(setCurrentPage(value));
  };

  const handleSetPageSize = (value: number) => {
    dispatch(setPageSize(value));
  };

  useEffect(() => {
    dispatch(setAdminSearchTerm(debouncedSearchTerm));
  }, [debouncedSearchTerm]);

  return (
    <div className={classes.paginationHeader}>
      <div className={classes.pageSizeControls}>
        <span> Items Per Page </span>

        <div className={classes.select}>
          <PrimarySelect
            value={pageSize.toString()}
            data={pageSizeOptions}
            icon={<IconCards />}
            onChange={(value) => {
              if (!value) return;

              handleSetPageSize(parseInt(value.toString()));
            }}
          />
        </div>
      </div>

      <div className={classes.adminTabHeaderContainer}>
        <div className={classes.controlsContainer}>
          <div>
            {determineSelect && gameOptions && (
              <PrimarySelect
                pl="4px"
                data={gameOptions}
                value={selectedGameId.toString()}
                onChange={(value) => handleSelectChange(value as string)}
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
        </div>
      </div>
      <PaginationSelect
        currentPage={currentPage}
        setCurrentPage={handleSetCurrentPage}
        total={pageCount}
      />
    </div>
  );
}

const pageSizeOptions: string[] = ['15', '30', '45'];

const useStyles = createStyles((theme: MantineTheme) => {
  const { navbarHeight } = useNavbarHeight();

  return {
    adminTabHeaderContainer: {
      display: 'grid',
      gridTemplateRows: 'auto auto auto',
      width: '100%',
      paddingRight: defaultGap,
    },

    controlsContainer: {
      display: 'grid',
      gridTemplateColumns: 'auto 1fr auto',

      gap: defaultGap,
    },

    paginationHeader: {
      display: 'grid',
      gridTemplateColumns: 'auto 1fr auto auto',
      alignItems: 'center',
      gap: defaultGap,
      paddingLeft: defaultGap,
      paddingRight: defaultGap,

      height: navbarHeight,
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      marginLeft: 124.587,
      justifyItems: 'end',
      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
      borderBottomColor: theme.colors.primaryPurpleColor[0],
    },

    pageSizeControls: {
      display: 'flex',
      alignItems: 'center',

      gap: defaultGap,
      padding: defaultPadding,
    },

    select: {
      width: 100,
    },
  };
});
