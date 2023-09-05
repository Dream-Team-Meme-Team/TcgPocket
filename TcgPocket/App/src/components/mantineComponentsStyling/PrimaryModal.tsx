import { Modal, ModalProps, createPolymorphicComponent } from '@mantine/core';
import { forwardRef } from 'react';

const _PrimaryModal = forwardRef<HTMLDivElement, ModalProps>(
  ({ children, ...props }, _ref) => (
    <Modal
      {...props}
      overlayProps={{
        opacity: 0.55,
        blur: 3,
      }}
      transitionProps={{
        transition: 'fade',
        duration: 150,
        timingFunction: 'linear',
      }}
    >
      {children}
    </Modal>
  )
);

export const PrimaryModal = createPolymorphicComponent<
  'HTMLDivElement',
  ModalProps
>(_PrimaryModal);
