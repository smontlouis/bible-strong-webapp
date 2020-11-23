import {
  useState,
  useEffect,
  useContext,
  createContext,
  PropsWithChildren,
} from 'react'
import { User } from '../../common/types'
import { auth, firestore } from '../../lib/firebase-app'

interface AuthProps {
  isLoading: boolean
  user: User | undefined
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
  const [user, setUser] = useState<User | undefined>()
  const [isLoading, setIsLoading] = useState(true)

  const signout = async () => {
    await auth.signOut()
    setUser(undefined)
  }

  const sendPasswordResetEmail = async (email: string) => {
    await auth.sendPasswordResetEmail(email)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        const firestoreUser = await firestore
          .collection('users')
          .doc(authUser.uid)
          .get()
        const user = firestoreUser.data() as User
        setUser(user)
      } else {
        setUser(undefined)
      }

      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return {
    isLoading,
    user,
    signout,
    sendPasswordResetEmail,
  }
}

export default AuthProvider
