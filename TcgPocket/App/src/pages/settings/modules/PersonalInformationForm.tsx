import { useForm } from '@mantine/form';
import { useFormValidation } from '../../../helpers/useFormValidation';
import { createStyles } from '@mantine/core';
import { PrimaryTextInput } from '../../../components/inputs/PrimaryTextInput';
import { dispatch } from '../../../store/configureStore';
import { UserGetDto } from '../../../types/users';
import { SecondaryButton } from '../../../components/buttons/SecondaryButton';
import { PrimaryButton } from '../../../components/buttons/PrimaryButton';
import { updateUserInformation } from '../../../services/AuthServices';
import { responseWrapper } from '../../../services/helpers/responseWrapper';

export type UserFormProps = {
    user: UserGetDto;
};

type PersonalInformationFormDto = {
    id: number;
    userName: string;
    email: string;
    phoneNumber: string;
    roles: string;
};

export function PersonalInformationForm({
    user,
}: UserFormProps): React.ReactElement {
    const { classes } = useStyles();
    const { validateTextInput, validateEmail, validatePhoneNumer } =
        useFormValidation();

    const initialValues: PersonalInformationFormDto = {
        id: user.id,
        userName: '',
        email: '',
        phoneNumber: '',
        roles: user.roles,
    };

    const form = useForm({
        initialValues: initialValues,
        validateInputOnBlur: true,
        validate: {
            userName: (value) => {
                if (value === '') {
                    return null;
                } else if (validateTextInput(value)) {
                    return 'Invalid Username';
                } else return null;
            },
            phoneNumber: (value) => {
                if (value === '') {
                    return null;
                } else if (validatePhoneNumer(value)) {
                    return 'Invalid Phone Number';
                } else return null;
            },
            email: (value) => {
                if (value === '') {
                    return null;
                } else if (validateEmail(value)) {
                    return 'Invalid Email';
                } else return null;
            },
        },
    });

    const handleSubmit = (values: PersonalInformationFormDto) => {
        const userToUpdate: UserGetDto = {
            id: user.id,
            userName:
                values.userName === '' || !values.userName
                    ? user.userName
                    : values.userName,
            email:
                values.email === '' || !values.email
                    ? user.email
                    : values.email,
            phoneNumber:
                values.phoneNumber === '' || !values.phoneNumber
                    ? user.phoneNumber
                    : values.phoneNumber,
            roles: user.roles,
        };

        dispatch(updateUserInformation(userToUpdate)).then(({ payload }) => {
            responseWrapper(payload, 'Account Information Updated');

            if (payload && !payload.hasErrors) {
                form.reset();
            }
        });
    };

    const determineDisabled = !form.isDirty() || !form.isValid();

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
