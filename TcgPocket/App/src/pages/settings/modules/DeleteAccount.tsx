import { useDisclosure } from '@mantine/hooks';
import { PrimaryModal } from '../../../components/modals/PrimaryModal';
import { deleteUserAccount, signOutUser } from '../../../services/AuthServices';
import { error, success } from '../../../services/notification';
import { dispatch } from '../../../store/configureStore';
import { useForm } from '@mantine/form';
import { SecondaryButton } from '../../../components/buttons/SecondaryButton';
import { Flex, createStyles } from '@mantine/core';
import { DeleteButton } from '../../../components/buttons/DeleteButton';
import { UserDeleteDto } from '../../../types/users';
import { PrimaryPasswordInput } from '../../../components/inputs/PrimaryPasswordInput';

type DeleteAccount = UserDeleteDto;

const initialValues = {
  password: '',
  confirmPassword: '',
} as const;

export function DeleteAccount(): React.ReactElement {
  const { classes } = useStyles();
  const [open, { toggle }] = useDisclosure(false);

  const form = useForm({
    initialValues: initialValues,
    validate: {
      password: (value) =>
        value === '' || value === null ? 'Must not be empty.' : null,
      confirmPassword: (value) =>
        value === '' || value === null ? 'Must not be empty.' : null,
    },
  });

  const handleSignOut = async () => {
    const { payload } = await dispatch(signOutUser());

    if (!payload) {
      return;
    } else if (payload.hasErrors) {
      payload.errors.forEach((err) => error(err.message));
    } else success('Signed Out');
  };

  const handleDelete = async (values: DeleteAccount) => {
    const x: UserDeleteDto = {
      password: values.password,
      confirmPassword: values.confirmPassword,
    };
    const { payload } = await dispatch(deleteUserAccount(x));

    if (!payload) {
      return;
    } else if (payload.data) {
      payload.errors.forEach((err) => error(err.message));
    } else {
      console.log('debug', payload.errors);
      success('Account Deleted');
      // handleSignOut();
      // navigate(routes.home);
    }
  };

  const handleCancel = () => {
    toggle();
    form.reset();
  };

  return (
    <Flex>
      <DeleteButton onClick={toggle}>Delete Account</DeleteButton>

      <PrimaryModal
        opened={open}
        onClose={toggle}
        title="If you would like to delete your account, enter password."
      >
        <form onSubmit={form.onSubmit(handleDelete)}>
          <PrimaryPasswordInput
            label="Password: "
            {...form.getInputProps('password')}
          />
          <PrimaryPasswordInput
            label="Confirm password:"
            {...form.getInputProps('confirmPassword')}
          />
          <div className={classes.buttonsContainer}>
            <SecondaryButton type="button" onClick={handleCancel}>
              Cancel
            </SecondaryButton>
            <DeleteButton type="submit" disabled={!form.isDirty()}>
              Delete
            </DeleteButton>
          </div>
        </form>
      </PrimaryModal>
    </Flex>
  );
}

const useStyles = createStyles(() => {
  return {
    buttonsContainer: {
      display: 'flex',
      justifyContent: 'flex-end',

      gap: '8px',
      paddingTop: '8px',
    },
  };
});
