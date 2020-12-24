import React from 'react'
import { useAuth } from '../features/auth/AuthProvider'
import LogoFull from '../public/images/svg/logo-full.svg'
import {
  Avatar,
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Text,
} from '@chakra-ui/react'
import { BiChevronDown } from 'react-icons/bi'
import { useTranslation } from 'react-i18next'

const Header = () => {
  const { user, signout } = useAuth()
  const { t } = useTranslation()
  return (
    <Flex px="m" height="64px" alignItems="center">
      <Box as={LogoFull} width="150px" />
      <Box ml="auto">
        {user && (
          <Menu isLazy>
            <MenuButton mt="auto">
              <Flex p="m" alignItems="center">
                <Avatar
                  name={user.displayName}
                  src={user.photoURL}
                  mr="m"
                  size="sm"
                />
                <Text size="s">{user.displayName}</Text>
                <Box ml="m" as={BiChevronDown} fontSize={20} />
              </Flex>
            </MenuButton>
            <Portal>
              <MenuList>
                <MenuItem onClick={signout}>{t('logout')}</MenuItem>
              </MenuList>
            </Portal>
          </Menu>
        )}
      </Box>
    </Flex>
  )
}

export default Header
