import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebaseui/dist/firebaseui.css';

import config from '../config'

export const firebaseapp = firebase.apps.length ? firebase.app() : firebase.initializeApp(config.firebase);

// export const auth = firebase.auth()
// export const firestore = firebase.firestore()

export const ui_config = {
    signInSuccessUrl: 'browser',
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        'apple.com',
    ],

    tosUrl: '<your-tos-url>',
    privacyPolicyUrl: '<your-privacy-policy-url>',
}
