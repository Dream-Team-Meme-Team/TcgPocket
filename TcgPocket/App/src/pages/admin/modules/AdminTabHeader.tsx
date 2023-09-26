import { PrimaryTextInput } from '../../../components/inputs/PrimaryTextInput';
import { IconSearch } from '@tabler/icons-react';
import { dispatch, useAppSelector } from '../../../store/configureStore';
import { setAdminSearchTerm } from '../../../store/dataSlice';
import { Select, createStyles } from '@mantine/core';

type AdminTabHeaderProps = {
  tabTitle: string;
  addModal: React.ReactNode;
};

export function AdminTabHeader({
  tabTitle,
  addModal,
}: AdminTabHeaderProps): React.ReactElement {
  const { classes } = useStyles();

  const searchTerm = useAppSelector((state) => state.data.searchTerm);
  const games = useAppSelector((state) => state.data.games);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setAdminSearchTerm(e.target.value));
  };

  return (
    <div className={classes.adminTabHeaderContainer}>
      <h3> Modify {tabTitle} </h3>

      <div className={classes.searchAndBtnContainer}>
        <PrimaryTextInput
          className={classes.textInput}
          icon={<IconSearch />}
          placeholder="Search"
          value={searchTerm}
          onChange={handleInputChange}
        />

        {tabTitle !== 'Games' && (
          <Select
            data={games.map((game) => game.name)}
            placeholder="Select Game"
          />
        )}

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

    searchAndBtnContainer: {
      display: 'flex',
      justifyContent: 'space-between',

      paddingRight: '2rem',
    },

    textInput: {
      width: '30rem',
    },
  };
});
