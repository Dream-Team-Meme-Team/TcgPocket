import { MantineThemeOverride } from '@mantine/core';

export const appTheme: MantineThemeOverride = {
  colorScheme: 'dark',
  colors: {
    primaryPurpleColor: ['#7d48b7'],
    primaryBlueColor: ['#13222B'],
    secondaryPurpleColors: ['#623990'],
    secondaryBlueColors: [
      '#4442AE',
      '#13222B',
      '#2f4552',
      '#233641',
      '#1f426e',
    ],
  },
  white: '#fff',
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
