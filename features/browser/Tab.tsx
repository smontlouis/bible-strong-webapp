import React, { PropsWithChildren } from 'react'
import { Box, BoxProps, Center, IconButton, Text } from '@chakra-ui/react'
import { MdClose } from 'react-icons/md'
import { useTranslation } from 'react-i18next'
import { absoluteFill } from '../../helpers/box'
import { TabItem } from './browser.store'
import { FaFeather } from 'react-icons/fa'
import { HiHome } from 'react-icons/hi'
import LexiqueIcon from '../../common/LexiqueIcon'
import DictionnaryIcon from '../../common/DictionnaryIcon'
import NaveIcon from '../../common/NaveIcon'
import MotionBox from '../../common/MotionBox'
import BibleIcon from '../../common/BibleIcon'
import { Draggable } from 'react-beautiful-dnd'
import { useTab } from '../../helpers/tabs'
import { FiFile } from 'react-icons/fi'

const getColorType = (type: TabItem['type']) => {
  switch (type) {
    case 'bible':
      return 'primary'
    case 'dictionnary':
      return 'secondary'
    case 'edit-study':
      return 'grey'
    case 'empty':
      return 'primary'
    case 'home':
      return 'primary'
    case 'lexique':
      return 'primary'
    case 'nave':
      return 'quint'
    case 'studies':
      return 'grey'

    default:
      return 'primary'
  }
}

const TabIcon = ({
  type,
  isSelected,
  ...props
}: BoxProps & { isSelected: boolean; type: TabItem['type'] }) => {
  if (type === 'empty') {
    return (
      <Box
        as={FiFile}
        color={isSelected ? 'white' : getColorType(type)}
        fontSize="18px"
        {...props}
      />
    )
  }

  if (type === 'bible') {
    return (
      <Box
        as={BibleIcon}
        color={isSelected ? 'white' : getColorType(type)}
        size="22px"
        {...props}
      />
    )
  }

  if (type === 'lexique') {
    return (
      <Box
        as={LexiqueIcon}
        color={isSelected ? 'white' : getColorType(type)}
        size="18px"
        {...props}
      />
    )
  }

  if (type === 'dictionnary') {
    return (
      <Box
        as={DictionnaryIcon}
        color={isSelected ? 'white' : getColorType(type)}
        size="18px"
        {...props}
      />
    )
  }

  if (type === 'nave') {
    return (
      <Box
        as={NaveIcon}
        color={isSelected ? 'white' : getColorType(type)}
        size="18px"
        {...props}
      />
    )
  }

  if (type === 'home') {
    return (
      <Box
        as={HiHome}
        color={isSelected ? 'white' : getColorType(type)}
        size="22px"
        {...props}
      />
    )
  }

  if (type === 'studies' || type === 'edit-study') {
    return (
      <Box
        as={FaFeather}
        color={isSelected ? 'white' : getColorType(type)}
        size="16px"
        {...props}
      />
    )
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
        cursor="pointer"
        sx={{
          _hover: {
            bg: isSelected ? 'primary' : 'greys.3',
          },
          ...(!isSelected
            ? {}
            : {
                zIndex: 1,
              }),
        }}
        h="38px"
        w="38px"
        alignItems="center"
        borderRadius="s"
        _focus={{
          bg: 'white',
        }}
        bg={isSelected ? 'primary' : 'greys.2'}
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
          maxWidth="170px"
          width="100%"
          alignItems="center"
          borderRadius="s"
          title={children as string}
          sx={{
            _hover: {
              bg: isSelected ? getColorType(tabType) : 'greys.3',
            },
            ...provided.draggableProps.style,
          }}
          _focus={{
            bg: 'primary',
          }}
          bg={isSelected ? getColorType(tabType) : 'greys.2'}
          initial="exit"
          animate="enter"
          custom={isSelected}
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
            fontSize={16}
            variant="light"
            flex={1}
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
            color={isSelected ? 'white' : 'black'}
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
            icon={
              <MdClose color={isSelected ? 'white' : undefined} size="13px" />
            }
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
