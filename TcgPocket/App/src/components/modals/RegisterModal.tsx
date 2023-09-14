import { PrimaryModal } from './PrimaryModal';
import { useLoginOrRegisterStyles } from './loginOrRegisterStyling';
import { PrimaryButton } from '../buttons/PrimaryButton';
import { SecondaryButton } from '../buttons/SecondaryButton';
import { useForm } from '@mantine/form';
import { PrimaryTextInput } from '../inputs/PrimaryTextInput';
import { PasswordInput } from '@mantine/core';
import { AppState, dispatch } from '../../store/configureStore';
import { getAllUsers, registerUser } from '../../store/userSlice';
import { UserCreateDto } from '../../types/users';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

interface RegisterModal {
  openModal: boolean;
  setOpenModal: (arg: boolean) => void;
}

export function RegisterModal({
  openModal,
  setOpenModal,
}: RegisterModal): React.ReactElement {
  const { classes } = useLoginOrRegisterStyles();

  const $users = useSelector((state: AppState) => state.user.users);

  const form = useForm({
    initialValues: {
      email: '',
      phoneNumber: '',
      username: '',
      password: '',
      confirmPassword: '',
    },

    validate: {
      email: (value) => (value === '' ? null : 'Invalid Email'),
      phoneNumber: (value) => (value === '' ? null : 'Invalid Phone Number'),
      username: (value) => (value === '' ? null : 'Invalid Username'),
      password: (value) => (value === '' ? null : 'Invalid Password'),
      confirmPassword: (value) => (value === '' ? null : 'Invalid Password'),
    },
  });

  const disableRegister =
    form.isValid('email') ||
    form.isValid('phoneNumber') ||
    form.isValid('username') ||
    form.isValid('password') ||
    form.isValid('confirmPassword');

  const handleClose = () => {
    setOpenModal(false);
    form.reset();
  };

  const handleRegister = () => {
    const createUser: UserCreateDto = {
      userName: form.values.username,
      email: form.values.email,
      password: form.values.password,
      phoneNumber: form.values.phoneNumber,
    };

    void dispatch(registerUser(createUser));
    handleClose();
  };

  useEffect(() => {
    void dispatch(getAllUsers());
  }, []);

  console.log($users);

  return (
    <PrimaryModal opened={openModal} onClose={handleClose} title="Register">
      <div className={classes.bodyContainer}>
        <form>
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
          <PrimaryTextInput
            withAsterisk
            label="Username"
            {...form.getInputProps('username')}
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
        </form>

        <div className={classes.bottomBtns}>
          <SecondaryButton onClick={handleClose}>Cancel</SecondaryButton>
          <PrimaryButton onClick={handleRegister} disabled={disableRegister}>
            Register
          </PrimaryButton>
        </div>
      </div>
    </PrimaryModal>
  );
}
