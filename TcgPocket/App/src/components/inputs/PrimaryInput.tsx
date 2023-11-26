import { Input, InputProps } from '@mantine/core';
import { CSSObject, MantineTheme } from '@mantine/styles';
import { InputHTMLAttributes } from 'react';

type PrimaryInputProps = InputProps & InputHTMLAttributes<HTMLInputElement>;

const inputStyling = (theme: MantineTheme): CSSObject => ({
  input: {
    background: theme.black,
    borderColor: theme.colors.secondaryBlueColors[0],
    borderWidth: 1,
    backgroundColor: 'white',

    ':focus': {
      borderColor: theme.colors.primaryPurpleColor[0],
    },
  },
});

export function PrimaryInput({
  children,
  sx,
  ...props
}: PrimaryInputProps): React.ReactElement {
  return (
    <Input sx={sx ?? inputStyling} {...props}>
      {children}
    </Input>
  );
}
