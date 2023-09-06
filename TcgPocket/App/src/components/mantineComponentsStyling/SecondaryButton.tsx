import {
  Button,
  ButtonProps,
  CSSObject,
  MantineTheme,
  createPolymorphicComponent,
} from '@mantine/core';
import { forwardRef } from 'react';

const buttonStyling = (theme: MantineTheme): CSSObject => ({
  backgroundColor: theme.colors.gray[5],
  color: theme.colors.complimentaryColors[1],

  ':hover': {
    backgroundColor: theme.colors.complimentaryColors[0],
  },
});

const _SecondaryButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => (
    <Button component="button" {...props} ref={ref} sx={buttonStyling}>
      {children}
    </Button>
  )
);

export const SecondaryButton = createPolymorphicComponent<
  'button',
  ButtonProps
>(_SecondaryButton);
