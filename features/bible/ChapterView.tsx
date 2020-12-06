import { Verse } from '../../common/types'
import { keyframes, Text, Center } from '@chakra-ui/react'
import books from './books'
import React from 'react'

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
}

const ChapterView = ({ hasNewBook, verses }: Props) => {
  const bookName = books[verses[0].book - 1].Nom
  const chapter = verses[0].chapter
  return (
    <div style={{ animation: `${fade} 0.5s ease` }}>
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
            <React.Fragment key={verse.id}>
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
            </React.Fragment>
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default ChapterView
