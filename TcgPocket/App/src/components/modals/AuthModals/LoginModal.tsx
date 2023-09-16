import { PrimaryModal } from '../PrimaryModal';
import { useLoginOrRegisterStyles } from './loginOrRegisterStyling';
import { PrimaryButton } from '../../buttons/PrimaryButton';
import { useForm } from '@mantine/form';
import { PrimaryTextInput } from '../../inputs/PrimaryTextInput';
import { SecondaryButton } from '../../buttons/SecondaryButton';
import { PasswordInput } from '@mantine/core';
import { SignInUserDto } from '../../../types/users';
import { useMemo } from 'react';
import { dispatch, useAppSelector } from '../../../store/configureStore';
import { signInUser } from '../../../services/AuthServices';
import { useFormValidation } from '../../../helpers/useFormValidation';

type LoginModalProps = {
  openModal: boolean;
  setOpenModal: (arg: boolean) => void;
};

const initialValues: SignInUserDto = {
  userName: '',
  password: '',
} as const;

export function LoginModal({
  openModal,
  setOpenModal,
}: LoginModalProps): React.ReactElement {
  const { classes } = useLoginOrRegisterStyles();
  const { validateTextInput } = useFormValidation();

  const isLoading = useAppSelector((state) => state.user.isLoading);

  const form = useForm({
    initialValues: initialValues,
    validateInputOnChange: true,
    validate: {
      userName: (value) =>
        validateTextInput(value) ? 'Invalid Username' : null,
      password: (value) =>
        validateTextInput(value) ? 'Invalid Password' : null,
    },
  });

  const handleClose = () => {
    setOpenModal(false);
    form.reset();
  };

  const handleSignIn = () => {
    dispatch(signInUser(form.values));
    handleClose();
  };

  const disableLogin = useMemo(
    () =>
      validateTextInput(form.values.userName) ||
      validateTextInput(form.values.password) ||
      isLoading,
    [form, isLoading]
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
