import { MantineThemeOverride } from '@mantine/styles';

export const AppTheme: MantineThemeOverride = {
  colorScheme: 'dark' || 'light',

  colors: {
    // Add your color, replace default colors. . .
    primaryColor: ['#aacae2'],
    complimentaryColors: ['#e2c2aa', '#55351D', '#E2C2AB'],
  },

  white: '#ffffff',
  black: '#000000',

  // kinda wonky, doesnt really work
  // primaryColor: 'primaryBlue',

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
};
