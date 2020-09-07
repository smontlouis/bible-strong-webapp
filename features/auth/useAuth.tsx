import { useState, useEffect, useContext, createContext } from 'react'
import { auth } from '../../lib/firebase-app'

interface AuthProps {
  loadingUser: boolean
  user: any
  signout: () => Promise<void>
  sendPasswordResetEmail: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthProps>(undefined!)

const AuthProvider = ({ children }) => {
  const auth = useProvideAuth()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}

const useProvideAuth = (): AuthProps => {
  const [user, setUser] = useState(null)
  const [loadingUser, setLoadingUser] = useState(true)

  const signout = async () => {
    await auth.signOut()
    setUser(false)
  }

  const sendPasswordResetEmail = async (email: string) => {
    await auth.sendPasswordResetEmail(email)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(false)
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
