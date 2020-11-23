import { Box, Center, Flex } from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'
import LogoFull from '../public/images/svg/logo-full.svg'
import { FiBookOpen, FiFeather, FiHome, FiSearch } from 'react-icons/fi'
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion'
import NavLink from './NavLink'
import { useRouter } from 'next/router'

const AppLayout = ({ children }: PropsWithChildren<{}>) => {
  const router = useRouter()
  return (
    <Flex bg="white" minH="100vh">
      <Box w={300} pt="2xl" px="xl">
        <Center>
          <Box as={LogoFull} width={200} height={60} />
        </Center>
        <AnimateSharedLayout>
          <Box mt="xl">
            <NavLink icon={FiHome} href="/dashboard">
              Accueil
            </NavLink>
            <NavLink icon={FiSearch}>Recherche</NavLink>
            <NavLink icon={FiBookOpen}>Bible</NavLink>
            <NavLink icon={FiFeather} href="/studies">
              Études
            </NavLink>
          </Box>
        </AnimateSharedLayout>
      </Box>
      <Box
        flex={1}
        bg="lightGrey"
        m="l"
        borderRadius="xl"
        p="2xl"
        d="flex"
        flexDir="column"
      >
        <AnimatePresence exitBeforeEnter>
          <Box key={router.pathname} flex={1}>
            {children}
          </Box>
        </AnimatePresence>
      </Box>
    </Flex>
  )
}

export default AppLayout
