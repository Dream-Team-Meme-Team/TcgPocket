import { PrimaryModal } from './PrimaryModal';
import { useLoginOrRegisterStyles } from './loginOrRegisterStyling';
import { PrimaryButton } from '../buttons/PrimaryButton';
import { useForm } from '@mantine/form';
import { PrimaryTextInput } from '../inputs/PrimaryTextInput';
import { SecondaryButton } from '../buttons/SecondaryButton';
import { PasswordInput } from '@mantine/core';
import { SignInUserDto } from '../../types/users';
import { useMemo } from 'react';
import { useAuth } from '../../hooks/use-auth';
import { notifications } from '@mantine/notifications';
import { tcgNotifications } from '../../constants/notifications';
import { useAsyncFn } from 'react-use';

const initialValues: SignInUserDto = {
  userName: '',
  password: '',
} as const;

interface LoginModalProps {
  openModal: boolean;
  setOpenModal: (arg: boolean) => void;
}

export function LoginModal({
  openModal,
  setOpenModal,
}: LoginModalProps): React.ReactElement {
  const { classes } = useLoginOrRegisterStyles();
  const auth = useAuth();

  const form = useForm({
    initialValues: initialValues,
  });

  const handleClose = () => {
    setOpenModal(false);
    form.reset();
  };

  const [loginState, handleLogin] = useAsyncFn(
    async (values: SignInUserDto) => {
      await auth.signIn(values);

      notifications.show(tcgNotifications.signIn);
      handleClose();
    }
  );

  const disableLogin = useMemo(
    () =>
      form.values.userName === '' ||
      form.values.password === '' ||
      loginState.loading,
    [form, loginState]
  );

  return (
    <PrimaryModal opened={openModal} onClose={handleClose} title="Login">
      <form onSubmit={form.onSubmit(handleLogin)}>
        <div className={classes.bodyContainer}>
          <PrimaryTextInput
            withAsterisk
            label="Username"
            {...form.getInputProps('userName')}
          />
          <PasswordInput
            withAsterisk
            className={classes.passwordInput}
            label="Password"
            {...form.getInputProps('password')}
          />
          <div className={classes.bottomBtns}>
            <SecondaryButton type="button" onClick={handleClose}>
              Close
            </SecondaryButton>
            <PrimaryButton type="submit" disabled={disableLogin}>
              Login
            </PrimaryButton>
          </div>
        </div>
      </form>
    </PrimaryModal>
  );
}