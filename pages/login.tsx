import { Box } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import waitForAuth from '../features/auth/waitForAuth'
import withNoAuth from '../features/auth/withNoAuth'
import compose from '../helpers/compose'

const LoginWidget = dynamic(() => import('../features/auth/LoginWidget'), {
  ssr: false,
})

const Login = () => {
  return (
    <Box>
      <LoginWidget />
    </Box>
  )
}

export default compose(withNoAuth, waitForAuth)(Login)
