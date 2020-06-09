import { AppProps } from 'next/app'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'

import icon from '../images/icon.png'
import { theme } from '../styled'
import Head from 'next/head'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <link rel="icon" href={icon} />
        <link
          href="https://fonts.googleapis.com/css2?family=Literata&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <CSSReset />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App
