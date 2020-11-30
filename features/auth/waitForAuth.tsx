import { useAuth } from './AuthProvider'

const waitForAuth = <P,>(Component: React.ComponentType<P>) => (props: P) => {
  const { isLoading } = useAuth()

  if (isLoading) {
    return <div>LOADING...</div>
  }

  return <Component {...props} />
}

export default waitForAuth
