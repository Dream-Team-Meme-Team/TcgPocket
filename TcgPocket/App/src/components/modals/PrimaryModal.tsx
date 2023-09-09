import { Modal, ModalProps } from '@mantine/core';
import { ModalRootProps } from '@mantine/core/lib/Modal/ModalRoot/ModalRoot';

type PrimaryModalProps = ModalProps & ModalRootProps;

export function PrimaryModal({
    children,
    sx,
    ...props
}: PrimaryModalProps): React.ReactElement {
  return (
    <Modal
      centered
      {...props}
      overlayProps={{ opacity: 0.55, blur: 3 }}
      transitionProps={{
        transition: 'fade',
        duration: 150,
        timingFunction: 'linear',
      }}
      sx={sx}
    >
      {children}
    </Modal>
  );
}
