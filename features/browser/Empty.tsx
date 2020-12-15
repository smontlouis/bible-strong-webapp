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

const Empty = ({ tabId }: { tabId: string }) => {
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
      templateColumns="repeat(auto-fit, 180px)"
      p="xl"
      justifyContent="center"
    >
      {entities.map((entity) => {
        const initialData = getInitialData(entity.type)
        return (
          <Center
            w="180px"
            flexDir="column"
            key={entity.type}
            onClick={() => updateEntity(tabId, initialData)}
            height="180px"
            borderRadius="l"
            cursor="pointer"
            transition="0.5s ease"
            _hover={{
              transform: 'scale(1.05)',
              boxShadow: 'rgba(89, 131, 240, 0.3) 1px 35px 20px -20px',
            }}
          >
            <Box
              as={entity.icon}
              width="90px"
              height="90px"
              color={entity.color}
              mb="l"
            />
            <Text color="black" variant="light">
              {entity.name}
            </Text>
          </Center>
        )
      })}
    </Grid>
  )
}

export default Empty
