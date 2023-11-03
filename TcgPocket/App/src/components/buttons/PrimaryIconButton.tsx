import {
  ActionIcon,
  ActionIconProps,
  CSSObject,
  MantineTheme,
} from '@mantine/core';
import { AdjustedProps } from '../../types/adjusted-props';
import { ButtonHTMLAttributes } from 'react';

type PrimaryButtonProps = ActionIconProps &
  ButtonHTMLAttributes<HTMLButtonElement>;

const buttonStyling = (theme: MantineTheme): CSSObject => ({
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

export function PrimaryIconButton({
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
    <ActionIcon {...props} {...adjustedButtonProps}>
      {children}
    </ActionIcon>
  );
}
