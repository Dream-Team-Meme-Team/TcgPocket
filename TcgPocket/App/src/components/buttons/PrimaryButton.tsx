import { Button, ButtonProps } from '@mantine/core';
import { CSSObject, MantineTheme } from '@mantine/styles';
import { ButtonHTMLAttributes } from 'react';

type PrimaryButtonProps = ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>;

const buttonStyling = (theme: MantineTheme): CSSObject => ({
  backgroundColor: theme.colors.primaryPurpleColor[0],
  color: theme.white,

  ':hover': {
    backgroundColor: theme.colors.secondaryBlueColors[0],
  },

  ':disabled': {
    backgroundColor: theme.fn.darken(theme.colors.dark[3], 0.15),
    color: theme.colors.dark[8],
  },
});

export function PrimaryButton({
  children,
  sx,
  ...props
}: PrimaryButtonProps): React.ReactElement {
  return (
    <Button sx={sx ?? buttonStyling} {...props}>
      {children}
    </Button>
  );
}
