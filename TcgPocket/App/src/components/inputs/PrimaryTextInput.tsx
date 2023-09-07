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
    borderColor: theme.colors.complimentaryColors[0],
    borderWidth: 2,
    backgroundColor: 'white',

    ':focus': {
      borderColor: theme.colors.primaryColor[0],
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
