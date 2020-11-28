import { extendTheme } from '@chakra-ui/react'
import button from './theme/button'
import input from './theme/input'
import menu from './theme/menu'
import select from './theme/select'
import text from './theme/text'

const breakpoints: { [x: string]: string } = {
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  xxl: '90em',
}

export const theme = extendTheme({
  initialColorMode: 'light',
  components: {
    Text: text,
    Menu: menu,
    Input: input,
    Button: button,
    Select: select,
  },
  breakpoints,
  colors: {
    brand: {
      900: '#1a365d',
      800: '#153e75',
      700: '#2a69ac',
    },

    black: 'rgb(0,0,0)',
    black_050: 'rgb(0,0,0, 0.5)',
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
    lightQuint: 'rgba(48, 51, 107, 0.1)',

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
    xxl: `@media (min-width: ${breakpoints[4]})`,
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
  radii: {
    s: 10,
    m: 14,
    l: 24,
    xl: 40,
    full: 500,
  },
})

export type DefaultTheme = typeof theme
