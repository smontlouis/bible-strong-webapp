import { Box, Center, Flex, Tooltip, Text } from '@chakra-ui/react'
import React from 'react'
import { BiExitFullscreen, BiFullscreen } from 'react-icons/bi'
import GoBackArrow from '../../common/GoBackArrow'
import Heading from '../../common/Heading'
import { Study } from '../../common/types'
import EditTagsForStudy from './EditTagsForStudy'

interface Props {
  id: string
  title: string
  onChangeTitle: (e: any) => void
  tags: Study['tags']
  fullscreen: boolean
  setFullscreen: (value: boolean) => void
}

const EditableHeader = ({
  id,
  title,
  onChangeTitle,
  tags,
  setFullscreen,
  fullscreen,
}: Props) => {
  return (
    <Flex alignItems="center">
      {!fullscreen && <GoBackArrow pos="relative" zIndex={1} mr="m" mb="m" />}
      {fullscreen ? (
        <Text size="3xl" py="s" px="m">
          {title}
        </Text>
      ) : (
        <Box pos="relative" zIndex={1} alignItems="center">
          <Heading
            size="3xl"
            as="input"
            defaultValue={title}
            onChange={onChangeTitle}
            bg="rgba(0,0,0,0.03)"
            py="s"
            px="m"
            borderRadius="m"
          />
          <Text mt="xs" color="grey" size="s">
            Éditer le titre en cliquant dessus.
          </Text>
        </Box>
      )}
      <EditTagsForStudy id={id} selectedTags={tags} />
      <Tooltip
        label="Plein écran"
        aria-aria-label="Plein écran"
        placement="right"
      >
        <Center role="button" onClick={() => setFullscreen(!fullscreen)}>
          <Box
            as={fullscreen ? BiExitFullscreen : BiFullscreen}
            color="primary"
            fontSize="26px"
            ml="m"
            mb="m"
          />
        </Center>
      </Tooltip>
    </Flex>
  )
}

export default EditableHeader