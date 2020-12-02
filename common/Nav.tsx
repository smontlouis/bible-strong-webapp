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
import React from 'react'
import LogoFull from '../public/images/svg/logo-full.svg'
import { FiBookOpen, FiFeather, FiHome } from 'react-icons/fi'
import { AnimateSharedLayout } from 'framer-motion'
import NavLink from './NavLink'
import { useAuth } from '../features/auth/AuthProvider'
import { BiChevronDown } from 'react-icons/bi'
import LexiqueIcon from './LexiqueIcon'
import NaveIcon from './NaveIcon'
import DictionnaryIcon from './DictionnaryIcon'
import NextLink from 'next/link'

export const Nav = () => {
  const { user, signout } = useAuth()
  return (
    <Box px="l" pt="2xl" pb="l" height="100%" d="flex" flexDir="column">
      <NextLink href="/dashboard">
        <a>
          <Box as={LogoFull} width="200px" height="60px" />
        </a>
      </NextLink>

      <AnimateSharedLayout>
        <Box mt="xl">
          <NavLink icon={FiHome} href="/dashboard">
            Accueil
          </NavLink>
          <NavLink icon={FiFeather} href="/studies">
            Études
          </NavLink>
          <NavLink icon={FiBookOpen}>Bible</NavLink>
          <NavLink icon={LexiqueIcon}>Lexique</NavLink>
          <NavLink icon={DictionnaryIcon}>Dictionnaire</NavLink>
          <NavLink icon={NaveIcon}>Nave</NavLink>
        </Box>
        {user && (
          <Menu isLazy>
            <MenuButton mt="auto">
              <Flex p="m" alignItems="center">
                <Avatar name={user.displayName} src={user.photoURL} mr="m" />
                <Text size="s">{user.displayName}</Text>
                <Box ml="m" as={BiChevronDown} fontSize={20} />
              </Flex>
            </MenuButton>
            <Portal>
              <MenuList>
                <MenuItem onClick={signout}>Se déconnecter</MenuItem>
              </MenuList>
            </Portal>
          </Menu>
        )}
      </AnimateSharedLayout>
    </Box>
  )
}
