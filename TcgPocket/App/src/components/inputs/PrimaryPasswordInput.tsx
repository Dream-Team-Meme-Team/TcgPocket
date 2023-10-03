import {
  ActionIcon,
  CSSObject,
  MantineTheme,
  TextInput,
  TextInputProps,
} from '@mantine/core';
import { IconEye, IconEyeClosed } from '@tabler/icons-react';
import { InputHTMLAttributes, useState } from 'react';

type PrimaryPasswordInputProps = TextInputProps &
  InputHTMLAttributes<HTMLTextAreaElement>;

const textInputStyling = (theme: MantineTheme): CSSObject => ({
  input: {
    background: theme.white,
    borderColor: theme.colors.complimentaryColors[0],
    borderWidth: 1,
    backgroundColor: 'white',

    ':focus': {
      borderColor: theme.colors.primaryColor[0],
    },
  },
});

export function PrimaryPasswordInput({
  children,
  sx,
  ...props
}: PrimaryPasswordInputProps): React.ReactElement {
  const [hidden, setHidden] = useState(true);

  return (
    <TextInput
      sx={sx ?? textInputStyling}
      type={hidden ? 'password' : ''}
      {...props}
      rightSection={
        <ActionIcon onClick={() => setHidden(!hidden)}>
          {hidden ? <IconEye /> : <IconEyeClosed />}
        </ActionIcon>
      }
    >
      {children}
    </TextInput>
  );
}
