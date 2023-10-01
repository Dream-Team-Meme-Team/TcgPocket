import { useDisclosure } from '@mantine/hooks';
import { PrimaryModal } from '../../../components/modals/PrimaryModal';
import { deleteUserAccount, signOutUser } from '../../../services/AuthServices';
import { error, success } from '../../../services/helpers/notification';
import { dispatch } from '../../../store/configureStore';
import { useForm } from '@mantine/form';
import { PrimaryTextInput } from '../../../components/inputs/PrimaryTextInput';
import { SecondaryButton } from '../../../components/buttons/SecondaryButton';
import { Flex, createStyles } from '@mantine/core';
import { DeleteButton } from '../../../components/buttons/DeleteButton';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../routes';
import { UserFormProps } from './PersonalInformationForm';

const initialValues = {
  userName: '',
} as const;

export function DeleteAccount({ user }: UserFormProps): React.ReactElement {
  const { classes } = useStyles();
  const [open, { toggle }] = useDisclosure(false);
  const navigate = useNavigate();

  const form = useForm({
    initialValues: initialValues,
    validate: {
      userName: (value) => (value !== user.userName ? 'Wrong Username' : null),
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

  const handleDelete = async () => {
    const { payload } = await dispatch(deleteUserAccount(user.id));

    if (!payload) {
      return;
    } else if (payload.hasErrors) {
      payload.errors.forEach((err) => error(err.message));
    } else {
      success('Account Deleted');
      handleSignOut();
      navigate(routes.home);
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
        title="Are you sure you want to delete your account?"
      >
        <form onSubmit={form.onSubmit(handleDelete)}>
          <PrimaryTextInput
            label="Confirm username to delete"
            {...form.getInputProps('userName')}
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
