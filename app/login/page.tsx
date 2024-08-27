'use client';

import { Box, Center, Image, Text } from '@chakra-ui/react';
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import { firebase_app } from '@/lib/firebase-app';
import './page.scss';

function connectWithGoogle() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(firebase_app);
    signInWithPopup(auth, provider)
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.error(error);
        });
}

function connectWithFacebook() {
    const provider = new FacebookAuthProvider();
    const auth = getAuth(firebase_app);
    signInWithPopup(auth, provider)
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.error(error);
        });
}

export default function LoginPage() {
    return (
        <main>
            <Center h="100vh" flexDir='column'>
                <Image src='/images/logo-full.svg' w="500px" h="auto" />
                <Text mt="l">Connectez-vous</Text>
                <section id="oauth-div">
                    <button id="google-button" onClick={connectWithGoogle}>Google</button>
                    <button id="facebook-button" onClick={connectWithFacebook}>Facebook</button>
                </section>
            </Center>
        </main>
    )
}
