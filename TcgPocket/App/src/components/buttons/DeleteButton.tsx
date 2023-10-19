import { ButtonProps, MantineTheme, Button, CSSObject } from '@mantine/core';
import { ButtonHTMLAttributes } from 'react';
import { AdjustedProps } from '../../types/adjusted-props';

type DeleteButtonProps = ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>;

const buttonStyling = (theme: MantineTheme): CSSObject => ({
  backgroundColor: theme.colors.red[0],
  color: theme.white,

  '&:hover': {
    backgroundColor: theme.fn.darken(theme.colors.red[0], 0.3),
  },
});

const disabledStyling = (theme: MantineTheme): CSSObject => ({
  backgroundColor: theme.colors.dark[3],
  color: theme.colors.dark[7],
  textShadow: 'none',
  opacity: '50%',

  cursor: 'default',
});

export function DeleteButton({
  children,
  sx,
  disabled,
  onClick,
  ...props
}: DeleteButtonProps) {
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
    <Button {...props} {...adjustedButtonProps}>
      {children}
    </Button>
  );
}
