import { theme as cTheme } from '@chakra-ui/core'

const theme = {
  ...cTheme,
  colors: {
    ...cTheme.colors,
    brand: {
      900: '#1a365d',
      800: '#153e75',
      700: '#2a69ac',
    },
    media: {
      sm: `@media (min-width: ${cTheme.breakpoints[0]}px)`,
      md: `@media (min-width: ${cTheme.breakpoints[1]}px)`,
      lg: `@media (min-width: ${cTheme.breakpoints[2]}px)`,
      xl: `@media (min-width: ${cTheme.breakpoints[3]}px)`,
    },
  },
}

console.log(theme)
export default theme
