import { theme as cTheme } from '@chakra-ui/core'
import styled, { CreateStyled } from '@emotion/styled'

export const theme = {
  ...cTheme,
  colors: {
    ...cTheme.colors,
    brand: {
      900: '#1a365d',
      800: '#153e75',
      700: '#2a69ac',
    },
    primary: 'rgb(89,131,240)',
  },
  fonts: {
    ...cTheme.fonts,
    body: '"Literata", serif',
  },
  media: {
    sm: `@media (min-width: ${cTheme.breakpoints[0]})`,
    md: `@media (min-width: ${cTheme.breakpoints[1]})`,
    lg: `@media (min-width: ${cTheme.breakpoints[2]})`,
    xl: `@media (min-width: ${cTheme.breakpoints[3]})`,
  },
}

export default styled as CreateStyled<typeof theme>
