import { Modal, ModalProps, createPolymorphicComponent } from '@mantine/core';
import { forwardRef } from 'react';

const _TCGModal = forwardRef<HTMLDivElement, ModalProps>(
  ({ children, ...props }, _ref) => (
    <Modal
      {...props}
      overlayProps={{
        opacity: 0.55,
        blur: 3,
      }}
      transitionProps={{
        transition: 'fade',
        duration: 600,
        timingFunction: 'linear',
      }}
    >
      {children}
    </Modal>
  )
);

export const TCGModal = createPolymorphicComponent<
  'HTMLDivElement',
  ModalProps
>(_TCGModal);
