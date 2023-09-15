import { notifications, NotificationProps } from '@mantine/notifications';

export function successSignInUser() {
  notifications.show({
    title: 'SUCCESS',
    message: 'Successfully signed in.',
    color: 'green',
  } as NotificationProps);
}

export function successSignOutUser() {
  notifications.show({
    title: 'SUCCESS',
    message: 'Successfully signed out.',
    color: 'green',
  } as NotificationProps);
}

export function successRegisterUser() {
  notifications.show({
    title: 'SUCCESS',
    message: 'Successfully registered.',
    color: 'green',
  } as NotificationProps);
}

export function successGetSignedInUser() {
  notifications.show({
    title: 'SUCCESS',
    message: 'Successfully retrieved signing in.',
    color: 'green',
  } as NotificationProps);
}
