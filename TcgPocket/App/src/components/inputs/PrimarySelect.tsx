import { CSSObject, MantineTheme, Select, SelectProps } from '@mantine/core';
import { InputHTMLAttributes } from 'react';

type PrimarySelectProps = SelectProps & InputHTMLAttributes<HTMLInputElement>;

const selectStyling = (theme: MantineTheme): CSSObject => ({
    input: {
        color: 'black',
        background: theme.colors.textBoxColor[0],
        borderColor: theme.colors.secondaryBlueColors[0],
        // backgroundColor: 'white',
        borderWidth: 1,

        ':focus': {
            borderColor: theme.colors.primaryPurpleColor[0],
        },
    },
    label: {
        fontWeight: 'bold',
    },
});

export function PrimarySelect({
    children,
    sx,
    ...props
}: PrimarySelectProps): React.ReactElement {
    return (
        <Select
            sx={sx ?? selectStyling}
            {...props}
            clearButtonProps={{ style: { color: 'black' } }}
        >
            {children}
        </Select>
    );
}
