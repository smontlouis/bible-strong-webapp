import { useEffect } from 'react'
import firebase from 'firebase/app'
import * as firebaseui from '../../lib/firebaseui_fr'
import { uiConfig } from '../../lib/firebase-app'

const Login = () => {
  useEffect(() => {
    const firebaseLoginUI =
      //@ts-ignore
      firebaseui.auth.AuthUI.getInstance() ||
      //@ts-ignore
      new firebaseui.auth.AuthUI(firebase.auth())
    firebaseLoginUI.start('#firebaseui-auth-container', uiConfig)
  }, [])
  return <div id="firebaseui-auth-container"></div>
}

export default Login
