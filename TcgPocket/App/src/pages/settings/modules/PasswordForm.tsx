import { useForm } from '@mantine/form';
import { useFormValidation } from '../../../helpers/useFormValidation';
import { UserGetDto, UserPasswordUpdateDto } from '../../../types/users';
import { Popover, createStyles } from '@mantine/core';
import { SecondaryButton } from '../../../components/buttons/SecondaryButton';
import { PrimaryButton } from '../../../components/buttons/PrimaryButton';
import { dispatch } from '../../../store/ConfigureStore';
import { updateUserPassword } from '../../../services/AuthServices';
import { PrimaryPasswordInput } from '../../../components/inputs/PrimaryPasswordInput';
import {
  PasswordRequirement,
  passwordRequirements,
} from '../../../components/PasswordRequirement';
import { CSSProperties, useState } from 'react';
import { responseWrapper } from '../../../services/helpers/responseWrapper';

type PasswordFormProps = {
  user: UserGetDto;
};

type PasswordForm = Omit<UserPasswordUpdateDto, 'userName'>;

const initialValues = {
  currentPassword: '',
  newPassword: '',
  newPasswordConfirmation: '',
} as const;

export function PasswordForm({ user }: PasswordFormProps): React.ReactElement {
  const { classes } = useStyles();
  const { validatePassword } = useFormValidation();

  const [popover, setPopover] = useState(false);

  const form = useForm({
    initialValues: initialValues,
    validateInputOnBlur: true,
    validate: {
      currentPassword: (value) => (value === '' ? 'Cannot be Empty' : null),
      newPassword: (value, values) =>
        value === values.currentPassword
          ? 'Must be different than current password.'
          : validatePassword(value)
          ? 'Invalid Password'
          : null,
      newPasswordConfirmation: (value, values) =>
        value !== values.newPassword ? 'Passwords do not match' : null,
    },
  });

  const checks = passwordRequirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      meets={requirement.expression.test(form.values.newPassword)}
      label={requirement.label}
    />
  ));

  const handleSubmit = async (values: PasswordForm) => {
    const userWithUpdatedPassword: UserPasswordUpdateDto = {
      userName: user.userName,
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
      newPasswordConfirmation: values.newPasswordConfirmation,
    };

    dispatch(updateUserPassword(userWithUpdatedPassword)).then(
      ({ payload }) => {
        responseWrapper(payload, 'Password Updated');

        if (payload && !payload.hasErrors) {
          form.reset();
        }
      }
    );
  };

  const determineDisabled = !form.isValid();

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} onReset={form.reset}>
      <header> Password </header>

      <PrimaryPasswordInput
        className={classes.passwordInput}
        label="Current Password"
        {...form.getInputProps('currentPassword')}
      />

      <div className={classes.newPasswordContainer}>
        <Popover opened={popover} position="bottom" width="target">
          <Popover.Target>
            <div
              onFocusCapture={() => setPopover(true)}
              onBlurCapture={() => setPopover(false)}
            >
              <PrimaryPasswordInput
                className={classes.passwordInput}
                label="New Password"
                {...form.getInputProps('newPassword')}
              />
            </div>
          </Popover.Target>
          <Popover.Dropdown style={popoverStyle}>{checks}</Popover.Dropdown>
        </Popover>

        <PrimaryPasswordInput
          className={classes.passwordInput}
          label="Confirm Password"
          {...form.getInputProps('newPasswordConfirmation')}
        />
      </div>

      <div className={classes.buttonsContainer}>
        <SecondaryButton type="reset" disabled={!form.isTouched()}>
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
    newPasswordContainer: {
      display: 'grid',
      gridTemplateColumns: 'auto auto',
      gap: '8px',
    },

    passwordInput: {
      input: {
        backgroundColor: 'white',
      },
    },

    buttonsContainer: {
      display: 'flex',
      justifyContent: 'flex-end',

      gap: '8px',
      paddingTop: '8px',
    },
  };
});

const popoverStyle: CSSProperties = { backgroundColor: 'white' };
