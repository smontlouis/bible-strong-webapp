import {
  useState,
  useEffect,
  useContext,
  createContext,
  PropsWithChildren,
  SetStateAction,
  Dispatch,
} from 'react'
import { User, UserRecord } from '../../common/types'
import { auth, firestore } from '../../lib/firebase-app'

interface AuthProps {
  isLoading: boolean
  user: User | undefined
  setUser: Dispatch<SetStateAction<User | undefined>>
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
        const userDoc = firestore.collection('users').doc(authUser.uid)

        let firestoreUser = await userDoc.get()
        let user = firestoreUser.data() as User

        const profile = {
          id: authUser.uid,
          email: authUser.email,
          ...(authUser?.providerData[0]?.displayName && {
            displayName: authUser.providerData[0].displayName,
          }),
          photoURL: authUser.providerData[0]?.photoURL,
          provider: authUser.providerData[0]?.providerId,
          lastSeen: Date.now(),
        }

        if (user) {
          console.log('acount update')
          await userDoc.update(profile)
        } else {
          console.log('acount set')
          await userDoc.set({ ...UserRecord, ...profile })
        }

        firestoreUser = await userDoc.get()
        user = firestoreUser.data() as User

        console.log(user)

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
    setUser,
    signout,
    sendPasswordResetEmail,
  }
}

export default AuthProvider
