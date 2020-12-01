import { Box, Center, Text } from '@chakra-ui/react'
import LogoFull from '../public/images/svg/logo-full.svg'
import dynamic from 'next/dynamic'
import React from 'react'
import waitForAuth from '../features/auth/waitForAuth'
import withNoAuth from '../features/auth/withNoAuth'
import compose from '../helpers/compose'

const LoginWidget = dynamic(() => import('../features/auth/LoginWidget'), {
  ssr: false,
})

const Login = () => {
  return (
    <Center height="100vh" flexDir="column">
      <Box as={LogoFull} width="200px" height="60px" />
      <Text mt="l">Connectez-vous</Text>
      <Box minW={300} mt="s">
        <LoginWidget />
      </Box>
    </Center>
  )
}

export default compose(withNoAuth, waitForAuth)(Login)
