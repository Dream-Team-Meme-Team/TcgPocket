import { Paper, PasswordInput, createStyles } from '@mantine/core';
import { PrimaryTextInput } from '../../../components/inputs/PrimaryTextInput';
import { useForm } from '@mantine/form';

const initialValues = {
  userName: '',
  email: '',
  phoneNumber: '',
  password: '',
  confirmPassword: '',
} as const;

export function AccountTab(): React.ReactElement {
  const { classes } = useStyles();

  const form = useForm({ initialValues: initialValues });

  return (
    <div className={classes.accountTabContainer}>
      <Paper shadow="md" className={classes.accountPaperContainer}>
        <form className={classes.formContainer}>
          <div>
            <label> Username </label>
            <PrimaryTextInput
              // label="Username"
              {...form.getInputProps('username')}
            />
          </div>

          <PrimaryTextInput
            label="Update Email"
            {...form.getInputProps('email')}
          />

          <PrimaryTextInput
            label="Update Phone Number"
            {...form.getInputProps('phoneNumber')}
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
      alignItems: 'center',

      height: '100%',
    },

    accountPaperContainer: {
      width: '60%',
      height: '60%',

      backgroundColor: 'white',
    },

    formContainer: {
      display: 'grid',
      justifyContent: 'center',
      alignItems: 'center',

      height: '100%',
    },
  };
});
