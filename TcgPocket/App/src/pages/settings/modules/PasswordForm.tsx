import { useForm } from '@mantine/form';
import { useFormValidation } from '../../../helpers/useFormValidation';
import {
  SignInUserDto,
  UserGetDto,
  UserPasswordUpdateDto,
} from '../../../types/users';
import { Flex, PasswordInput, createStyles } from '@mantine/core';
import { SecondaryButton } from '../../../components/buttons/SecondaryButton';
import { PrimaryButton } from '../../../components/buttons/PrimaryButton';
import { dispatch } from '../../../store/configureStore';
import { updateUserPassword } from '../../../services/AuthServices';
import { error, success } from '../../../services/notification';

type PasswordFormProps = {
  user: UserGetDto;
  loginUserAfterUpdate: (arg: SignInUserDto) => void;
};

type PasswordForm = Omit<UserPasswordUpdateDto, 'userName'>;

const initialValues = {
  currentPassword: '',
  newPassword: '',
  newPasswordConfirmation: '',
} as const;

export function PasswordForm({
  user,
  loginUserAfterUpdate,
}: PasswordFormProps): React.ReactElement {
  const { classes } = useStyles();
  const { validatePassword } = useFormValidation();

  const form = useForm({
    initialValues: initialValues,
    validateInputOnBlur: true,
    validate: {
      currentPassword: (value) => (value === '' ? 'Cannot be Empty' : null),
      newPassword: (value, values) =>
        value === values.currentPassword
          ? 'Must be different than current password.'
          : validatePassword(value)
          ? 'Invalid Password'
          : null,
      newPasswordConfirmation: (value, values) =>
        value !== values.newPassword ? 'Passwords do not match' : null,
    },
  });

  const handleSubmit = async (values: PasswordForm) => {
    const userWithUpdatedPassword: UserPasswordUpdateDto = {
      userName: user.userName,
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
      newPasswordConfirmation: values.newPasswordConfirmation,
    };

    const { payload } = await dispatch(
      updateUserPassword(userWithUpdatedPassword)
    );

    if (!payload) {
      return;
    } else if (payload.hasErrors) {
      payload.errors.forEach((err) => error(err.message));
    } else {
      success('Password Updated');
      form.reset();

      loginUserAfterUpdate({
        userName: user.userName,
        password: values.newPassword,
      });
    }
  };

  const handleReset = () => {
    form.reset();
  };

  const determineDisabled = !form.isValid();

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} onReset={handleReset}>
      <header> Password </header>

      <PasswordInput
        className={classes.passwordInput}
        label="Current Password"
        {...form.getInputProps('currentPassword')}
      />

      <div className={classes.newPasswordContainer}>
        <PasswordInput
          className={classes.passwordInput}
          label="New Password"
          {...form.getInputProps('newPassword')}
        />

        <PasswordInput
          className={classes.passwordInput}
          label="Confirm Password"
          {...form.getInputProps('newPasswordConfirmation')}
        />
      </div>

      <Flex gap={8} justify={'flex-end'} sx={{ paddingTop: '8px' }}>
        <SecondaryButton type="reset"> Cancel </SecondaryButton>
        <PrimaryButton type="submit" disabled={determineDisabled}>
          Update
        </PrimaryButton>
      </Flex>
    </form>
  );
}

const useStyles = createStyles(() => {
  return {
    newPasswordContainer: {
      display: 'grid',
      gridTemplateColumns: 'auto auto',
      gap: '8px',
    },

    passwordInput: {
      input: {
        backgroundColor: 'white',
      },
    },
  };
});
