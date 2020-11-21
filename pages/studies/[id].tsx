import { GetStaticProps, GetStaticPaths } from 'next'
import { Box, Heading, Text, Divider, Flex, Link } from '@chakra-ui/react'

import {
  getStaticStudyProps,
  getStaticStudyPaths,
  FirebaseStudy,
  Annexe as AnnexeProps,
} from '../../features/studies/helpers.study'
import Annexe from '../../features/studies/Annexe'
import InlineModals from '../../features/studies/InlineModals'
import Head from 'next/head'
import Logo from '../../images/svg/logo.svg'
import { ReactNode, ElementType } from 'react'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const idParam = params?.id as string
  const result = await getStaticStudyProps(idParam)

  return {
    props: {
      ...result,
    },
    revalidate: 3,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getStaticStudyPaths()
  return {
    paths,
    fallback: true,
  }
}

const StudyContainer = styled.div(
  ({ theme: { media, fonts, fontSizes, space, colors } }) => ({
    fontSize: 16,
    counterReset: 'inline-counter',
    fontFamily: fonts.text,

    [media.md]: {
      fontSize: 21,
    },

    h1: {
      fontSize: fontSizes['2xl'],

      [media.md]: {
        fontSize: fontSizes['4xl'],
      },
    },

    h2: {
      fontSize: fontSizes['xl'],

      [media.md]: {
        fontSize: fontSizes['3xl'],
      },
    },

    'ul, ol': {
      padding: space[4],

      [media.md]: {
        padding: space[10],
      },
    },

    '.divider': {
      textAlign: 'center',
      marginTop: '30px',
      marginBottom: '30px',

      '&::before': {
        content: '"..."',
        textIndent: '0.6em',
        lineHeight: '1.4',
        letterSpacing: '1em',
      },
    },

    '.inline-verse, .inline-strong': {
      color: colors.primary,
      textDecoration: 'underline',
      position: 'relative',
      cursor: 'pointer',

      '&::after': {
        counterIncrement: 'inline-counter',
        content: '"["counter(inline-counter)"]"',

        top: '-0.5em',
        fontSize: '75%',
        lineHeight: '0',
        position: 'relative',
        verticalAlign: 'baseline',
      },
    },

    '.block-strong': {
      position: 'relative',
      display: 'flex',
      margin: '30px auto',
      flexDirection: 'column',

      [media.md]: {
        flexDirection: 'row',
      },
      '&__container': {
        flex: 1,
      },
      '&__title': {
        display: 'inline-block',
      },
      '&__phonetique': { display: 'inline-block', fontSize: fontSizes.md },
      '&__original': {
        fontSize: fontSizes['2xl'],
        color: colors.primary,
        [media.md]: {
          fontSize: fontSizes['3xl'],
        },
      },
      '&__definition': {
        flex: 2,
        fontSize: fontSizes.md,
      },
    },

    '.block-verse': {
      textAlign: 'center',
      marginTop: space[8],
      padding: space[6],

      [media.md]: {
        marginTop: space[10],
        padding: space[16],
      },

      position: 'relative',

      '&::after': {
        content: '""',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        position: 'absolute',
        height: 4,
        borderRadius: 20,
        backgroundColor: colors.primary,
        width: '50px',

        [media.md]: {
          top: 40,
          width: '80px',
        },
      },

      '&::before': {
        position: 'absolute',
        content: "'“'",
        top: 0,
        left: 0,
        fontSize: 200,
        color: 'rgba(0,0,0,0.05)',
        lineHeight: 0.8,

        [media.md]: {
          top: 30,
          left: 30,
        },
      },

      '&__content': {
        marginBottom: space[4],
      },

      '&__aside': {
        fontSize: fontSizes.md,
        color: colors.primary,
      },
    },
  })
)

interface Props extends FirebaseStudy {
  html: string
  annexe: AnnexeProps
  imageUrl: string
  whatsappImageUrl: string
}

// const getPdf = async (id: string) => {
//   const response = await fetch(
//     `https://us-central1-bible-strong-app.cloudfunctions.net/exportStudyPDF`,
//     {
//       body: JSON.stringify({ studyId: id }),
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//     }
//   )

//   const buffer = await response.arrayBuffer()

//   const blob = new Blob([buffer], { type: 'application/pdf' })
//   const link = document.createElement('a')
//   link.href = window.URL.createObjectURL(blob)
//   link.download = `your-file-name.pdf`
//   link.click()
// }

const Study = ({
  title,
  html,
  annexe = [],
  user,
  id,
  modified_at,
  imageUrl,
  whatsappImageUrl,
}: Props) => {
  const router = useRouter()

  if (router.isFallback) return <div>Loading...</div>
  return (
    <>
      <Head>
        <title key="title">{title} - Bible Strong App</title>
        <meta
          key="description"
          name="description"
          content={`${title} - Bible Strong App. Cette étude a été rédigée par ${user.displayName}`}
        />
        <meta property="og:site_name" content="Bible Strong App" />
        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content={`${title} - Bible Strong App. Cette étude a été rédigée par ${user.displayName}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:updated_time" content={modified_at.toString()} />

        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:type" content="image/jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta property="og:image" content={whatsappImageUrl} />
        <meta property="og:image:type" content="image/jpg" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="400" />
      </Head>
      <Box margin="0 auto" maxWidth={700} px={5} py={[8, 20]}>
        <Heading as="h1" size="2xl" lineHeight="shorter" mb={[10, 16]}>
          {title}{' '}
        </Heading>
        <StudyContainer dangerouslySetInnerHTML={{ __html: html }} />
        {!!annexe.length && (
          <>
            <Divider my={10} className="references-divider" />
            <Box>
              <Text fontSize="xl" mb={8}>
                Références
              </Text>
              <>
                <InlineModals annexe={annexe} />
                <Annexe annexe={annexe} />{' '}
              </>
            </Box>
          </>
        )}
        <Divider my={10} />
        <Flex alignItems="center" justifyContent="center" direction="column">
          <Text fontSize="xs" color="grey">
            Étude rédigée par {user.displayName} avec{' '}
            <Box
              as={Logo as ElementType<ReactNode>}
              ml={1}
              d="inline-block"
              width={100}
              height={6}
            />
          </Text>
          <Link
            mt={1}
            fontSize="xs"
            color="primary"
            href="https://bible-strong.app"
          >
            bible-strong.app
          </Link>
        </Flex>
      </Box>
    </>
  )
}

export default Study
