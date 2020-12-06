import * as React from 'react'
import { useEffect, useState } from 'react'
import InfiniteReader from './InfiniteReader'
import { Box } from '@chakra-ui/react'
import { GenericVerse, Verse } from '../../common/types'
import Loading from '../../common/Loading'
import Error from '../../common/Error'
import { useCollection } from '@nandorojo/swr-firestore'
import { firestore } from '../../lib/firebase-app'
import { getNextChapter, getPreviousChapter } from './bible.utils'
import ChapterView from './ChapterView'
import StartOfBook from './StartOfBook'
import EndOfBook from './EndOfBook'

interface Props {
  defaultReference: GenericVerse
  onReferenceChange: ({
    book,
    chapter,
  }: {
    book: number
    chapter: number
  }) => void
  scrollMode: 'vertical' | 'horizontal'
}

interface Chapter {
  key: string
  Chapter: () => JSX.Element
}

const BibleViewer = ({
  defaultReference,
  onReferenceChange,
  scrollMode,
}: Props) => {
  const [chapters, setChapters] = useState<Chapter[]>([])

  const { book, chapter } = defaultReference
  const [previousChapterFetched, setPreviousChapterFetched] = useState<Omit<
    GenericVerse,
    'verse'
  > | null>({
    book,
    chapter,
  })
  const [nextChapterFetched, setNextChapterFetched] = useState<Omit<
    GenericVerse,
    'verse'
  > | null>({
    book,
    chapter,
  })

  // console.log(chapters)

  const { loading, data, error } = useCollection<Verse>('bible-nbs', {
    where: [
      ['id', '>=', `${book}-${chapter}-`],
      ['id', '<', `${book}-${chapter}.`],
    ],
  })

  const onFetchPrevious = async (callback?: () => void) => {
    const previousChapter = getPreviousChapter(previousChapterFetched)

    if (!previousChapter) {
      callback?.()
      setPreviousChapterFetched(previousChapter)
      setChapters((s) => [
        {
          key: `start-of-bible`,
          Chapter: () => <StartOfBook />,
        },
        ...s,
      ])

      return
    }

    setPreviousChapterFetched(previousChapter)
    const snapshot = await firestore
      .collection('bible-nbs')
      .where('id', '>=', `${previousChapter.book}-${previousChapter.chapter}-`)
      .where('id', '<', `${previousChapter.book}-${previousChapter.chapter}.`)
      .get()

    const verses = snapshot.docs.map((x) => x.data()) as Verse[]

    callback?.()
    verses.sort((a, b) => a.verse - b.verse)

    setChapters((s) => [
      {
        key: `${previousChapter.book}-${previousChapter.chapter}`,
        Chapter: () => (
          <ChapterView
            onChange={onReferenceChange}
            verses={verses}
            hasNewBook={previousChapter.hasNewBook}
          />
        ),
      },
      ...s,
    ])
  }

  const onFetchNext = async () => {
    const nextChapter = getNextChapter(nextChapterFetched)

    if (!nextChapter) {
      setNextChapterFetched(nextChapter)
      setChapters((s) => [
        ...s,
        {
          key: `end-of-bible`,
          Chapter: () => <EndOfBook />,
        },
      ])

      return
    }

    setNextChapterFetched(nextChapter)
    const snapshot = await firestore
      .collection('bible-nbs')
      .where('id', '>=', `${nextChapter.book}-${nextChapter.chapter}-`)
      .where('id', '<', `${nextChapter.book}-${nextChapter.chapter}.`)
      .get()

    const verses = snapshot.docs.map((x) => x.data()) as Verse[]

    verses.sort((a, b) => a.verse - b.verse)

    setChapters((s) => [
      ...s,

      {
        key: `${nextChapter.book}-${nextChapter.chapter}`,
        Chapter: () => (
          <ChapterView
            onChange={onReferenceChange}
            verses={verses}
            hasNewBook={nextChapter.hasNewBook}
          />
        ),
      },
    ])
  }

  const scrollToVerse = () => {
    const { book, chapter, verse } = defaultReference
    document
      .querySelector(`#bible-${book}-${chapter}-${verse}`)
      ?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (data) {
      data.sort((a, b) => a.verse - b.verse)

      setChapters([
        {
          key: `${book}-${chapter}`,
          Chapter: () => (
            <ChapterView
              onChange={onReferenceChange}
              verses={data}
              hasNewBook={chapter === 1}
              defaultReference={defaultReference}
            />
          ),
        },
      ])
    }
  }, [!!data])

  if (error) {
    return <Error />
  }

  if (loading || !data) {
    return <Loading />
  }

  return (
    <Box flex={1} d="flex">
      <Box
        pos="relative"
        flex={1}
        {...(scrollMode === 'vertical'
          ? {
              maxW: 700,
              margin: '0 auto',
            }
          : {})}
      >
        <InfiniteReader
          scrollMode={scrollMode}
          onFetchPrevious={onFetchPrevious}
          onFetchNext={onFetchNext}
          hasMorePrevious={!!previousChapterFetched}
          hasMoreNext={!!nextChapterFetched}
          columnWidth={400}
          columnGap={40}
          onRender={scrollToVerse}
        >
          {chapters.map(({ key, Chapter }) => (
            <Chapter key={key} />
          ))}
        </InfiniteReader>
      </Box>
    </Box>
  )
}

export default BibleViewer
