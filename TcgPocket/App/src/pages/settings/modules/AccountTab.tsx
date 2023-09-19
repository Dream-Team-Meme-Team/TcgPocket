import { Flex, createStyles } from '@mantine/core';
import { dispatch, useAppSelector } from '../../../store/configureStore';
import { PersonalInformationForm } from './PersonalInformationForm';
import { PasswordForm } from './PasswordForm';
import { SignInUserDto } from '../../../types/users';
import { signInUser } from '../../../services/AuthServices';
import { error, success } from '../../../services/notification';
import { DeleteAccount } from './DeleteAccount';

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
      success('Signed In!');
    }
  };

  return (
    <Flex justify={'center'} sx={{ height: '100%' }}>
      {user && (
        <div className={classes.accountInfoContainer}>
          <div className={classes.titleText}>Update Account Information</div>

          <div className={classes.contentContainer}>
            <PersonalInformationForm user={user} />

            <PasswordForm
              user={user}
              loginUserAfterUpdate={loginUserAfterUpdate}
            />

            <DeleteAccount user={user} />
          </div>
        </div>
      )}
    </Flex>
  );
}

const useStyles = createStyles(() => {
  return {
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
