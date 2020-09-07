import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import config from '../config'

try {
  firebase.initializeApp(config.firebase)
} catch (error) {
  if (!/already exists/u.test(error.message)) {
    console.error('Firebase admin initialization error', error.stack)
  }
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()

export const uiConfig = {
  signInSuccessUrl: 'app',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    'apple.com',
  ],

  tosUrl: '<your-tos-url>',
  privacyPolicyUrl: '<your-privacy-policy-url>',
}
