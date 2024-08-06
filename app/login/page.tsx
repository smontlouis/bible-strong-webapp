'use client';

import { useEffect } from 'react';

import LoginWidget from '@/features/auth/LoginWidget';

import { firebaseapp, ui_config } from '../../lib/firebase-app';

export default function LoginPage() {
    return (
        <main>
            <LoginWidget client={firebaseapp} config={ui_config} />
        </main>
    )
}
