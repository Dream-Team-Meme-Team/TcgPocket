import { PrimaryModal } from '../PrimaryModal';
import { useLoginOrRegisterStyles } from './loginOrRegisterStyling';
import { PrimaryButton } from '../../buttons/PrimaryButton';
import { SecondaryButton } from '../../buttons/SecondaryButton';
import { useForm } from '@mantine/form';
import { PrimaryTextInput } from '../../inputs/PrimaryTextInput';
import { PasswordInput } from '@mantine/core';
import { UserCreateDto } from '../../../types/users';
import { useMemo } from 'react';
import { dispatch, useAppSelector } from '../../../store/configureStore';
import { registerUser } from '../../../services/AuthServices';
import { useFormValidation } from '../../../helpers/useFormValidation';
import { error, success } from '../../../services/notification';

type RegisterModal = {
  openModal: boolean;
  setOpenModal: (arg: boolean) => void;
};

const initialValues: UserCreateDto = {
  userName: '',
  email: '',
  phoneNumber: '',
  password: '',
  confirmPassword: '',
} as const;

export function RegisterModal({
  openModal,
  setOpenModal,
}: RegisterModal): React.ReactElement {
  const { classes } = useLoginOrRegisterStyles();
  const {
    validateTextInput,
    validateEmail,
    validatePhoneNumer,
    validatePassword,
  } = useFormValidation();

  const isLoading = useAppSelector((state) => state.user.isLoading);

  const form = useForm({
    initialValues: initialValues,
    validateInputOnChange: true,
    validate: {
      userName: (value) =>
        validateTextInput(value) ? 'Invalid Username' : null,
      email: (value) => (validateEmail(value) ? 'Invalid Email' : null),
      phoneNumber: (value) =>
        validatePhoneNumer(value) ? 'Invalid Phone Number' : null,
      password: (value) =>
        validatePassword(value) ? 'Invalid Password' : null,
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords do not match' : null,
    },
  });

  const disableRegister = useMemo(
    () =>
      validateTextInput(form.values.userName) ||
      validateEmail(form.values.email) ||
      validatePhoneNumer(form.values.phoneNumber) ||
      validatePassword(form.values.password) ||
      form.values.confirmPassword !== form.values.password ||
      isLoading,
    [form, isLoading]
  );

  const handleClose = () => {
    setOpenModal(false);
    form.reset();
  };

  const handleRegisterUser = async (values: UserCreateDto) => {
    const { payload } = await dispatch(registerUser(values));

    if (!payload) {
      return;
    }

    if (payload.hasErrors) {
      payload.errors.forEach((err) => error(err.message));
      return;
    }

    success('User registered');
    handleClose();
  };

  return (
    <PrimaryModal opened={openModal} onClose={handleClose} title="Register">
      <form onSubmit={form.onSubmit(handleRegisterUser)}>
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