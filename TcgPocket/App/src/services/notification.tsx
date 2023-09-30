import { NotificationProps, notifications } from '@mantine/notifications';
import { IconCircleCheckFilled, IconCircleXFilled } from '@tabler/icons-react';

const error = (errorMessage: string = '') => {
  notifications.show({
    title: 'Error',
    message: errorMessage,
    color: 'red',
    icon: <IconCircleXFilled />,
  } as NotificationProps);
};

const success = (successMessage: string = '') => {
  notifications.show({
    title: 'Success',
    message: successMessage,
    color: 'green',
    icon: <IconCircleCheckFilled />,
  } as NotificationProps);
};

const pending = (pendingMessage: string = '') => {
  notifications.show({
    title: 'Pending',
    message: pendingMessage,
    color: 'yellow',
    loading: true,
  } as NotificationProps);
};

export { error, success, pending };
