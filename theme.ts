import { extendTheme } from '@chakra-ui/react'
import menu from './theme/menu'
import text from './theme/text'

const breakpoints: { [x: string]: string } = {
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
}

export const theme = extendTheme({
  initialColorMode: 'light',
  components: {
    Text: text,
    Menu: menu,
  },
  colors: {
    brand: {
      900: '#1a365d',
      800: '#153e75',
      700: '#2a69ac',
    },

    black: 'rgb(0,0,0)',
    white: 'rgb(255,255,255)',
    border: 'rgb(230,230,230)',

    lightGrey: '#F4F7FF',
    grey: '#A2A9C8',
    darkGrey: 'rgba(0,0,0,0.5)',

    primary: 'rgb(89,131,240)',
    lightPrimary: 'rgb(233, 243, 252)',

    secondary: 'rgb(255,188,0)',
    lightSecondary: 'rgb(255, 238, 198)',

    tertiary: 'rgb(98,113,122)',

    quart: 'rgb(194,40,57)',
    quint: 'rgb(48, 51, 107)',

    success: '#2ecc71',
    error: '#e74c3c',

    color1: '#81ecec',
    color2: '#ff7675',
    color3: '#fdcb6e',
    color4: '#74b9ff',
    color5: '#95afc0',
  },
  fonts: {
    normal: 'Pulp-Display, sans-serif',
    text: '"Literata", serif',
  },
  media: {
    sm: `@media (min-width: ${breakpoints[0]})`,
    md: `@media (min-width: ${breakpoints[1]})`,
    lg: `@media (min-width: ${breakpoints[2]})`,
    xl: `@media (min-width: ${breakpoints[3]})`,
  },
  space: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
    '2xl': 60,
    '3xl': 90,
    '1px': 1,
    '2px': 1,
  },
  sizes: {
    ...Object.fromEntries(
      [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        12,
        14,
        16,
        20,
        24,
        28,
        32,
        36,
        40,
        44,
        48,
        52,
        56,
        60,
        64,
        72,
        80,
        96,
      ].map((p) => [p, p])
    ),
  },
  radii: {
    s: 10,
    m: 14,
    l: 24,
    xl: 40,
    full: 500,
  },
})

export type DefaultTheme = typeof theme
