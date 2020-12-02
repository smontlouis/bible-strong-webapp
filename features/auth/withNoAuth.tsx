import { useAuth } from './AuthProvider'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Loading from '../../common/Loading'

const withNoAuth = <P,>(Component: React.ComponentType<P>) => (props: P) => {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && user) {
      router.replace('/home')
    }
  }, [isLoading, user?.id])

  if (!user) {
    return <Component {...props} />
  }

  return <Loading />
}

export default withNoAuth
