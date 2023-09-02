import { Button, ButtonProps, createPolymorphicComponent } from '@mantine/core';
import { CSSObject, MantineTheme } from '@mantine/styles';
import { forwardRef } from 'react';

const buttonStyling = (theme: MantineTheme): CSSObject => ({
  backgroundColor: theme.colors.primaryColor,
  color: theme.colors.complimentaryColors[1],
  paddding: `${theme.spacing.sm} ${theme.spacing.lg}`,
  ':hover': {
    backgroundColor: '#e2c2aa',
  },
});

const _TCGButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => (
    <Button component="button" {...props} ref={ref} sx={buttonStyling}>
      {children}
    </Button>
  )
);

export const TCGButton = createPolymorphicComponent<'button', ButtonProps>(
  _TCGButton
);
