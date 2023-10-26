import { Button, ButtonProps, CSSObject, MantineTheme } from '@mantine/core';
import { ButtonHTMLAttributes } from 'react';
import { AdjustedProps } from '../../types/adjusted-props';

type SecondaryButtonProps = ButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement>;

const buttonStyling = (theme: MantineTheme): CSSObject => ({
  backgroundColor: theme.colors.grayCustomColors[0],
  color: theme.black,

  ':hover': {
    backgroundColor: theme.colors.grayCustomColors[2],
  },
});

const disabledStyling = (theme: MantineTheme): CSSObject => ({
  backgroundColor: theme.colors.dark[3],
  color: theme.colors.dark[7],
  textShadow: 'none',
  opacity: '50%',

  cursor: 'default',
});

export function SecondaryButton({
  children,
  sx,
  disabled,
  onClick,
  ...props
}: SecondaryButtonProps) {
  const handleOnClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    onClick && onClick(e);
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
