import { Button, ButtonProps, CSSObject, MantineTheme } from '@mantine/core';
import { ButtonHTMLAttributes } from 'react';

type SecondaryButtonProps = ButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement>;

const buttonStyling = (theme: MantineTheme): CSSObject => ({
  backgroundColor: theme.colors.grayCustomColors[0],
  color: theme.black,

  ':hover': {
    backgroundColor: theme.colors.grayCustomColors[2],
  },

  ':disabled': {
    backgroundColor: theme.colors.dark[3],
    color: theme.colors.dark[7],
    textShadow: 'none',
    opacity: '50%',
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
