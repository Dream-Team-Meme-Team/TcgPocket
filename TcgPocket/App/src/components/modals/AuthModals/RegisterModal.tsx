import { PrimaryModal } from '../PrimaryModal';
import { useLoginOrRegisterStyles } from './loginOrRegisterStyling';
import { PrimaryButton } from '../../buttons/PrimaryButton';
import { SecondaryButton } from '../../buttons/SecondaryButton';
import { useForm } from '@mantine/form';
import { PrimaryTextInput } from '../../inputs/PrimaryTextInput';
import { UserCreateDto } from '../../../types/users';
import { CSSProperties, useMemo, useState } from 'react';
import { dispatch, useAppSelector } from '../../../store/configureStore';
import { registerUser } from '../../../services/authServices';
import { useFormValidation } from '../../../helpers/useFormValidation';
import { error, success } from '../../../services/helpers/notification';
import { PrimaryPasswordInput } from '../../inputs/PrimaryPasswordInput';
import { Popover } from '@mantine/core';
import {
  PasswordRequirement,
  passwordRequirements,
} from '../../PasswordRequirement';

type RegisterModal = {
  open: boolean;
  setOpen: (arg: boolean) => void;
};

const initialValues: UserCreateDto = {
  userName: '',
  email: '',
  phoneNumber: '',
  password: '',
  confirmPassword: '',
} as const;

export function RegisterModal({
  open,
  setOpen,
}: RegisterModal): React.ReactElement {
  const { classes } = useLoginOrRegisterStyles();
  const {
    validateTextInput,
    validateEmail,
    validatePhoneNumer,
    validatePassword,
  } = useFormValidation();

  const isLoading = useAppSelector((state) => state.user.isLoading);

  const [popover, setPopover] = useState(false);

  const form = useForm({
    initialValues: initialValues,
    validateInputOnBlur: true,
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

  const checks = passwordRequirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      meets={requirement.expression.test(form.values.password)}
      label={requirement.label}
    />
  ));

  const disableRegister = useMemo(
    () =>
      validateTextInput(form.values.userName) ||
      validateEmail(form.values.email) ||
      validatePhoneNumer(form.values.phoneNumber) ||
      validatePassword(form.values.password) ||
      form.values.confirmPassword !== form.values.password ||
      isLoading,
    [
      form,
      isLoading,
      validateEmail,
      validatePassword,
      validatePhoneNumer,
      validateTextInput,
    ]
  );

  const handleClose = () => {
    setOpen(false);
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
    <PrimaryModal opened={open} onClose={handleClose} title="Register">
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

          <Popover opened={popover} position="bottom" width="target">
            <Popover.Target>
              <div
                onFocusCapture={() => setPopover(true)}
                onBlurCapture={() => setPopover(false)}
              >
                <PrimaryPasswordInput
                  withAsterisk
                  className={classes.passwordInput}
                  label="Password"
                  {...form.getInputProps('password')}
                />
              </div>
            </Popover.Target>

            <Popover.Dropdown style={popoverStyle}>{checks}</Popover.Dropdown>
          </Popover>

          <PrimaryPasswordInput
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

const popoverStyle: CSSProperties = { backgroundColor: '#aea8b5' };
