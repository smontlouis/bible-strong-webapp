import {
  useState,
  useEffect,
  useContext,
  createContext,
  PropsWithChildren,
} from 'react'
import { auth } from '../../lib/firebase-app'
import firebase from 'firebase'

interface AuthProps {
  loadingUser: boolean
  user: any
  signout: () => Promise<void>
  sendPasswordResetEmail: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthProps>(undefined!)

const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const auth = useProvideAuth()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}

const useProvideAuth = (): AuthProps => {
  const [user, setUser] = useState<firebase.User>()
  const [loadingUser, setLoadingUser] = useState(true)

  const signout = async () => {
    await auth.signOut()
    setUser(undefined)
  }

  const sendPasswordResetEmail = async (email: string) => {
    await auth.sendPasswordResetEmail(email)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(undefined)
      }

      setLoadingUser(false)
    })

    return () => unsubscribe()
  }, [])

  return {
    loadingUser: loadingUser && !user,
    user,
    signout,
    sendPasswordResetEmail,
  }
}

export default AuthProvider
