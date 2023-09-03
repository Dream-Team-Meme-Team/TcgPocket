import {
    Button,
    ButtonProps,
    UnstyledButtonProps,
    createPolymorphicComponent,
    createStyles,
} from '@mantine/core';
import { CSSObject, MantineTheme } from '@mantine/styles';
import { forwardRef, useRef } from 'react';

const buttonStyling = (theme: MantineTheme): CSSObject => ({
    backgroundColor: theme.colors.primaryColor,
    color: theme.colors.complimentaryColors[1],
    paddding: `${theme.spacing.sm} ${theme.spacing.lg}`,
    ':hover': {
        backgroundColor: '#e2c2aa',
    },
});

const _TCGButton = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, ...props }, ref) => (
        <Button component="button" {...props} ref={ref} sx={buttonStyling}>
            {children}
        </Button>
    )
);

export const TCGButton = createPolymorphicComponent<'button', ButtonProps>(
    _TCGButton
);

export function TestButton() {
    return <Button />;
}

// export const AnotherCustomButton = forwardRef((props, ref) => {
//     return <Button {...props} ref={ref} />;
// });

const useStyles = createStyles((theme: MantineTheme) => ({
    button: {
        backgroundColor: theme.colors.primaryColor,
        color: theme.colors.complimentaryColors[1],
        paddding: `${theme.spacing.sm} ${theme.spacing.lg}`,
        ':hover': {
            backgroundColor: '#e2c2aa',
        },
    },
}));

export function CustomButton({ ...props }) {
    // const theme = AppTheme;
    const { classes } = useStyles();

    const ref = useRef<HTMLButtonElement>;
    return <Button {...props} ref={ref} />;
}
