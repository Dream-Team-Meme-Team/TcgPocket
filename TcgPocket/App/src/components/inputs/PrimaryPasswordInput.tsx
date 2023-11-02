import {
    ActionIcon,
    CSSObject,
    MantineTheme,
    Styles,
    TextInput,
    TextInputProps,
    TextInputStylesNames,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEye, IconEyeClosed } from '@tabler/icons-react';
import { InputHTMLAttributes } from 'react';

type PrimaryPasswordInputProps = TextInputProps &
    InputHTMLAttributes<HTMLTextAreaElement>;

const textInputStyling = (theme: MantineTheme): CSSObject => ({
    input: {
        color: 'white',
        background: theme.black,
        borderColor: theme.colors.grape[9],
        fontWeight: 500,
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
    const [hidden, { toggle: toggleHidden }] = useDisclosure(true);

    return (
        <TextInput
            sx={sx ?? textInputStyling}
            type={hidden ? 'password' : ''}
            {...props}
            styles={styles}
            rightSection={
                <ActionIcon aria-label="Toggle Visible" onClick={toggleHidden}>
                    {hidden ? <IconEye /> : <IconEyeClosed />}
                </ActionIcon>
            }
        >
            {children}
        </TextInput>
    );
}

const styles: Styles<TextInputStylesNames, Record<string, any>> = {
    error: {
        fontWeight: 600,
        fontSize: '13px',
        textShadow: '-2px 2px 5px rgba(0,0,0,0.6)',
        color: '#fc2a1c',
    },
};
