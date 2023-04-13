import {
  Box,
  Button,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FaPause, FaPlay, FaStepBackward, FaStepForward } from 'react-icons/fa'
import { audioContent } from '../../helpers/audioContent'

export interface BibleAudioFooterProps {
  isPlaying: boolean
  onPlay: () => void
  goToNext: () => void
  goToPrev: () => void
  canGoNext: boolean
  canGoPrev: boolean
}

const BibleAudioFooter = ({
  isPlaying,
  onPlay,
  goToNext,
  goToPrev,
  canGoNext,
  canGoPrev,
}: BibleAudioFooterProps) => {
  const router = useRouter()

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      mt={6}
      pos="fixed"
      bottom={0}
      left={0}
      right={0}
      zIndex="1000"
      background="white"
      borderTopWidth={1}
      borderTopColor="gray.200"
      paddingY="6"
      gap="4"
    >
      <HStack alignItems="center" justifyContent="center">
        <IconButton
          onClick={() => goToPrev()}
          colorScheme="blue"
          aria-label="Previous"
          icon={<FaStepBackward />}
          variant="ghost"
          isDisabled={!canGoPrev}
        />
        <IconButton
          onClick={onPlay}
          colorScheme="blue"
          aria-label={isPlaying ? 'Pause' : 'Play'}
          icon={isPlaying ? <FaPause /> : <FaPlay />}
          isRound
        />
        <IconButton
          onClick={() => goToNext()}
          colorScheme="blue"
          aria-label="Next"
          icon={<FaStepForward />}
          variant="ghost"
          isDisabled={!canGoNext}
        />
      </HStack>
      <Menu>
        <MenuButton as={Button} colorScheme="blue">
          {router.query.slug?.[1]}
        </MenuButton>
        <MenuList minWidth="240px">
          {audioContent.map((v) => (
            <MenuGroup
              key={v.version}
              defaultValue={v.version}
              title={v.version}
            >
              {v.people.map((p) => (
                <MenuItem
                  key={p.name}
                  value={p.name}
                  onClick={() => router.push(`/audio/${v.version}/${p.name}`)}
                >
                  {p.name}
                </MenuItem>
              ))}
            </MenuGroup>
          ))}
        </MenuList>
      </Menu>
    </Box>
  )
}

export default BibleAudioFooter
