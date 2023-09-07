import { PrimaryModal } from './PrimaryModal';
import { useLoginOrRegisterStyles } from './loginOrRegisterStyling';
import { PrimaryButton } from '../buttons/PrimaryButton';
import { useForm } from '@mantine/form';
import { PrimaryTextInput } from '../inputs/PrimaryTextInput';
import { SecondaryButton } from '../buttons/SecondaryButton';

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
      username: '',
      password: '',
    },

    validate: {
      username: (value) => (value === '' ? null : 'Invalid username'),
      password: (value) => (value === '' ? null : 'Invalid Password'),
    },
  });

  const disableLogin = form.isValid('username') || form.isValid('password');

  const handleClose = () => {
    setOpenModal(false);
    form.reset();
  };

  const handleLogin = () => {
    console.log('logged in');
    handleClose();
  };

  return (
    <PrimaryModal opened={openModal} onClose={handleClose} title="Login">
      <div className={classes.bodyContainer}>
        <form>
          <PrimaryTextInput
            withAsterisk
            label="Username"
            {...form.getInputProps('username')}
          />
          <PrimaryTextInput
            withAsterisk
            label="Password"
            {...form.getInputProps('password')}
          />
        </form>

        <div className={classes.bottomBtns}>
          <SecondaryButton onClick={handleClose}>Close</SecondaryButton>
          <PrimaryButton onClick={handleLogin} disabled={disableLogin}>
            Login
          </PrimaryButton>
        </div>
      </div>
    </PrimaryModal>
  );
}
