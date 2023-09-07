import {
    CSSObject,
    MantineTheme,
    Select,
    SelectProps,
    createPolymorphicComponent,
} from '@mantine/core';
import { forwardRef } from 'react';

const selectStyling = (theme: MantineTheme): CSSObject => ({
    input: {
        borderColor: theme.colors.complimentaryColors[0],
        borderWidth: 2,

        ':focus': {
            borderColor: theme.colors.primaryColor[0],
        },
    },
    label: {
        fontWeight: 'bold',
    },
});

const _PrimarySelect = forwardRef<HTMLInputElement, SelectProps>(
    ({ ...props }, ref) => <Select ref={ref} {...props} sx={selectStyling} />
);

export const PrimarySelect = createPolymorphicComponent<'input', SelectProps>(
    _PrimarySelect
);
