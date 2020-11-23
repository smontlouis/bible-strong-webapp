import { useAuth } from './AuthProvider'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const withAuth = <P,>(Component: React.ComponentType<P>) => (props: P) => {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/login')
    }
  }, [isLoading, user?.id])

  if (user) {
    return <Component {...props} />
  }

  return null
}

export default withAuth
