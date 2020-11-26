import { Box, Tooltip, Text, Center } from '@chakra-ui/react'
import React from 'react'
import { absoluteFill } from '../../helpers/box'
import { Version } from './bible.utils'

interface Props {
  version: Version
  color: string
  focused: boolean
  onPress: (version: Version) => void
  isSelected: boolean
}

const VersionItem = ({
  version,
  color,
  focused,
  onPress,
  isSelected,
}: Props) => {
  return (
    <Box
      pos="relative"
      _after={{
        content: "''",
        display: 'block',
        paddingBottom: '100%',
      }}
      borderRadius="m"
      _focus={{ outline: 'none' }}
      transition="0.2s ease"
      onClick={() => onPress(version)}
      // @ts-ignore
      as="button"
      autoFocus={focused}
      bg={isSelected ? color : 'rgba(255, 255, 255)'}
      _hover={{
        backgroundColor: color,
      }}
      _active={{
        transform: 'scale(0.95)',
      }}
      role="group"
    >
      <Tooltip
        bg="white"
        borderRadius="5px"
        hasArrow
        label={
          <Center p="m" flexDir="column" textAlign="center">
            <Text size="s" color="black">
              {version.name}
            </Text>
            <Text mt="xs" size="s" color="grey">
              {version.c}
            </Text>
          </Center>
        }
        aria-label="A tooltip"
      >
        <Box
          d="flex"
          alignItems="center"
          justifyContent="center"
          {...(absoluteFill as any)}
          borderRadius="l"
          sx={{
            p: 's',
          }}
        >
          <Box
            fontFamily="normal"
            fontWeight="bold"
            textTransform="uppercase"
            color={isSelected ? 'rgba(255, 255, 255)' : color}
            transition="0.2s ease"
            _groupHover={{
              color: 'rgba(255, 255, 255)',
            }}
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {version.id}
          </Box>
        </Box>
      </Tooltip>
    </Box>
  )
}

export default VersionItem
