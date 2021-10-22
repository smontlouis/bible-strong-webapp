import styled from '@emotion/styled'
import Head from 'next/head'

const TextContainer = styled.div(({ theme }) => ({
  marginTop: 100,
  maxWidth: 500,
  margin: '20px auto',

  h1: {
    margin: '40px 0',
    fontFamily: theme.fonts.heading,
    fontSize: theme.fontSizes['4xl'],
    fontWeight: 'bold',
  },

  h2: {
    margin: '20px 0',
    fontFamily: theme.fonts.heading,
    fontSize: theme.fontSizes['2xl'],
    fontWeight: 'bold',
  },

  hr: {
    margin: '20px 0',
  },

  ul: {
    padding: 20,
  },
}))

export default function Page() {
  return (
    <div
      style={{
        backgroundImage: `url(/images/background.jpg)`,
        backgroundSize: 'contain',
        backgroundPosition: 'right',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
        marginBottom: '50px',
        padding: '0 20px',
      }}
    >
      <Head>
        <title>Suppresion de vos données - Bible Strong App</title>
      </Head>
      <TextContainer>
        <h1>Suppression de données</h1>
        <p>
          Si vous souhaitez supprimer vos données, merci d'envoyer un mail à
          s.montlouis.calixte@gmail avec pour object "Suppression de données"
          ainsi que votre addresse email. Les données seront effacées sous 24h.
        </p>
      </TextContainer>
    </div>
  )
}
