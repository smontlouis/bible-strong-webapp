import { Box, BoxProps, Flex, Text, useToast } from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'
import MotionBox from '../../common/MotionBox'
import PreviousButton from '../../common/PreviousButton'
import { QuillVerseBlockProps, Version } from '../../common/types'
import { firestore } from '../../lib/firebase-app'
import { getReference, versions } from './bible.utils'
import BookItem from './BookItem'
import books from './books'
import NumberItem from './NumberItem'
import VerseNumberSelector from './VerseNumberSelector'
import VersionItem from './VersionItem'

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 350 : -350,
    }
  },
  center: {
    x: 0,
  },
  exit: (direction: number) => {
    return {
      x: direction < 0 ? 350 : -350,
    }
  },
}

const Slider = ({ direction, ...props }: { direction: number } & BoxProps) => {
  return (
    <MotionBox
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      // @ts-ignore
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      sx={{
        p: 'l',
        pos: 'absolute',
        top: 0,
        left: 0,
        right: 0,
      }}
      {...props}
    />
  )
}

const VerseSearch = ({
  onSelect,
  onClose,
}: {
  onSelect: ({ title, verses, version, content }: QuillVerseBlockProps) => void
  onClose: () => void
}) => {
  const [[page, direction], setPage] = useState([0, 0])
  const [selectedBook, setSelectedBook] = useState<number>()
  const [selectedChapter, setSelectedChapter] = useState<number>()
  const [selectedVerses, setSelectedVerses] = useState<number[]>([])
  const [selectedVersion, setSelectedVersion] = useState<Version>()
  const toast = useToast()

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection])
  }

  return (
    <MotionBox
      initial="exit"
      animate="enter"
      exit="exit"
      transition={{ duration: 0.2, ease: 'easeOut' }}
      variants={{ enter: { y: 0, opacity: 1 }, exit: { y: -10, opacity: 0 } }}
      ml="xl"
      flex={1}
      maxW={350}
      minW={350}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          onClose()
        }
      }}
      tabIndex={0}
      _focus={{
        outline: 0,
      }}
    >
      <Box
        position="sticky"
        top={0}
        display="flex"
        flexDir="column"
        bg="white"
        borderRadius="xl"
        height="70vh"
        overflowY="auto"
        overflowX="hidden"
        borderColor="lightGrey"
        borderWidth={1}
        boxShadow=" #5983f033 1px 15px 13px -6px"
      >
        <AnimatePresence initial={false} custom={direction}>
          {page === 0 && (
            <Slider
              key={0}
              direction={direction}
              d="grid"
              gridTemplateColumns="repeat(4, 1fr)"
              gridGap="s"
              alignContent="start"
            >
              <Flex
                gridColumn="-1/1"
                alignItems="center"
                position="sticky"
                top="24px"
                zIndex={2}
              >
                <Text ml="m" flex={1}>
                  Version
                </Text>
              </Flex>
              {versions.map((version, i) => (
                <VersionItem
                  key={i}
                  isSelected={selectedVersion?.id === version.id}
                  focused={i === 0}
                  version={version}
                  color={`rgb(${75 + i * 3}, 132, 227)`}
                  onPress={(versionId) => {
                    setSelectedVersion(versionId)
                    paginate(1)
                  }}
                />
              ))}
            </Slider>
          )}
          {page === 1 && (
            <Slider
              key={1}
              direction={direction}
              d="grid"
              gridTemplateColumns="repeat(4, 1fr)"
              gridGap="s"
              alignContent="start"
            >
              <Flex
                gridColumn="-1/1"
                alignItems="center"
                position="sticky"
                top="24px"
                zIndex={2}
              >
                <PreviousButton onClick={() => paginate(-1)} />
                <Text ml="m" flex={1}>
                  Livre
                </Text>
              </Flex>
              {books.map((book, i) => (
                <BookItem
                  key={i}
                  isSelected={selectedBook === i + 1}
                  focused={i === 0}
                  book={book}
                  color={`rgb(${75 + i * 3}, 132, 227)`}
                  onPress={(bookNumber) => {
                    setSelectedBook(bookNumber)
                    setSelectedChapter(undefined)
                    setSelectedVerses([])
                    paginate(1)
                  }}
                />
              ))}
            </Slider>
          )}
          {page === 2 && (
            <Slider
              key={2}
              direction={direction}
              d="grid"
              gridTemplateColumns="repeat(5, 1fr)"
              gridGap="m"
              alignContent="start"
            >
              <Flex
                gridColumn="-1/1"
                alignItems="center"
                position="sticky"
                top="24px"
                zIndex={2}
              >
                <PreviousButton onClick={() => paginate(-1)} />
                <Text ml="m" flex={1}>
                  Chapitre
                </Text>
              </Flex>
              {Array.from(
                Array(books[(selectedBook || 0) - 1].Chapitres),
                (_, i) => (
                  <NumberItem
                    key={i}
                    isSelected={selectedChapter === i + 1}
                    focused={i === 0}
                    color={`rgb(${75 + i * 3}, 132, 227)`}
                    onPress={(chapterNumber) => {
                      setSelectedChapter(chapterNumber)
                      setSelectedVerses([])
                      paginate(1)
                    }}
                    number={i + 1}
                  />
                )
              )}
            </Slider>
          )}
          {page === 3 && (
            <Slider
              key={3}
              direction={direction}
              d="grid"
              gridTemplateColumns="repeat(5, 1fr)"
              gridGap="m"
              alignContent="start"
            >
              <VerseNumberSelector
                bookNumber={selectedBook}
                chapterNumber={selectedChapter}
                onPrevious={() => paginate(-1)}
                selectedVerses={selectedVerses}
                onSelect={(verseNumber) => {
                  if (selectedVerses?.find((v) => v === verseNumber)) {
                    setSelectedVerses((s) =>
                      s?.filter((v) => v !== verseNumber)
                    )
                  } else {
                    setSelectedVerses((s) => [...s, verseNumber])
                  }
                }}
                onValidate={async () => {
                  selectedVerses.sort((a, b) => (a < b ? -1 : 1))
                  const verses = selectedVerses.map(
                    (v) => `${selectedBook}-${selectedChapter}-${v}`
                  )
                  const title = getReference(verses)

                  const result = await Promise.all(
                    selectedVerses.map(async (verse) => {
                      const doc = await firestore
                        .collection(selectedVersion?.collection || '')
                        .doc(`${selectedBook}-${selectedChapter}-${verse}`)
                        .get()
                      return doc.exists ? doc.data() : undefined
                    })
                  )

                  const content = result.map((r) => r?.content).join(' ')

                  if (!content.trim()) {
                    toast({
                      title: 'Impossible de trouver ce verset.',
                      description: 'Essayer une autre version.',
                      status: 'error',
                    })
                    return
                  }

                  onSelect({
                    title,
                    verses,
                    version: selectedVersion?.id || '',
                    content,
                  })
                  onClose()
                }}
              />
            </Slider>
          )}
        </AnimatePresence>
      </Box>
    </MotionBox>
  )
}

export default VerseSearch
