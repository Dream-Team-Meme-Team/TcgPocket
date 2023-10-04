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
    color: 'black',
    background: theme.fn.lighten(theme.colors.primaryPurpleColor[0], 0.7),
    backgroundColor: theme.fn.lighten(theme.colors.primaryPurpleColor[0], 0.7),
    borderColor: theme.colors.grape[9],
    borderWidth: 1,

    ':focus': {
      borderColor: theme.colors.secondaryBlueColors[0],
    },
  },
  label: {
    color: theme.fn.darken(theme.white, 0.15),
    fontSize: '16px',
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
      styles={{
        error: {
          fontWeight: 600,
          fontSize: '13px',
          textShadow: '-2px 2px 5px rgba(0,0,0,0.6)',
        },
      }}
      rightSection={
        <ActionIcon onClick={() => setHidden(!hidden)}>
          {hidden ? (
            <IconEye color="#13222B" />
          ) : (
            <IconEyeClosed color="#13222B" />
          )}
        </ActionIcon>
      }
    >
      {children}
    </TextInput>
  );
}
