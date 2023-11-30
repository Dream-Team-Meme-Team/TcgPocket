import { PrimaryModal } from '../PrimaryModal';
import { useLoginOrRegisterStyles } from './loginOrRegisterStyling';
import { PrimaryButton } from '../../buttons/PrimaryButton';
import { useForm } from '@mantine/form';
import { PrimaryTextInput } from '../../inputs/PrimaryTextInput';
import { SecondaryButton } from '../../buttons/SecondaryButton';
import { SignInUserDto } from '../../../types/users';
import { useMemo } from 'react';
import { dispatch, useAppSelector } from '../../../store/configureStore';
import { PrimaryPasswordInput } from '../../inputs/PrimaryPasswordInput';
import { signInUser } from '../../../services/authServices';
import { responseWrapper } from '../../../services/helpers/responseWrapper';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../routes';

type LoginModalProps = {
  open: boolean;
  setOpen: (arg: boolean) => void;
};

const initialValues: SignInUserDto = {
  userName: '',
  password: '',
} as const;

export function LoginModal({
  open,
  setOpen,
}: LoginModalProps): React.ReactElement {
  const { classes } = useLoginOrRegisterStyles();
  const navigate = useNavigate();

  const isLoading = useAppSelector((state) => state.user.isLoading);

  const form = useForm({
    initialValues: initialValues,
  });

  const handleClose = () => {
    setOpen(false);
    form.reset();
  };

  const handleSignIn = (values: SignInUserDto) => {
    dispatch(signInUser(values)).then(({ payload }) => {
      responseWrapper(payload, 'Signed in!');
      if (!payload || payload.hasErrors) return;
      handleClose();
      navigate(routes.inventory);
    });
  };

  const disableLogin = useMemo(
    () =>
      form.values.password === '' || form.values.userName === '' || isLoading,
    [form, isLoading]
  );

  return (
    <PrimaryModal opened={open} onClose={handleClose} title="Login">
      <form onSubmit={form.onSubmit(handleSignIn)}>
        <div className={classes.bodyContainer}>
          <PrimaryTextInput
            withAsterisk
            label="Username"
            {...form.getInputProps('userName')}
          />
          <PrimaryPasswordInput
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
