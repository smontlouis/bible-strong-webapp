'use client';

import { Box, Center, Image, Text } from '@chakra-ui/react';
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

import { firebase_app } from '@/lib/firebase-app';
import './page.scss';

function connectWithGoogle(router: AppRouterInstance) {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(firebase_app);
    signInWithPopup(auth, provider)
        .then((result) => {
            router.push('/app')
        })
        .catch((error) => {
            console.error(error);
        });
}

function connectWithFacebook(router: AppRouterInstance) {
    const provider = new FacebookAuthProvider();
    const auth = getAuth(firebase_app);
    signInWithPopup(auth, provider)
        .then((result) => {
            router.push('/app')
        })
        .catch((error) => {
            console.error(error);
        });
}

export default function LoginPage() {
    const router = useRouter()

    return (
        <main>
            <Center h="100vh" flexDir='column'>
                <Image src='/images/logo-full.svg' w="500px" h="auto" />
                <Text mt="l">Connectez-vous</Text>
                <section id="oauth-div">
                    <button id="google-button" onClick={() => connectWithGoogle(router)}>Google</button>
                    <button id="facebook-button" onClick={() => connectWithFacebook(router)}>Facebook</button>
                </section>
            </Center>
        </main>
    )
}
