import { MantineThemeOverride } from '@mantine/core';

export const defaultGap = '8px';
export const defaultPadding = '10px';

export const appTheme: MantineThemeOverride = {
    colorScheme: 'light',
    colors: {
        primaryColor: ['#aacae2'],
        complimentaryColors: ['#e2c2aa', '#55351D', '#E2C2AB', '#fdf3d3'],
    },
    white: '#ffffed',
    black: '#000000',
    shadows: {
        md: '1px 1px 3px rgba(0, 0, 0, .25)',
        xl: '5px 5px 3px rgba(0, 0, 0, .25)',
    },
    headings: {
        fontFamily: 'Roboto, sans-serif',
        sizes: {
            h1: { fontSize: '2rem' },
        },
    },
    loader: 'dots',
};
