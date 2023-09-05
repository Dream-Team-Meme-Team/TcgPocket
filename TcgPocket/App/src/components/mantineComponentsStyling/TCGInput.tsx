import { Input, InputProps, createPolymorphicComponent } from '@mantine/core';
import { CSSObject, MantineTheme } from '@mantine/styles';
import { forwardRef } from 'react';

const inputStyling = (theme: MantineTheme): CSSObject => ({
  input: {
    background: theme.colorScheme,
    borderColor: theme.colors.complimentaryColors,
    borderWidth: 2,

    ':focus': {
      borderColor: theme.colors.primaryColor,
    },
  },
});

const _TCGInput = forwardRef<HTMLInputElement, InputProps>(
  ({ ...props }, ref) => (
    <Input component="input" ref={ref} {...props} sx={inputStyling} />
  )
);

export const TCGInput = createPolymorphicComponent<'input', InputProps>(
  _TCGInput
);
