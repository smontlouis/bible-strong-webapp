import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import {
  FaChevronDown,
  FaPause,
  FaPlay,
  FaStepBackward,
  FaStepForward,
} from 'react-icons/fa'
import { audioContent } from '../../helpers/audioContent'

export interface BibleAudioFooterProps {
  isPlaying: boolean
  onPlay: () => void
  goToNext: () => void
  goToPrev: () => void
  canGoNext: boolean
  canGoPrev: boolean
}

const getGroupTitle = (version: string) => {
  switch (version) {
    case 'esv': {
      return 'English'
    }
    case 'frc97': {
      return 'Français'
    }
    case 'cloned': {
      return 'Pastors'
    }
  }
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
  const { slug } = router.query
  const [version, person] = (slug as string[]) || []

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      mt={6}
      pos="sticky"
      bottom="6"
      background="white"
      borderWidth={1}
      borderColor="gray.200"
      borderRadius="2xl"
      paddingY="6"
      paddingX="4"
      gap="4"
      flexDir={{ base: 'column', md: 'row' }}
    >
      <Box flex={1} />
      <HStack flex={1} alignItems="center" justifyContent="center">
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
      <Box flex={1}>
        <Menu placement="top" autoSelect={false}>
          <MenuButton
            as={Button}
            colorScheme="blue"
            rightIcon={<FaChevronDown />}
            variant="ghost"
            leftIcon={
              <Avatar
                size="sm"
                src={`/images/people/${person}.${
                  version === 'cloned' ? 'jpg' : 'svg'
                }`}
                backgroundColor="gray.100"
              />
            }
          >
            {person}
          </MenuButton>
          <MenuList minWidth="240px" maxH={400} overflow="auto">
            {audioContent.map((v) => (
              <MenuGroup
                key={v.version}
                defaultValue={v.version}
                title={getGroupTitle(v.version)}
                borderBottomWidth={1}
                borderBottomColor="gray.100"
                paddingY="2"
                textTransform="uppercase"
                color="gray.500"
              >
                {v.people.map((p) => (
                  <MenuItem
                    key={p.name}
                    value={p.name}
                    icon={
                      <Avatar
                        size="md"
                        src={`/images/people/${p.name}.${
                          v.version === 'cloned' ? 'jpg' : 'svg'
                        }`}
                        backgroundColor="gray.100"
                      />
                    }
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
    </Flex>
  )
}

export default BibleAudioFooter
