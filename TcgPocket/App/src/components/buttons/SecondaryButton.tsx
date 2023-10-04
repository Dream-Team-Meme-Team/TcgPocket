import { Button, ButtonProps, CSSObject, MantineTheme } from '@mantine/core';
import { ButtonHTMLAttributes } from 'react';

type SecondaryButtonProps = ButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement>;

const buttonStyling = (theme: MantineTheme): CSSObject => ({
  backgroundColor: theme.colors.dark[1],
  color: theme.black,

  ':hover': {
    backgroundColor: theme.colors.dark[2],
  },

  ':disabled': {
    backgroundColor: theme.fn.darken(theme.colors.dark[3], 0.15),
    color: theme.colors.dark[8],
  },
});

export function SecondaryButton({
  children,
  sx,
  ...props
}: SecondaryButtonProps) {
  return (
    <Button sx={sx ?? buttonStyling} {...props}>
      {children}
    </Button>
  );
}
