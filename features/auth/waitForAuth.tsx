import React from 'react'
import Loading from '../../common/Loading'
import { useAuth } from './AuthProvider'

const waitForAuth = <P,>(Component: React.ComponentType<P>) => (props: P) => {
  const { isLoading } = useAuth()

  if (isLoading) {
    return <Loading />
  }

  return <Component {...props} />
}

export default waitForAuth
