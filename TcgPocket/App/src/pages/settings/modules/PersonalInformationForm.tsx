import { useForm } from '@mantine/form';
import { useFormValidation } from '../../../helpers/useFormValidation';
import { createStyles } from '@mantine/core';
import { PrimaryTextInput } from '../../../components/inputs/PrimaryTextInput';
import { dispatch } from '../../../store/configureStore';
import { UserGetDto } from '../../../types/users';
import { SecondaryButton } from '../../../components/buttons/SecondaryButton';
import { PrimaryButton } from '../../../components/buttons/PrimaryButton';
import { error, success } from '../../../services/notification';
import { updateUserInformation } from '../../../services/AuthServices';

type PersonalInformationFormProps = {
  user: UserGetDto;
};

type PersonalInformationFormDto = {
  id: number;
  userName: string | null;
  email: string | null;
  phoneNumber: string | null;
};

export function PersonalInformationForm({
  user,
}: PersonalInformationFormProps): React.ReactElement {
  const { classes } = useStyles();
  const { validateTextInput, validateEmail, validatePhoneNumer } =
    useFormValidation();

  const initialValues: PersonalInformationFormDto = {
    id: user.id,
    userName: null,
    email: null,
    phoneNumber: null,
  };

  const form = useForm({
    initialValues: initialValues,
    validateInputOnBlur: true,
    validate: {
      userName: (value) =>
        validateTextInput(value ?? '') ? 'Invalid Username' : null,
      phoneNumber: (value) =>
        validatePhoneNumer(value ?? '') ? 'Invalid Phone Number' : null,
      email: (value) => (validateEmail(value ?? '') ? 'Invalid Email' : null),
    },
  });

  const handleSubmit = async (values: PersonalInformationFormDto) => {
    const userToUpdate: UserGetDto = {
      id: user.id,
      userName: values.userName ?? user.userName,
      email: values.email ?? user.email,
      phoneNumber: values.phoneNumber ?? user.phoneNumber,
    };

    const { payload } = await dispatch(updateUserInformation(userToUpdate));

    if (!payload) {
      return;
    } else if (payload.hasErrors) {
      payload.errors.forEach((err) => error(err.message));
      return;
    } else {
      success('User Information Updated!');
    }
  };

  const determineDisabled =
    (form.values.userName === user.userName &&
      form.values.phoneNumber === user.phoneNumber &&
      form.values.email === user.email) ||
    !form.isValid();

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} onReset={form.reset}>
      <header> Personal Information </header>

      <div className={classes.textInputContainer}>
        <PrimaryTextInput
          label="Username"
          placeholder={user.userName}
          {...form.getInputProps('userName')}
        />

        <PrimaryTextInput
          label="Phone Number"
          placeholder={user.phoneNumber}
          {...form.getInputProps('phoneNumber')}
        />
      </div>

      <PrimaryTextInput
        label="Email"
        placeholder={user.email}
        {...form.getInputProps('email')}
      />

      <div className={classes.buttonsContainer}>
        <SecondaryButton type="reset" disabled={!form.isDirty()}>
          Cancel
        </SecondaryButton>
        <PrimaryButton type="submit" disabled={determineDisabled}>
          Update
        </PrimaryButton>
      </div>
    </form>
  );
}

const useStyles = createStyles(() => {
  return {
    textInputContainer: {
      display: 'flex',
      gap: '8px',
    },

    buttonsContainer: {
      display: 'flex',
      justifyContent: 'flex-end',

      gap: '8px',
      paddingTop: '8px',
    },
  };
});
