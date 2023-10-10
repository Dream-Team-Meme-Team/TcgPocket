import { useDisclosure } from '@mantine/hooks';
import { PrimaryModal } from '../../../components/modals/PrimaryModal';
import { deleteUser, signOutUser } from '../../../services/AuthServices';
import { dispatch } from '../../../store/configureStore';
import { useForm } from '@mantine/form';
import { SecondaryButton } from '../../../components/buttons/SecondaryButton';
import { Flex, createStyles } from '@mantine/core';
import { DeleteButton } from '../../../components/buttons/DeleteButton';
import { UserDeleteDto } from '../../../types/users';
import { PrimaryPasswordInput } from '../../../components/inputs/PrimaryPasswordInput';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../routes';
import { responseWrapper } from '../../../services/helpers/responseWrapper';

type DeleteAccount = UserDeleteDto;

const initialValues = {
  password: '',
  confirmPassword: '',
} as const;

export function DeleteAccount(): React.ReactElement {
  const { classes } = useStyles();
  const [open, { toggle }] = useDisclosure(false);
  const navigate = useNavigate();

  const form = useForm({
    initialValues: initialValues,
    validate: {
      password: (value) =>
        value === '' || value === null ? 'Must not be empty.' : null,
      confirmPassword: (value) =>
        value === '' || value === null ? 'Must not be empty.' : null,
    },
  });

  const handleSignOut = () => {
    dispatch(signOutUser()).then(({ payload }) => {
      responseWrapper(payload);

      if (payload && !payload.hasErrors) {
        navigate(routes.home);
      }
    });
  };

  const handleDelete = async (values: DeleteAccount) => {
    const userDelete: UserDeleteDto = {
      password: values.password,
      confirmPassword: values.confirmPassword,
    };

    dispatch(deleteUser(userDelete)).then(({ payload }) => {
      responseWrapper(payload, 'Account Deleted');

      if (payload && !payload.hasErrors) {
        handleSignOut();
      }
    });
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
        title="Enter and confirm password to delete account."
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
