import { Input, InputProps, createPolymorphicComponent } from '@mantine/core';
import { CSSObject, MantineTheme } from '@mantine/styles';
import { forwardRef } from 'react';

const inputStyling = (theme: MantineTheme): CSSObject => ({
  input: {
    background: theme.colorScheme,
    borderColor: theme.colors.complimentaryColors[0],
    borderWidth: 2,

    ':focus': {
      borderColor: theme.colors.primaryColor[0],
    },
  },
});

const _PrimaryInput = forwardRef<HTMLInputElement, InputProps>(
  ({ ...props }, ref) => (
    <Input component="input" ref={ref} {...props} sx={inputStyling} />
  )
);

export const PrimaryInput = createPolymorphicComponent<'input', InputProps>(
  _PrimaryInput
);
