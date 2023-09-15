import { notifications, NotificationProps } from '@mantine/notifications';

export function errorSignOutUser() {
  notifications.show({
    title: 'ERROR',
    message: 'An error occured signing in.',
    color: 'red',
  } as NotificationProps);
}

export function errorRegisterUser() {
  notifications.show({
    title: 'ERROR',
    message: 'An error occured registering.',
    color: 'red',
  } as NotificationProps);
}

export function errorSignInUser() {
  notifications.show({
    title: 'ERROR',
    message: 'An error occured signing in. ',
    color: 'red',
  } as NotificationProps);
}

export function errorGetSignedInUser() {
  notifications.show({
    title: 'ERROR',
    message: 'An error occured getting sign in.',
    color: 'red',
  } as NotificationProps);
}
