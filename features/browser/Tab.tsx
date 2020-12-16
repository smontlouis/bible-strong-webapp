import React, { PropsWithChildren } from 'react'
import { Box, BoxProps, Center, IconButton, Text } from '@chakra-ui/react'
import { MdClose } from 'react-icons/md'
import { useTranslation } from 'react-i18next'
import { absoluteFill } from '../../helpers/box'
import { TabItem } from './browser.store'
import { FaCircle, FaFeather } from 'react-icons/fa'
import { HiHome } from 'react-icons/hi'
import LexiqueIcon from '../../common/LexiqueIcon'
import DictionnaryIcon from '../../common/DictionnaryIcon'
import NaveIcon from '../../common/NaveIcon'
import MotionBox from '../../common/MotionBox'
import BibleIcon from '../../common/BibleIcon'
import { Draggable } from 'react-beautiful-dnd'
import { useTab } from '../../helpers/tabs'

const TabIcon = ({
  type,
  isSelected,
  ...props
}: BoxProps & { isSelected: boolean; type: TabItem['type'] }) => {
  if (type === 'empty') {
    return <Box as={FaCircle} color="greys.2" fontSize="18px" {...props} />
  }

  if (type === 'bible') {
    return <Box as={BibleIcon} color={'primary'} size="22px" {...props} />
  }

  if (type === 'lexique') {
    return <Box as={LexiqueIcon} color={'primary'} size="18px" {...props} />
  }

  if (type === 'dictionnary') {
    return (
      <Box as={DictionnaryIcon} color={'secondary'} size="18px" {...props} />
    )
  }

  if (type === 'nave') {
    return <Box as={NaveIcon} color={'quint'} size="18px" {...props} />
  }

  if (type === 'home') {
    return <Box as={HiHome} color={'primary'} size="22px" {...props} />
  }

  if (type === 'studies' || type === 'edit-study') {
    return <Box as={FaFeather} color={'primary'} size="16px" {...props} />
  }

  return null
}

interface Props {
  tabKey: string
  id: string
  index: number
  onClose: () => void
  tabType: TabItem['type']
}

const Tab = ({
  tabType,
  index,
  id,
  tabKey,
  onClose,
  children,
}: PropsWithChildren<Props>) => {
  const { t } = useTranslation()
  const { isActive: isSelected, onClick } = useTab(tabKey)

  if (tabType === 'home') {
    return (
      <Center
        pos="relative"
        sx={{
          _hover: {
            bg: isSelected ? 'white' : 'greys.1',
            '&:after': {
              display: 'none',
            },
          },
          ...(!isSelected
            ? {
                '&::after': {
                  bg: 'grey',
                  height: '18px',
                  width: '1px',
                  content: '""',
                  position: 'absolute',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  right: '-1px',
                },
              }
            : {
                zIndex: 1,
              }),
        }}
        h="38px"
        px="12px"
        alignItems="center"
        borderTopRadius="8px"
        _focus={{
          bg: 'white',
        }}
        bg={isSelected ? 'white' : 'greys.0'}
        outline="none"
        onClick={onClick}
      >
        <TabIcon isSelected={isSelected} type={tabType} />
      </Center>
    )
  }

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <MotionBox
          // @ts-ignore
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          pos="relative"
          key={id}
          d="flex"
          h="38px"
          px="12px"
          py="10px"
          maxWidth="200px"
          width="100%"
          alignItems="center"
          borderTopRadius="8px"
          sx={{
            _hover: {
              bg: isSelected ? 'white' : 'greys.1',
              '&:after': {
                display: 'none',
              },
            },
            ...(!isSelected
              ? {
                  '&::after': {
                    bg: 'grey',
                    height: '18px',
                    width: '1px',
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    right: '-1px',
                  },
                }
              : {
                  zIndex: 1,
                }),
            ...provided.draggableProps.style,
          }}
          _focus={{
            bg: 'white',
          }}
          bg={isSelected ? 'white' : 'greys.0'}
          initial="exit"
          animate="enter"
          exit="exit"
          transition={{ duration: 0.2, ease: 'easeOut' }}
          variants={{
            enter: {
              width: '200px',
              opacity: 1,
              paddingLeft: 12,
              paddingRight: 12,
            },
            exit: {
              width: 0,
              opacity: 0,
              paddingLeft: 0,
              paddingRight: 0,
            },
          }}
        >
          <Box outline="none" {...absoluteFill} zIndex={1} onClick={onClick} />
          <TabIcon mr="s" isSelected={isSelected} type={tabType} />
          <Text
            size="s"
            variant="light"
            flex={1}
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {children}
          </Text>
          <IconButton
            isRound
            p="1px"
            w="17px"
            h="17px"
            variant="naked"
            aria-label={t('browser.close-tab')}
            icon={<MdClose />}
            onClick={onClose}
            zIndex={2}
            pos="relative"
          />
        </MotionBox>
      )}
    </Draggable>
  )
}

export default Tab
