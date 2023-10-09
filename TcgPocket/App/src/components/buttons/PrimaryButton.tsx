import { Button, ButtonProps } from '@mantine/core';
import { CSSObject, MantineTheme } from '@mantine/styles';
import { ButtonHTMLAttributes } from 'react';

type PrimaryButtonProps = ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>;

const buttonStyling = (theme: MantineTheme): CSSObject => ({
  backgroundColor: theme.colors.primaryPurpleColor[0],
  color: theme.white,
  textShadow: '1px 2px 2px rgba(0,0,0,0.7), 1px -0.5px 1px rgba(0,0,0,0.3)',

  ':hover': {
    backgroundColor: theme.colors.secondaryBlueColors[0],
  },

  ':disabled': {
    backgroundColor: theme.colors.dark[3],
    color: theme.colors.dark[8],
    textShadow: 'none',
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
