import { useForm } from '@mantine/form';
import { useFormValidation } from '../../../helpers/useFormValidation';
import { Flex } from '@mantine/core';
import { PrimaryTextInput } from '../../../components/inputs/PrimaryTextInput';
import { dispatch } from '../../../store/configureStore';
import { UserDto, UserGetDto } from '../../../types/users';
import { SecondaryButton } from '../../../components/buttons/SecondaryButton';
import { PrimaryButton } from '../../../components/buttons/PrimaryButton';
import { error, success } from '../../../services/notification';
import { updateUserInformation } from '../../../services/AuthServices';

type PersonalInformationFormProps = {
  user: UserGetDto;
};

export function PersonalInformationForm({
  user,
}: PersonalInformationFormProps): React.ReactElement {
  const { validateTextInput, validateEmail, validatePhoneNumer } =
    useFormValidation();

  const form = useForm({
    initialValues: {
      userName: user.userName,
      phoneNumber: user.phoneNumber,
      email: user.email,
    },
    validate: {
      userName: (value) =>
        validateTextInput(value) ? 'Invalid Username' : null,
      phoneNumber: (value) =>
        validatePhoneNumer(value) ? 'Invalid Phone Number' : null,
      email: (value) => (validateEmail(value) ? 'Invalid Email' : null),
    },
  });

  const handleSubmit = async (values: UserDto) => {
    const userToUpdate: UserGetDto = {
      id: user.id,
      userName: values.userName,
      email: values.email,
      phoneNumber: values.phoneNumber,
    };

    const { payload } = await dispatch(updateUserInformation(userToUpdate));

    if (!payload) {
      return;
    } else if (payload.hasErrors) {
      payload.errors.forEach((err) => error(err.message));
      return;
    } else {
      success('User Information Updated');
    }
  };

  const handleReset = () => {
    form.setValues(user);
  };

  const determineDisabled =
    form.values.userName === user.userName &&
    form.values.phoneNumber === user.phoneNumber &&
    form.values.email === user.email;

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} onReset={handleReset}>
      <header> Personal Information </header>

      <Flex gap={8}>
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
      </Flex>

      <PrimaryTextInput
        label="Email"
        placeholder={user.email}
        {...form.getInputProps('email')}
      />

      <Flex gap={8} justify={'flex-end'} sx={{ paddingTop: '8px' }}>
        <SecondaryButton type="reset">Cancel</SecondaryButton>
        <PrimaryButton type="submit" disabled={determineDisabled}>
          Update
        </PrimaryButton>
      </Flex>
    </form>
  );
}
