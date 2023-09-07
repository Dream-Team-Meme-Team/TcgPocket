import { PrimaryModal } from './PrimaryModal';
import { useLoginOrRegisterStyles } from './loginOrRegisterStyling';
import { PrimaryButton } from '../buttons/PrimaryButton';
import { SecondaryButton } from '../buttons/SecondaryButton';
import { useForm } from '@mantine/form';
import { PrimaryTextInput } from '../inputs/PrimaryTextInput';

interface RegisterModal {
  openModal: boolean;
  setOpenModal: (arg: boolean) => void;
}

export function RegisterModal({
  openModal,
  setOpenModal,
}: RegisterModal): React.ReactElement {
  const { classes } = useLoginOrRegisterStyles();

  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      confirmPassword: '',
    },

    validate: {
      firstName: (value) => (value === '' ? null : 'Invalid First Name'),
      lastName: (value) => (value === '' ? null : 'Invalid Last Name'),
      username: (value) => (value === '' ? null : 'Invalid Username'),
      password: (value) => (value === '' ? null : 'Invalid Password'),
      confirmPassword: (value) => (value === '' ? null : 'Invalid Password'),
    },
  });

  const disableRegister =
    form.isValid('firstName') ||
    form.isValid('lastName') ||
    form.isValid('username') ||
    form.isValid('password') ||
    form.isValid('confirmPassword');

  const handleClose = () => {
    setOpenModal(false);
    form.reset();
  };

  const handleRegister = () => {
    console.log('registered');
    handleClose();
  };

  return (
    <PrimaryModal opened={openModal} onClose={handleClose} title="Register">
      <div className={classes.bodyContainer}>
        <form>
          <PrimaryTextInput
            withAsterisk
            label="First Name"
            {...form.getInputProps('firstName')}
          />
          <PrimaryTextInput
            withAsterisk
            label="Last Name"
            {...form.getInputProps('lastName')}
          />
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
          <PrimaryTextInput
            withAsterisk
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
