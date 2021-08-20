import { VerseBase, Verse } from '../../common/types'
import { keyframes, Text, Center, Box } from '@chakra-ui/react'
import { useInView } from 'react-intersection-observer'
import books from './books'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const fade = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

interface Props {
  verses: Verse[]
  hasNewBook?: boolean
  onChange: ({ book, chapter }: { book: number; chapter: number }) => void
  defaultReference?: VerseBase
}

const ChapterView = ({
  hasNewBook,
  verses,
  onChange,
  defaultReference,
}: Props) => {
  const { t } = useTranslation()
  const book = verses[0].book
  const chapter = verses[0].chapter
  const bookName = t(books[book - 1].Nom)
  const { ref, inView } = useInView({
    threshold: 0,
    root: document.getElementById('div'),
    rootMargin: '-35%',
  })

  useEffect(() => {
    if (inView) {
      onChange({ book, chapter })
    }
  }, [inView])
  return (
    <Box
      ref={ref}
      id={`bible-${book}-${chapter}`}
      sx={{ animation: `${fade} 0.5s ease`, maxW: 600, margin: '0 auto' }}
    >
      {verses.map((verse, i) => {
        return (
          <React.Fragment key={verse.id}>
            {hasNewBook && i === 0 && (
              <Center
                my="2xl"
                sx={{ breakBefore: 'column', breakAfter: 'column' }}
              >
                <Text variant="bold" size="3xl">
                  {bookName}
                </Text>
              </Center>
            )}
            {i === 0 && (
              <Text variant="bold" size="2xl" my="l">
                Chapitre {chapter}
              </Text>
            )}
            <Text
              key={verse.id}
              as="span"
              id={`bible-${book}-${chapter}-${verse.verse}`}
              {...(defaultReference?.verse === verse.verse && {
                bg: 'grey',
              })}
            >
              <Text mx="xs" as="span" variant="bold">
                {verse.verse}.
              </Text>
              <Text
                fontFamily="text"
                lineHeight={1.8}
                as="span"
                whiteSpace="pre-wrap"
                dangerouslySetInnerHTML={{
                  __html: verse.content,
                }}
              />
            </Text>
          </React.Fragment>
        )
      })}
    </Box>
  )
}

export default ChapterView
