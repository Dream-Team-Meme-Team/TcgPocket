import { createStyles } from '@mantine/core';
import { useAppSelector } from '../../../store/configureStore';
import { PersonalInformationForm } from './PersonalInformationForm';
import { PasswordForm } from './PasswordForm';
import { DeleteAccount } from './DeleteAccount';

export function AccountTab(): React.ReactElement {
  const { classes } = useStyles();

  const user = useAppSelector((state) => state.user.user);

  return (
    <div className={classes.accountTabContainer}>
      {user && (
        <div className={classes.accountInfoContainer}>
          <div className={classes.titleText}>Update Account Information</div>

          <div className={classes.contentContainer}>
            <PersonalInformationForm user={user} />

            <PasswordForm user={user} />

            <DeleteAccount user={user} />
          </div>
        </div>
      )}
    </div>
  );
}

const useStyles = createStyles(() => {
  return {
    accountTabContainer: {
      display: 'flex',
      justifyContent: 'center',

      height: '100%',
    },

    accountInfoContainer: {
      display: 'grid',
      gridTemplateRows: '15% auto',

      alignItems: 'center',
    },

    titleText: {
      display: 'flex',
      justifyContent: 'center',

      fontSize: '20px',
      fontWeight: 'bold',
    },

    contentContainer: {
      display: 'grid',
      justifyContent: 'center',

      height: '100%',
    },
  };
});
