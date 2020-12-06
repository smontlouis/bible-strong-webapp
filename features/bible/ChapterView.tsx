import { GenericVerse, Verse } from '../../common/types'
import { keyframes, Text, Center } from '@chakra-ui/react'
import { useInView } from 'react-intersection-observer'
import books from './books'
import React, { useEffect } from 'react'

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
  defaultReference?: GenericVerse
}

const ChapterView = ({
  hasNewBook,
  verses,
  onChange,
  defaultReference,
}: Props) => {
  const book = verses[0].book
  const chapter = verses[0].chapter
  const bookName = books[book - 1].Nom
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
    <div
      ref={ref}
      id={`bible-${book}-${chapter}`}
      style={{ animation: `${fade} 0.5s ease` }}
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
                dangerouslySetInnerHTML={{
                  __html: verse.content.replace(/\n/g, '<br />'),
                }}
              />
            </Text>
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default ChapterView
