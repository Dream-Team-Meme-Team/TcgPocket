import { Flex, Paper, PasswordInput, createStyles } from '@mantine/core';
import { PrimaryTextInput } from '../../../components/inputs/PrimaryTextInput';
import { useForm } from '@mantine/form';
import { useFormValidation } from '../../../helpers/useFormValidation';
import { dispatch, useAppSelector } from '../../../store/configureStore';
import { PrimaryButton } from '../../../components/buttons/PrimaryButton';
import { SecondaryButton } from '../../../components/buttons/SecondaryButton';
import { UserDto, UserGetDto } from '../../../types/users';
import { updateUserInformation } from '../../../services/AuthServices';
import { error, success } from '../../../services/notification';

const personalInfoInitialValues = {
  userName: '',
  phoneNumber: '',
  email: '',
} as const;

const passwordInitialValues = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
};

export function AccountTab(): React.ReactElement {
  const { classes } = useStyles();
  const {
    validateTextInput,
    validateEmail,
    validatePhoneNumer,
    validatePassword,
  } = useFormValidation();

  const user = useAppSelector((state) => state.user.user);

  const personalInfoForm = useForm({
    initialValues: personalInfoInitialValues,
    validateInputOnBlur: true,
    validate: {
      userName: (value) =>
        validateTextInput(value) ? 'Invalid Username' : null,
      phoneNumber: (value) =>
        validatePhoneNumer(value) ? 'Invalid Phone Number' : null,
      email: (value) => (validateEmail(value) ? 'Invalid Email' : null),
    },
  });

  const passwordForm = useForm({
    initialValues: passwordInitialValues,
    validateInputOnBlur: true,
    validate: {
      oldPassword: (value) => (value === '' ? 'Cannot be Empty' : null),
      newPassword: (value) =>
        validatePassword(value) ? 'Invalid Password' : null,
      confirmPassword: (value, values) =>
        value !== values.newPassword ? 'Passwords do not match' : null,
    },
  });

  const handlePersonalInfoCancel = () => {
    personalInfoForm.reset();
  };

  const handlePasswordFormCancel = () => {
    passwordForm.reset();
  };

  const handlePersonalInfoFormSubmit = async (values: UserDto) => {
    if (!user) {
      error('Cannot Update Information');
      return;
    }

    const userToUpdate: UserGetDto = {
      id: user.id,
      userName: values.userName,
      email: values.email,
      phoneNumber: values.phoneNumber,
    };

    const { payload } = await dispatch(updateUserInformation(userToUpdate));

    if (!payload) {
      return;
    } else if (payload.hasErrors) {
      payload.errors.forEach((err) => error(err.message));
      return;
    }

    success('User Information Updated');
    personalInfoForm.reset();
  };

  const handlePasswordFormSubmit = (values: typeof passwordInitialValues) => {
    console.log('submit', values);
  };

  return (
    <Flex className={classes.accountTabContainer}>
      {user && (
        <Paper shadow="md" className={classes.accountPaperContainer}>
          <div className={classes.formContainer}>
            <form
              onSubmit={personalInfoForm.onSubmit(handlePersonalInfoFormSubmit)}
            >
              <header> Personal Information </header>

              <Flex gap={8}>
                <PrimaryTextInput
                  label="Username"
                  placeholder={user.userName}
                  {...personalInfoForm.getInputProps('userName')}
                />

                <PrimaryTextInput
                  label="Phone Number"
                  placeholder={user.phoneNumber}
                  {...personalInfoForm.getInputProps('phoneNumber')}
                />
              </Flex>

              <PrimaryTextInput
                label="Email"
                placeholder={user.email}
                {...personalInfoForm.getInputProps('email')}
              />

              <Flex gap={8} justify={'flex-end'} sx={{ paddingTop: '8px' }}>
                <SecondaryButton
                  type="reset"
                  onClick={handlePersonalInfoCancel}
                >
                  Cancel
                </SecondaryButton>
                <PrimaryButton type="submit"> Update </PrimaryButton>
              </Flex>
            </form>

            <form onSubmit={passwordForm.onSubmit(handlePasswordFormSubmit)}>
              <header> Password </header>

              <PasswordInput
                label="Old Password"
                {...passwordForm.getInputProps('oldPassword')}
              />

              <div className={classes.passwordContainer}>
                <PasswordInput
                  label=" New Password"
                  {...passwordForm.getInputProps('newPassword')}
                />

                <PasswordInput
                  label="Confirm Password"
                  {...passwordForm.getInputProps('confirmPassword')}
                />
              </div>

              <Flex gap={8} justify={'flex-end'} sx={{ paddingTop: '8px' }}>
                <SecondaryButton
                  type="reset"
                  onClick={handlePasswordFormCancel}
                >
                  Cancel
                </SecondaryButton>
                <PrimaryButton type="submit">Update</PrimaryButton>
              </Flex>
            </form>
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

    passwordContainer: {
      display: 'grid',
      gridTemplateColumns: 'auto auto',
      gap: '8px',
    },

    buttonsContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '8px',
    },
  };
});
