import { AppProps } from 'next/app'
import { ChakraProvider, CSSReset } from '@chakra-ui/core'
import { Global, css } from '@emotion/core'
import AuthProvider from '../features/auth/useAuth'

import icon from '../images/icon.png'
import { theme } from '../styled'
import Head from 'next/head'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <Head>
          <title key="title">Bible Strong App - Lexique Hébreu et Grec</title>
          <meta
            key="description"
            name="description"
            content="Le projet Bible Strong a pour objectif la mise à disposition d'outils efficaces d'étude de la Bible pour tous ceux qui souhaitent développer et affermir une foi réfléchie en Dieu par sa Parole."
          />
          <meta key="og:image" name="og:image" content="/image-fb.jpg" />
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link rel="icon" href={icon} />
          <link
            href="https://fonts.googleapis.com/css2?family=Literata&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@800&display=swap"
            rel="stylesheet"
          />
          <link
            type="text/css"
            rel="stylesheet"
            href="https://www.gstatic.com/firebasejs/ui/4.5.1/firebase-ui-auth.css"
          />
        </Head>
        <Global
          styles={css`
            @media print {
              @page {
                margin: 2cm 3cm;
                margin-bottom: 3cm;
              }

              h1 {
                break-before: always;
                page-break-before: always;
              }

              .references-divider {
                break-before: always;
                page-break-before: always;
              }
            }
          `}
        />
        <CSSReset />
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  )
}

export default App
