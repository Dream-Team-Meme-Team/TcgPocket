import { Paper, PasswordInput, createStyles } from '@mantine/core';
import { PrimaryTextInput } from '../../../components/inputs/PrimaryTextInput';
import { useForm } from '@mantine/form';

export function AccountTab(): React.ReactElement {
  const { classes } = useStyles();

  const form = useForm({
    initialValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
  });

  return (
    <div className={classes.accountTabContainer}>
      <Paper shadow="md" className={classes.accountPaperContainer}>
        <form>
          <PrimaryTextInput
            label="Username"
            {...form.getInputProps('username')}
          />
          <PrimaryTextInput
            label="Update Email"
            {...form.getInputProps('email')}
          />
          <PasswordInput label="Password" {...form.getInputProps('password')} />
        </form>
      </Paper>
    </div>
  );
}

const useStyles = createStyles(() => {
  return {
    accountTabContainer: {
      display: 'flex',
      justifyContent: 'center',

      paddingTop: '100px',
    },

    accountPaperContainer: {
      display: 'grid',
      gridTemplateRows: 'auto auto',

      width: '50vw',
      height: '50vh',

      backgroundColor: 'white',
    },
  };
});
