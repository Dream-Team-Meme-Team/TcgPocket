import { Button, ButtonProps, CSSObject } from '@mantine/core';
import { MantineTheme } from '@mantine/core';
import { ButtonHTMLAttributes } from 'react';
import { AdjustedProps } from '../../types/adjusted-props';

type PrimaryButtonProps = ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>;

const buttonStyling = (theme: MantineTheme): CSSObject => ({
  backgroundColor: theme.colors.primaryPurpleColor[0],
  color: theme.white,
  textShadow: '1px 2px 2px rgba(0,0,0,0.3), 1px -0.5px 1px rgba(0,0,0,0.3)',

  ':hover': {
    backgroundColor: theme.colors.secondaryBlueColors[0],
  },
});

const disabledStyling = (theme: MantineTheme): CSSObject => ({
  backgroundColor: theme.colors.dark[3],
  color: theme.colors.dark[7],
  textShadow: 'none',
  opacity: '50%',

  cursor: 'default',
});

export function PrimaryButton({
  children,
  sx,
  disabled,
  onClick,
  ...props
}: PrimaryButtonProps): React.ReactElement {
  const handleOnClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (disabled) {
      e.preventDefault();
    } else if (onClick) {
      return onClick(e);
    }
  };

  const adjustedButtonProps: AdjustedProps = {
    disabled: false,
    'aria-disabled': disabled,
    onClick: handleOnClick,
    sx: sx ?? disabled ? disabledStyling : buttonStyling,
  };

  return (
    <>
      <Button {...props} {...adjustedButtonProps}>
        {children}
      </Button>
    </>
  );
}
