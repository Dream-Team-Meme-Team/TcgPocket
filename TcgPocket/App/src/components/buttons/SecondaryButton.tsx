import { Button, ButtonProps, CSSObject, MantineTheme } from '@mantine/core';
import { ButtonHTMLAttributes } from 'react';

type SecondaryButtonProps = ButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement>;

const buttonStyling = (theme: MantineTheme): CSSObject => ({
  backgroundColor: theme.colors.gray[5],
  color: theme.colors.complimentaryColors[1],

  ':hover': {
    backgroundColor: theme.colors.complimentaryColors[0],
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