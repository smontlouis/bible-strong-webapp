import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import config from '../config'

export const app = initializeApp(config.firebase);
export const firestore = getFirestore(app)

// const auth = getAuth(app)

// export const uiConfig = {
//     signInSuccessUrl: 'browser',
//     signInOptions: [
//         firebase.auth.EmailAuthProvider.PROVIDER_ID,
//         firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//         firebase.auth.FacebookAuthProvider.PROVIDER_ID,
//         'apple.com',
//     ],

//     tosUrl: '<your-tos-url>',
//     privacyPolicyUrl: '<your-privacy-policy-url>',
// }
