import { extendTheme } from '@chakra-ui/react'

const breakpoints: { [x: string]: string } = {
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
}

export const theme = extendTheme({
  colors: {
    brand: {
      900: '#1a365d',
      800: '#153e75',
      700: '#2a69ac',
    },
    primary: 'rgb(89,131,240)',
  },
  fonts: {
    heading: 'Helvetica, sans-serif',
    text: '"Literata", serif',
  },
  media: {
    sm: `@media (min-width: ${breakpoints[0]})`,
    md: `@media (min-width: ${breakpoints[1]})`,
    lg: `@media (min-width: ${breakpoints[2]})`,
    xl: `@media (min-width: ${breakpoints[3]})`,
  },
})

export type DefaultTheme = typeof theme
