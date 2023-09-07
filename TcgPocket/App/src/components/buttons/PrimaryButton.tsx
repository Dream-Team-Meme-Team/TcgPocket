import { Button, ButtonProps } from '@mantine/core';
import { CSSObject, MantineTheme } from '@mantine/styles';
import { ButtonHTMLAttributes } from 'react';

type PrimaryButtonProps = ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>;

const buttonStyling = (theme: MantineTheme): CSSObject => ({
  backgroundColor: theme.colors.primaryColor,
  color: theme.colors.complimentaryColors[1],

  ':hover': {
    backgroundColor: '#e2c2aa',
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
