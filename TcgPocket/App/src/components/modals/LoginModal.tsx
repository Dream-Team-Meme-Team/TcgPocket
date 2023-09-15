import { PrimaryModal } from './PrimaryModal';
import { useLoginOrRegisterStyles } from './loginOrRegisterStyling';
import { PrimaryButton } from '../buttons/PrimaryButton';
import { useForm } from '@mantine/form';
import { PrimaryTextInput } from '../inputs/PrimaryTextInput';
import { SecondaryButton } from '../buttons/SecondaryButton';
import { PasswordInput } from '@mantine/core';
import { SignInUserDto } from '../../types/users';
import { useMemo } from 'react';
import { dispatch } from '../../store/configureStore';
import { signInUser } from '../../services/UserServices';

interface LoginModalProps {
  openModal: boolean;
  setOpenModal: (arg: boolean) => void;
}

export function LoginModal({
  openModal,
  setOpenModal,
}: LoginModalProps): React.ReactElement {
  const { classes } = useLoginOrRegisterStyles();

  const form = useForm({
    initialValues: {
      userName: '',
      password: '',
    } as SignInUserDto,
  });

  const handleClose = () => {
    setOpenModal(false);
    form.reset();
  };

  // const [loginState, handleLogin] = useAsyncFn(
  //   async (values: SignInUserDto) => {
  //     // await auth.signIn(values);
  //     dispatch(signInUser(values));

  //     handleClose();
  //   }
  // );

  const handleSignIn = () => {
    const values: SignInUserDto = form.values;
    dispatch(signInUser(values));
    setOpenModal(false);
  };

  const disableLogin = useMemo(
    () => form.values.userName === '' || form.values.password === '',
    [form]
  );

  return (
    <PrimaryModal opened={openModal} onClose={handleClose} title="Login">
      <form onSubmit={form.onSubmit(handleSignIn)}>
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
