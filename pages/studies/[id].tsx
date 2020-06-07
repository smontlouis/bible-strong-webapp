import { GetStaticProps, GetStaticPaths } from 'next'
import { Box, Heading, Text, Divider, Flex } from '@chakra-ui/core'

import {
  getStaticStudyProps,
  getStaticStudyPaths,
  FirebaseStudy,
  Annexe as AnnexeProps,
} from '../../helpers/study'
import styled from '../../styled'
import Annexe from '../../features/studies/Annexe'
import { useEffect } from 'react'
import InlineModals from '../../features/studies/InlineModals'

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const idParam = params.id as string
  const result = await getStaticStudyProps(idParam)

  return {
    props: {
      ...result,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getStaticStudyPaths()
  return {
    paths,
    fallback: false,
  }
}

const StudyContainer = styled.div(
  ({ theme: { media, fonts, fontSizes, space, colors } }) => ({
    fontSize: 16,
    fontFamily: fonts.body,
    counterReset: 'inline-counter',

    [media.md]: {
      fontSize: 21,
    },

    h2: {
      fontSize: fontSizes['3xl'],
    },

    'ul, ol': {
      padding: space[10],
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
      '&__container': {
        flex: 1,
      },
      '&__title': {
        display: 'inline-block',
      },
      '&__phonetique': { display: 'inline-block', fontSize: fontSizes.md },
      '&__original': { fontSize: fontSizes['3xl'], color: colors.primary },
      '&__definition': {
        flex: 2,
        fontSize: fontSizes.md,
        ol: {
          padding: 0,
        },
      },
    },

    '.block-verse': {
      textAlign: 'center',
      marginTop: space[8],
      padding: space[10],

      [media.md]: {
        marginTop: space[10],
        padding: space[16],
      },

      position: 'relative',

      '&::after': {
        content: '""',
        top: 20,
        [media.md]: {
          top: 40,
        },

        left: '50%',
        transform: 'translateX(-50%)',
        position: 'absolute',
        height: 4,
        borderRadius: 20,
        backgroundColor: colors.primary,
        width: '80px',
      },

      '&::before': {
        position: 'absolute',
        content: "'“'",
        top: 30,
        left: 30,
        fontSize: 200,
        color: 'rgba(0,0,0,0.05)',
        lineHeight: 0.8,
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
}

const Study = ({ title, html, annexe = [], content }: Props) => {
  return (
    <Box margin="0 auto" maxWidth={700} px={5} py={20}>
      <Heading as="h1" size="2xl" lineHeight="shorter" mb={[10, 16]}>
        {title}{' '}
      </Heading>
      <StudyContainer dangerouslySetInnerHTML={{ __html: html }} />
      <Divider my={10} />
      <Box>
        <Text fontSize="xl" mb={8}>
          Références
        </Text>
        {annexe.length && (
          <>
            <InlineModals annexe={annexe} />
            <Annexe annexe={annexe} />{' '}
          </>
        )}
      </Box>
    </Box>
  )
}

export default Study
