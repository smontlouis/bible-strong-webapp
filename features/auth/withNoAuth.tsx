import { useAuth } from './AuthProvider'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const withNoAuth = <P,>(Component: React.ComponentType<P>) => (props: P) => {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && user) {
      router.replace('/dashboard')
    }
  }, [isLoading, user?.id])

  if (!user) {
    return <Component {...props} />
  }

  return <div>LOADING...</div>
}

export default withNoAuth
