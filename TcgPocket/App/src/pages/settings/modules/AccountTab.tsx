import { Paper, PasswordInput, createStyles } from '@mantine/core';
import { PrimaryTextInput } from '../../../components/inputs/PrimaryTextInput';
import { useForm } from '@mantine/form';
import { useFormValidation } from '../../../helpers/useFormValidation';

const initialValues = {
  userName: '',
  email: '',
  phoneNumber: '',
  password: '',
  confirmPassword: '',
} as const;

export function AccountTab(): React.ReactElement {
  const { classes } = useStyles();
  const {
    validateTextInput,
    validateEmail,
    validatePhoneNumer,
    validatePassword,
  } = useFormValidation();

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

  return (
    <div className={classes.accountTabContainer}>
      <Paper shadow="md" className={classes.accountPaperContainer}>
        <form className={classes.formContainer}>
          <div>
            <label> Username </label>
            <PrimaryTextInput
              // label="Username"
              {...form.getInputProps('userName')}
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
