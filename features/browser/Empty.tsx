import useBrowserStore, {
  BibleTab,
  DictionnaryTab,
  EmptyTab,
  LexiqueTab,
  NaveTab,
  StudiesTab,
  TabItem,
} from './browser.store'
import { Box, Center, Grid, Text } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import LexiqueIcon from '../../common/LexiqueIcon'
import DictionnaryIcon from '../../common/DictionnaryIcon'
import NaveIcon from '../../common/NaveIcon'
import { IconType } from 'react-icons'
import { FaFeather } from 'react-icons/fa'
import BibleIcon from '../../common/BibleIcon'
import { BrowserModuleProps } from '../../common/types'

const getInitialData = (type: TabItem['type']): TabItem => {
  if (type === 'bible') {
    return {
      type: 'bible',
      name: 'browser.bible',
      data: {
        book: 1,
        chapter: 1,
        verse: 1,
      },
    } as BibleTab
  }

  if (type === 'studies') {
    return {
      type: 'studies',
      name: 'browser.studies',
      data: {},
    } as StudiesTab
  }

  if (type === 'lexique') {
    return {
      type: 'lexique',
      name: 'browser.lexique',
      data: {},
    } as LexiqueTab
  }

  if (type === 'nave') {
    return {
      type: 'nave',
      name: 'browser.nave',
      data: {},
    } as NaveTab
  }

  if (type === 'dictionnary') {
    return {
      type: 'dictionnary',
      name: 'browser.dictionnary',
      data: {},
    } as DictionnaryTab
  }

  return {
    type: 'empty',
    data: {},
  } as EmptyTab
}

const Empty = ({ tabId, layoutIndex }: BrowserModuleProps) => {
  const { t } = useTranslation()
  const { updateEntity } = useBrowserStore()

  const entities: {
    name: string
    type: TabItem['type']
    icon: IconType
    color: string
  }[] = useMemo(
    () => [
      {
        name: t('browser.bible'),
        type: 'bible',
        icon: BibleIcon,
        color: 'grey',
      },
      {
        name: t('browser.studies'),
        type: 'studies',
        icon: FaFeather,
        color: 'grey',
      },
      {
        name: t('browser.lexique'),
        type: 'lexique',
        icon: LexiqueIcon,
        color: 'primary',
      },
      {
        name: t('browser.dictionnary'),
        type: 'dictionnary',
        icon: DictionnaryIcon,
        color: 'secondary',
      },
      { name: t('browser.nave'), type: 'nave', icon: NaveIcon, color: 'quint' },
    ],
    []
  )

  return (
    <Grid
      gridGap="l"
      templateColumns="repeat(3, 100px)"
      p="xl"
      justifyContent="center"
      flex={1}
      placeItems="center"
      sx={{
        placeContent: 'center',
      }}
    >
      {entities.map((entity) => {
        const initialData = getInitialData(entity.type)
        return (
          <Center
            w="100px"
            h="100px"
            flexDir="column"
            key={entity.type}
            onClick={() => updateEntity(tabId, initialData, layoutIndex)}
            borderRadius="l"
            cursor="pointer"
            transition="0.5s ease"
            _hover={{}}
            bg={entity.color}
          >
            <Box
              as={entity.icon}
              width="30px"
              height="30px"
              color="white"
              mb="s"
            />
            <Text color="white" variant="bold" size="s">
              {entity.name}
            </Text>
          </Center>
        )
      })}
    </Grid>
  )
}

export default Empty
