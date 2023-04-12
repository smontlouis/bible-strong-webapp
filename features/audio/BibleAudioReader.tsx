import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import jsonData from './data.json'

type Word = {
  type: string
  start: number
  end: number
  startTime: number
  endTime: number
  value: string
}

const BibleAudioReader = () => {
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0)
  const [currentWordIndex, setCurrentWordIndex] = useState<number | null>(null)
  const player = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const textsRef = useRef(new Map<number, HTMLParagraphElement>())

  const onPlayButtonClick = async () => {
    if (isPlaying) {
      player.current?.pause()
      setIsPlaying(false)
    } else {
      if (!player.current) {
        const newPlayer = new Audio(
          `data:audio/ogg;base64,${jsonData[currentAudioIndex].audioStream}`
        )
        newPlayer.addEventListener('ended', onAudioEnded)
        newPlayer.addEventListener('timeupdate', onAudioTimeUpdate)
        player.current = newPlayer
      }
      player.current?.play()
      setIsPlaying(true)
    }
  }

  const onAudioEnded = () => {
    if (currentAudioIndex < jsonData.length - 1) {
      setCurrentAudioIndex((prevIndex) => prevIndex + 1)
      setCurrentWordIndex(null)
      setIsPlaying(false)

      if (player) {
        player.current?.removeEventListener('ended', onAudioEnded)
        player.current?.removeEventListener('timeupdate', onAudioTimeUpdate)
        player.current = null
      }
    }
  }

  const onAudioTimeUpdate = () => {
    if (!player.current) return

    const currentTime = player.current.currentTime * 1000 // Convert to milliseconds
    const wordPositions: Word[] =
      jsonData[currentAudioIndex].speechMarks.chunks[0].chunks

    for (let i = 0; i < wordPositions.length; i++) {
      if (
        currentTime >= wordPositions[i].startTime &&
        currentTime <= wordPositions[i].endTime
      ) {
        setCurrentWordIndex(i)
        break
      }
    }
  }

  const wordCoordinates = (() => {
    if (
      typeof window !== 'undefined' &&
      textsRef.current?.size > 0 &&
      currentWordIndex !== null
    ) {
      const textRef = textsRef.current.get(currentAudioIndex)
      const word =
        jsonData[currentAudioIndex].speechMarks.chunks[0].chunks[
          currentWordIndex
        ]

      console.log({ word, currentWordIndex, currentAudioIndex })

      const range = document.createRange()
      range.setStart(textRef?.firstChild as Node, word.start)
      range.setEnd(textRef?.firstChild as Node, word.end)

      const rects = range.getClientRects()
      const rect = rects[0]

      const containerRect = containerRef.current?.getBoundingClientRect()!

      return {
        x: rect.x - containerRect.x,
        y: rect.y - containerRect.y,
        width: rect.width,
        height: rect.height,
      }
    }

    return null
  })()

  return (
    <>
      <Flex justifyContent="center" mt={6} pos="fixed" bottom={0} zIndex="1000">
        <Button onClick={onPlayButtonClick} colorScheme="teal">
          {isPlaying ? 'Pause' : 'Play'}
        </Button>
      </Flex>
      <Box position="relative" ref={containerRef}>
        {jsonData.map((data, index) => (
          <Text
            key={index}
            fontSize="xl"
            my={4}
            opacity={index === currentAudioIndex ? 1 : 0.6}
            ref={(node) => {
              if (node) {
                textsRef.current.set(index, node)
              } else {
                textsRef.current.delete(index)
              }
            }}
          >
            {data.speechMarks.chunks[0].value}
          </Text>
        ))}
        <Box
          key="word-coordinate"
          position="absolute"
          style={{
            top: wordCoordinates?.y,
            left: wordCoordinates?.x,
            width: wordCoordinates?.width,
            height: wordCoordinates?.height,
            transitionProperty: 'left, width',
            transitionDuration: '0.05s',
            backgroundColor: 'rgb(119, 179, 253)',
            borderRadius: '3px',
            paddingBottom: '2px',
            opacity: '0.5',
            mixBlendMode: 'darken',
            pointerEvents: 'none',
          }}
        />
      </Box>
    </>
  )
}

export default BibleAudioReader
