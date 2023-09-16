import { NotificationProps, notifications } from '@mantine/notifications';

export function notification() {
  const error = (errorMessage: string) => {
    notifications.show({
      title: 'ERROR',
      message: errorMessage,
      color: 'red',
    } as NotificationProps);
  };

  const success = (successMessage: string) => {
    notifications.show({
      title: 'SUCCESS',
      message: successMessage,
      color: 'green',
    } as NotificationProps);
  };

  const pending = (pendingMessage: string) => {
    notifications.show({
      title: 'PENDING',
      message: pendingMessage,
      color: 'yellow',
    } as NotificationProps);
  };

  return { error, success, pending };
}
