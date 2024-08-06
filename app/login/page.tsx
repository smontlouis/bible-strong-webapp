'use client';

import { useEffect } from 'react';
import { Box, Center, Image, Text } from '@chakra-ui/react';

import LoginWidget from '@/features/auth/LoginWidget';
import { firebaseapp, ui_config } from '@/lib/firebase-app';

export default function LoginPage() {
    return (
        <main>
            <Center h="100vh" flexDir='column'>
                <Image src='/images/logo-full.svg' w="500px" h="auto" />
                <Text mt="l">Connectez-vous</Text>
                <Box minW={300} mt="s">
                    <LoginWidget client={firebaseapp} config={ui_config} />
                </Box>
            </Center>
        </main>
    )
}
