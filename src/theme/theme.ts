import {createTheme} from '@shopify/restyle';

export const theme = createTheme({
  colors: {
    primary: '#246375',
    black: '#000000',
    white: 'white',
    fakeWhite: '#e6e6e6',
    disabled: '#e6e6e6',
  },
  spacing: {
    '0': 0,
    x: 5,
    '0.5': 5,
    '1': 10,
    '2': 20,
    '3': 22,
    '4': 28,
    '-x': -5,
    '-0.5': -5,
    '-1': -10,
    '-2': -20,
    '-3': -22,
    '-4': -28,
  },
  borderRadii: {
    xs: 2,
    sm: 3,
    md: 4,
    lg: 10,
  },
  textVariants: {
    defaults: {
      color: 'black',
      fontWeight: '600',
      fontSize: 14,
      lineHeight: 16,
      verticalAlign: 'middle',
      includeFontPadding: false,
    },
    h1: {
      fontWeight: 'bold',
      fontSize: 22,
      lineHeight: 26,
    },
    h2: {
      fontWeight: 'bold',
      fontSize: 18,
      lineHeight: 20,
    },
  },
});

export type Theme = typeof theme;
