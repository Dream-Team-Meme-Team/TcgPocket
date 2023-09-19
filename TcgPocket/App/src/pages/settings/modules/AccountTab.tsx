import { Flex, Paper, createStyles } from '@mantine/core';
import { dispatch, useAppSelector } from '../../../store/configureStore';
import { PersonalInformationForm } from './PersonalInformationForm';
import { PasswordForm } from './PasswordForm';
import { SignInUserDto } from '../../../types/users';
import { signInUser } from '../../../services/AuthServices';
import { error, success } from '../../../services/notification';

export function AccountTab(): React.ReactElement {
  const { classes } = useStyles();

  const user = useAppSelector((state) => state.user.user);

  const loginUserAfterUpdate = async (user: SignInUserDto) => {
    const { payload } = await dispatch(signInUser(user));

    if (!payload) {
      return;
    } else if (payload.hasErrors) {
      payload.errors.forEach((err) => error(err.message));
    } else {
      success('SignedIn');
    }
  };

  return (
    <Flex className={classes.accountTabContainer}>
      {user && (
        <Paper shadow="md" className={classes.accountPaperContainer}>
          <div className={classes.formContainer}>
            <PersonalInformationForm user={user} />

            <PasswordForm
              user={user}
              loginUserAfterUpdate={loginUserAfterUpdate}
            />
          </div>
        </Paper>
      )}
    </Flex>
  );
}

const useStyles = createStyles(() => {
  return {
    accountTabContainer: {
      justifyContent: 'center',
      alignItems: 'center',

      height: '100%',
    },

    accountPaperContainer: {
      width: '60%',
      height: '75%',

      backgroundColor: 'white',
    },

    formContainer: {
      display: 'grid',
      gridTemplateRows: 'auto auto auto',
      justifyContent: 'center',
      alignItems: 'center',

      height: '100%',
    },
  };
});
