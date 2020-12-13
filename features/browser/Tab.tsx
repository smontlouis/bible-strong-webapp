import React from 'react'
import {
  Box,
  BoxProps,
  Flex,
  IconButton,
  TabProps,
  Text,
  useTab,
} from '@chakra-ui/react'
import { MdClose } from 'react-icons/md'
import { useTranslation } from 'react-i18next'
import { absoluteFill } from '../../helpers/box'
import { TabItem } from './browser.store'
import { FaCircle } from 'react-icons/fa'
import { FiBookOpen } from 'react-icons/fi'
import LexiqueIcon from '../../common/LexiqueIcon'
import DictionnaryIcon from '../../common/DictionnaryIcon'
import NaveIcon from '../../common/NaveIcon'

const TabIcon = ({
  type,
  isSelected,
  ...props
}: BoxProps & { isSelected: boolean; type: TabItem['type'] }) => {
  if (type === 'empty') {
    return <Box as={FaCircle} color="greys.2" fontSize="18px" {...props} />
  }

  if (type === 'bible') {
    return <Box as={FiBookOpen} color={'primary'} fontSize="18px" {...props} />
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

  return null
}

const Tab = React.forwardRef(
  (
    {
      tabType,
      ...props
    }: TabProps & { onClose: () => void; tabType: TabItem['type'] },
    ref
  ) => {
    const { t } = useTranslation()
    const tabProps = useTab(props)
    const isSelected = !!tabProps['aria-selected']
    const { children, onClose } = props

    return (
      <Flex
        h="38px"
        px="12px"
        py="10px"
        maxWidth="200px"
        width="100%"
        alignItems="center"
        borderTopRadius="8px"
        _hover={{
          bg: isSelected ? 'white' : 'greys.1',
        }}
        _focus={{
          bg: 'white',
          transition: 'none',
        }}
        bg={isSelected ? 'white' : 'gryes.0'}
        pos="relative"
      >
        <Box
          outline="none"
          {...absoluteFill}
          zIndex={1}
          {...tabProps}
          children={undefined}
        />
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
      </Flex>
    )
  }
)

export default Tab
