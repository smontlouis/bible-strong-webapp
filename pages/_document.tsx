import Document, { Html, Head, Main, NextScript } from 'next/document'
import imageFb from '../images/image-fb.jpg'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <title key="title">Bible Strong App - Lexique Hébreu et Grec</title>
          <meta
            key="description"
            name="description"
            content="Le projet Bible Strong a pour objectif la mise à disposition d'outils efficaces d'étude de la Bible pour tous ceux qui souhaitent développer et affermir une foi réfléchie en Dieu par sa Parole."
          />
          <meta key="og:image" name="og:image" content={imageFb} />
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
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
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
