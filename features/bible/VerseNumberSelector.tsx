import { PreviousButton } from './../../common/PreviousButton'
import { useDocument } from '@nandorojo/swr-firestore'
import React, { useState } from 'react'
import Loading from '../../common/Loading'
import Error from '../../common/Error'
import NumberItem from './NumberItem'
import { Box, Button, Flex, Text } from '@chakra-ui/react'

interface Props {
  bookNumber?: number
  chapterNumber?: number
  onPrevious: () => void
  onValidate: () => Promise<void>
  onSelect: (verseNumber: number) => void
  selectedVerses: number[]
}

const VerseNumberSelector = ({
  bookNumber,
  chapterNumber,
  onPrevious,
  onSelect,
  onValidate,
  selectedVerses,
}: Props) => {
  const collection = bookNumber
    ? bookNumber < 40
      ? 'lsgsat2'
      : 'lsgsnt2'
    : null
  const query =
    collection && chapterNumber
      ? `${collection}/${bookNumber}-${chapterNumber}`
      : null
  const { data, error, loading } = useDocument<{ count: number }>(query)
  const [isLoading, setIsLoading] = useState(false)

  if (error) {
    return <Error />
  }

  if (loading) {
    return (
      <Box gridColumn="span 5" height={200}>
        <Loading />
      </Box>
    )
  }

  return (
    <>
      <Flex
        gridColumn="-1/1"
        alignItems="center"
        position="sticky"
        top="24px"
        zIndex={2}
      >
        <PreviousButton onClick={onPrevious} />
        <Text ml="m" flex={1}>
          Versets
        </Text>
        <Button
          disabled={!selectedVerses.length}
          variant="success"
          size="xs"
          onClick={async () => {
            setIsLoading(true)
            await onValidate()
            setIsLoading(false)
          }}
          isLoading={isLoading}
        >
          Valider
        </Button>
      </Flex>
      {Array.from(Array(data?.count), (_, i) => (
        <NumberItem
          key={i}
          isSelected={!!selectedVerses.find((v) => v === i + 1)}
          focused={i === 0}
          color={`rgb(${75 + i * 3}, 132, 227)`}
          onPress={onSelect}
          number={i + 1}
        />
      ))}
    </>
  )
}

export default VerseNumberSelector
