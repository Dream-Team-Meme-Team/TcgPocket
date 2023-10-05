import { Modal, ModalBaseSettings, ModalProps } from '@mantine/core';
import { ModalRootProps } from '@mantine/core/lib/Modal/ModalRoot/ModalRoot';

type PrimaryModalProps = ModalProps & ModalRootProps & ModalBaseSettings;

const defaultProps: Partial<PrimaryModalProps> = {
  overlayProps: {
    opacity: 0.55,
    blur: 3,
  },
  transitionProps: {
    transition: 'fade',
    duration: 150,
    timingFunction: 'linear',
  },
  styles: {
    header: {
      backgroundColor: '#28163b',
      paddingTop: '3px',
    },
    title: {
      fontSize: '20px',
      color: 'white',
      fontWeight: 'bold',
      margin: 'auto',
      paddingTop: '20px',
    },
    body: {
      padding: '20px 20px',
      backgroundColor: '#28163b',
    },
  },
  closeButtonProps: {
    size: 'md',
    ml: '0',
    tabIndex: -1,
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
