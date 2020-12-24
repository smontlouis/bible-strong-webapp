import { Box, Center, Flex, Tooltip, Text } from '@chakra-ui/react'
import React from 'react'
import { BiExitFullscreen, BiFullscreen } from 'react-icons/bi'
import Heading from '../../common/Heading'
import { HistoryItem, Study } from '../../common/types'
import EditTagsForStudy from './EditTagsForStudy'
import History from './History'

interface Props {
  id: string
  title: string
  onChangeTitle: (e: any) => void
  tags: Study['tags']
  fullscreen: boolean
  setFullscreen: (value: boolean) => void
  history: Study['history']
  onRestoreVersion: (item: HistoryItem) => void
}

const EditableHeader = ({
  id,
  title,
  onChangeTitle,
  tags,
  setFullscreen,
  fullscreen,
  history,
  onRestoreVersion,
}: Props) => {
  return (
    <Flex
      alignItems="center"
      justifyContent={fullscreen ? 'center' : 'flex-start'}
    >
      {fullscreen ? (
        <Text size="2xl" py="s" px="m">
          {title}
        </Text>
      ) : (
        <Box pos="relative" zIndex={1} alignItems="center">
          <Heading
            size="2xl"
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
      <History onRestore={onRestoreVersion} history={history} />
      <Tooltip label="Plein écran" aria-label="Plein écran" placement="right">
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
