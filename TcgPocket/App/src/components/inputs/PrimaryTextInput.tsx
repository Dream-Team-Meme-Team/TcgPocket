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
  input: {
    background: theme.white,
    borderColor: theme.colors.secondaryBlueColors[0],
    borderWidth: 2,
    backgroundColor: theme.white,

    ':focus': {
      borderColor: theme.colors.primaryPurpleColor[0],
    },
  },
});

export function PrimaryTextInput({
  children,
  sx,
  ...props
}: PrimaryTextInputProps): React.ReactElement {
  return (
    <TextInput sx={sx ?? inputStyling} {...props}>
      {children}
    </TextInput>
  );
}
