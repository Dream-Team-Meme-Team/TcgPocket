import {
  CSSObject,
  MantineTheme,
  TextInput,
  TextInputProps,
} from '@mantine/core';
import { InputHTMLAttributes } from 'react';

type PrimaryTextInputProps = TextInputProps &
  InputHTMLAttributes<HTMLInputElement>;

const inputStyling = (theme: MantineTheme): CSSObject => ({
  width: '100%',

  input: {
    color: theme.black,
    background: theme.fn.lighten(theme.colors.primaryPurpleColor[0], 0.7),
    backgroundColor: theme.fn.lighten(theme.colors.primaryPurpleColor[0], 0.7),
    borderColor: theme.colors.grape[9],
    borderWidth: 1,

    '::placeholder': {
      fontWeight: 400,
    },

    ':focus': {
      borderColor: theme.colors.secondaryBlueColors[0],
    },
  },

  label: {
    color: theme.fn.darken(theme.white, 0.15),
    fontSize: '16px',
  },
});

export function PrimaryTextInput({
  children,
  sx,
  ...props
}: PrimaryTextInputProps): React.ReactElement {
  return (
    <TextInput
      sx={sx ?? inputStyling}
      styles={{
        error: {
          fontWeight: 600,
          fontSize: '13px',
          textShadow: '-2px 2px 5px rgba(0,0,0,0.6)',
        },
      }}
      {...props}
    >
      {children}
    </TextInput>
  );
}
