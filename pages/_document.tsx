import Document, { Html, Head, Main, NextScript } from 'next/document'
import { InitializeColorMode } from '@chakra-ui/react'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <InitializeColorMode />
          <Main />
          <NextScript />
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-109677220-2"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', 'UA-109677220-2');
            `,
            }}
          />
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-109677220-2"
          ></script>
        </body>
      </Html>
    )
  }
}

export default MyDocument
