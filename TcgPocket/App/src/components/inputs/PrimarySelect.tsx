import { CSSObject, MantineTheme, Select, SelectProps } from '@mantine/core';
import { InputHTMLAttributes } from 'react';

type PrimarySelectProps = SelectProps & InputHTMLAttributes<HTMLInputElement>;

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

export function PrimartSelect({
    children,
    sx,
    ...props
}: PrimarySelectProps): React.ReactElement {
    return (
        <Select sx={sx ?? selectStyling} {...props}>
            {children}
        </Select>
    );
}
