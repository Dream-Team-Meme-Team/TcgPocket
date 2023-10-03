import { Button, ButtonProps } from '@mantine/core';
import { CSSObject, MantineTheme } from '@mantine/styles';
import { ButtonHTMLAttributes } from 'react';

type PrimaryButtonProps = ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>;

const buttonStyling = (theme: MantineTheme): CSSObject => ({
  backgroundColor: '#9c498b',
  color: 'white',

  ':hover': {
    backgroundColor: '#4442AE',
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
