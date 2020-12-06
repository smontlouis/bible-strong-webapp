import * as React from 'react'
import { useState } from 'react'
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
}

interface Chapter {
  key: string
  Chapter: () => JSX.Element
}

const useBibleChapters = ({ defaultReference }: Props) => {
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

  console.log(chapters)

  const { loading, data, error } = useCollection<Verse>(
    'bible-nbs',
    {
      where: [
        ['id', '>=', `${book}-${chapter}-`],
        ['id', '<', `${book}-${chapter}.`],
      ],
    },
    {
      onSuccess: (data) => {
        if (!data) return
        data.sort((a, b) => a.verse - b.verse)

        setChapters([
          {
            key: `${book}-${chapter}`,
            Chapter: () => (
              <ChapterView verses={data} hasNewBook={chapter === 1} />
            ),
          },
        ])
      },
    }
  )

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

    const snapshot = await firestore
      .collection('bible-nbs')
      .where('id', '>=', `${previousChapter.book}-${previousChapter.chapter}-`)
      .where('id', '<', `${previousChapter.book}-${previousChapter.chapter}.`)
      .get()

    const verses = snapshot.docs.map((x) => x.data()) as Verse[]

    callback?.()
    setPreviousChapterFetched(previousChapter)
    verses.sort((a, b) => a.verse - b.verse)

    setChapters((s) => [
      {
        key: `${previousChapter.book}-${previousChapter.chapter}`,
        Chapter: () => (
          <ChapterView
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

    const snapshot = await firestore
      .collection('bible-nbs')
      .where('id', '>=', `${nextChapter.book}-${nextChapter.chapter}-`)
      .where('id', '<', `${nextChapter.book}-${nextChapter.chapter}.`)
      .get()

    const verses = snapshot.docs.map((x) => x.data()) as Verse[]

    setNextChapterFetched(nextChapter)
    verses.sort((a, b) => a.verse - b.verse)

    setChapters((s) => [
      ...s,

      {
        key: `${nextChapter.book}-${nextChapter.chapter}`,
        Chapter: () => (
          <ChapterView verses={verses} hasNewBook={nextChapter.hasNewBook} />
        ),
      },
    ])
  }

  return {
    loading,
    data,
    error,
    hasMorePrevious: !!previousChapterFetched,
    hasMoreNext: !!nextChapterFetched,
    onFetchPrevious,
    onFetchNext,
    chapters,
  }
}

const BibleViewer = ({ defaultReference }: Props) => {
  const {
    loading,
    error,
    onFetchNext,
    onFetchPrevious,
    hasMorePrevious,
    hasMoreNext,
    chapters,
  } = useBibleChapters({ defaultReference })

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error />
  }

  return (
    <Box flex={1} pos="relative">
      <InfiniteReader
        scrollMode="horizontal"
        onFetchPrevious={onFetchPrevious}
        onFetchNext={onFetchNext}
        hasMorePrevious={hasMorePrevious}
        hasMoreNext={hasMoreNext}
        columnWidth={400}
        columnGap={40}
      >
        {chapters.map(({ key, Chapter }) => (
          <Chapter key={key} />
        ))}
      </InfiniteReader>
    </Box>
  )
}

export default BibleViewer
