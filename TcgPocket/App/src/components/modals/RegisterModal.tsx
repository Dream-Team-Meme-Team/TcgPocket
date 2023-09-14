import { PrimaryModal } from './PrimaryModal';
import { useLoginOrRegisterStyles } from './loginOrRegisterStyling';
import { PrimaryButton } from '../buttons/PrimaryButton';
import { SecondaryButton } from '../buttons/SecondaryButton';
import { useForm } from '@mantine/form';
import { PrimaryTextInput } from '../inputs/PrimaryTextInput';
import { PasswordInput } from '@mantine/core';
import { UserCreateDto } from '../../types/users';
import { useAuth } from '../../hooks/use-auth';
import { notifications } from '@mantine/notifications';
import { tcgNotifications } from '../../constants/notifications';
import { useMemo } from 'react';
import { useAsyncFn } from 'react-use';

interface RegisterModal {
  openModal: boolean;
  setOpenModal: (arg: boolean) => void;
}

export function RegisterModal({
  openModal,
  setOpenModal,
}: RegisterModal): React.ReactElement {
  const { registerUser } = useAuth();
  const { classes } = useLoginOrRegisterStyles();

  const $users = useSelector((state: AppState) => state.user.users);

  const form = useForm({
    initialValues: {
      userName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    } as UserCreateDto,

    validate: {
      userName: (value) => (value !== '' ? null : 'Invalid Username'),
      email: (value) => (value !== '' ? null : 'Invalid Email'),
      phoneNumber: (value) => (value !== '' ? null : 'Invalid Phone number'),
      password: (value) => (value !== '' ? null : 'Invalid Password'),
      confirmPassword: (value) => (value !== '' ? null : 'Invalid Password'),
    },
  });

  const disableRegister = useMemo(
    () =>
      form.values.userName === '' ||
      form.values.email === '' ||
      form.values.phoneNumber === '' ||
      form.values.password === '' ||
      form.values.confirmPassword === '' ||
      registerState.loading,
    [form]
  );

  const handleClose = () => {
    setOpenModal(false);
    form.reset();
  };

  const [registerState, handleRegister] = useAsyncFn(
    async (values: UserCreateDto) => {
      await registerUser(values);
      notifications.show(tcgNotifications.register);
      handleClose();
    }
  );

  useEffect(() => {
    void dispatch(getAllUsers());
  }, []);

  console.log($users);

  return (
    <PrimaryModal opened={openModal} onClose={handleClose} title="Register">
      <form onSubmit={form.onSubmit(handleRegister)}>
        <div className={classes.bodyContainer}>
          <PrimaryTextInput
            withAsterisk
            label="Username"
            {...form.getInputProps('userName')}
          />

          <PrimaryTextInput
            withAsterisk
            label="Email"
            {...form.getInputProps('email')}
          />

          <PrimaryTextInput
            withAsterisk
            label="Phone Number"
            {...form.getInputProps('phoneNumber')}
          />

          <PasswordInput
            withAsterisk
            className={classes.passwordInput}
            label="Password"
            {...form.getInputProps('password')}
          />

          <PasswordInput
            withAsterisk
            className={classes.passwordInput}
            label="Confirm Password"
            {...form.getInputProps('confirmPassword')}
          />
          <div className={classes.bottomBtns}>
            <SecondaryButton type="button" onClick={handleClose}>
              Cancel
            </SecondaryButton>
            <PrimaryButton type="submit" disabled={disableRegister}>
              Register
            </PrimaryButton>
          </div>
        </div>
      </form>
    </PrimaryModal>
  );
}
