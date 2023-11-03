import { MantineThemeOverride } from '@mantine/core';

export const defaultGap = '8px';
export const defaultPadding = '10px';

export const appTheme: MantineThemeOverride = {
  colorScheme: 'dark',
  colors: {
    textBoxColor: ['#ebe0f8'],
    placeholderTextColor: ['#666666'],
    primaryPurpleColor: ['#9d65db'],
    primaryBlueColor: ['#13222B'],
    backgroundColor: ['#0F161C'],
    secondaryBackgroundColor: ['#0B1014'],
    secondaryPurpleColors: ['#623990', '#331852'],
    secondaryBlueColors: [
      '#4442AE',
      '#13222B',
      '#2f4552',
      '#233641',
      '#1f426e',
    ],
    grayCustomColors: [
      '#a2a6bd',
      '#acaebf',
      '#8c8fa3',
      '#8a8a8a',
      '#4d4f66',
      '#34354a',
      '#2b2c3d',
      '#1d1e30',
      '#0c0d21',
      '#01010a',
    ],
    red: [
      '#e60e00',
      '#ED2E21',
      '#FFC9C9',
      '#FFA8A8',
      '#FF8787',
      '#FF6B6B',
      '#FA5252',
      '#F03E3E',
      '#E03131',
      '#C92A2A',
    ],
    dark: [
      '#fff', //this color determines global text color
      '#acaebf',
      '#8c8fa3',
      '#8a8a8a',
      '#4d4f66',
      '#34354a',
      '#2b2c3d',
      '#1d1e30',
      '#0c0d21',
      '#01010a',
    ],
  },
  primaryColor: 'indigo',
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
