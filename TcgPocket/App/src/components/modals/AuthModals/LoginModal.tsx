import { PrimaryModal } from '../PrimaryModal';
import { useLoginOrRegisterStyles } from './LoginOrRegisterStyling';
import { PrimaryButton } from '../../buttons/PrimaryButton';
import { useForm } from '@mantine/form';
import { PrimaryTextInput } from '../../inputs/PrimaryTextInput';
import { SecondaryButton } from '../../buttons/SecondaryButton';
import { SignInUserDto } from '../../../types/users';
import { useMemo } from 'react';
import { dispatch, useAppSelector } from '../../../store/configureStore';
import { signInUser } from '../../../services/authServices';
import { error, success } from '../../../services/helpers/Notification';
import { PrimaryPasswordInput } from '../../inputs/PrimaryPasswordInput';

type LoginModalProps = {
    open: boolean;
    setOpen: (arg: boolean) => void;
};

const initialValues: SignInUserDto = {
    userName: '',
    password: '',
} as const;

export function LoginModal({
    open,
    setOpen,
}: LoginModalProps): React.ReactElement {
    const { classes } = useLoginOrRegisterStyles();

    const isLoading = useAppSelector((state) => state.user.isLoading);

    const form = useForm({
        initialValues: initialValues,
    });

    const handleClose = () => {
        setOpen(false);
        form.reset();
    };

    const handleSignIn = async (values: SignInUserDto) => {
        const { payload } = await dispatch(signInUser(values));

        if (!payload) {
            return;
        } else if (payload.hasErrors) {
            payload.errors.forEach((err) => error(err.message));
            return;
        } else {
            success('Signed In!');
            handleClose();
        }
    };

    const disableLogin = useMemo(
        () =>
            form.values.password === '' ||
            form.values.userName === '' ||
            isLoading,
        [form, isLoading]
    );

    return (
        <PrimaryModal opened={open} onClose={handleClose} title="Login">
            <form onSubmit={form.onSubmit(handleSignIn)}>
                <div className={classes.bodyContainer}>
                    <PrimaryTextInput
                        withAsterisk
                        label="Username"
                        {...form.getInputProps('userName')}
                    />
                    <PrimaryPasswordInput
                        withAsterisk
                        className={classes.passwordInput}
                        label="Password"
                        {...form.getInputProps('password')}
                    />
                    <div className={classes.bottomBtns}>
                        <SecondaryButton type="button" onClick={handleClose}>
                            Close
                        </SecondaryButton>
                        <PrimaryButton type="submit" disabled={disableLogin}>
                            Login
                        </PrimaryButton>
                    </div>
                </div>
            </form>
        </PrimaryModal>
    );
}
