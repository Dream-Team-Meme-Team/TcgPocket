import { Modal, ModalBaseSettings, ModalProps } from '@mantine/core';
import { ModalRootProps } from '@mantine/core/lib/Modal/ModalRoot/ModalRoot';

type PrimaryModalProps = ModalProps & ModalRootProps & ModalBaseSettings;

const defaultProps: Partial<PrimaryModalProps> = {
  overlayProps: {
    opacity: 0.75,
    blur: 4.5,
  },
  transitionProps: {
    transition: 'fade',
    duration: 150,
    timingFunction: 'linear',
  },
  styles: {
    header: {
      backgroundColor: '#170b24',
      paddingTop: '3px',
    },
    title: {
      fontSize: '20px',
      fontWeight: 'bold',
      margin: 'auto',
      paddingTop: '20px',
    },
    body: {
      padding: '20px 20px',
      backgroundColor: '#170b24',
    },
  },
  closeButtonProps: {
    'aria-label': 'Close',
    size: 'md',
    ml: '0',
  },
};

export function PrimaryModal({
  children,
  sx,
  ...props
}: PrimaryModalProps): React.ReactElement {
  return (
    <Modal centered {...defaultProps} {...props} sx={sx}>
      {children}
    </Modal>
  );
}
