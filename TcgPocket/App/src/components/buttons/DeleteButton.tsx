import { ButtonProps, MantineTheme, Button, CSSObject } from '@mantine/core';
import { ButtonHTMLAttributes } from 'react';

type DeleteButtonProps = ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>;

const buttonStyling = (theme: MantineTheme): CSSObject => ({
  backgroundColor: theme.colors.red[0],
  color: theme.white,

  '&:hover': {
    backgroundColor: theme.fn.darken(theme.colors.red[0], 0.3),
  },
});

export function DeleteButton({ children, sx, ...props }: DeleteButtonProps) {
  return (
    <Button sx={sx ?? buttonStyling} {...props}>
      {children}
    </Button>
  );
}
