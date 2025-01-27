'use client';

import React from 'react';
import * as Auth from 'firebase/auth';
import { firebase_app } from '@/lib/firebase-app';
import { useRouter } from 'next/navigation';

import './page.scss';

import BibleExplorer from './BibleExplorer';
import StudiesExplorer from './StudiesExplorer';

const AppPage = () => {
    const router = useRouter();
    
    const [user, setUser] = React.useState<Auth.User | null>(null);

    React.useEffect(() => {
        const auth = Auth.getAuth(firebase_app);
        auth.onAuthStateChanged((user) => {
            if (!user) {
                router.push('/login');
                return;
            }
                

            setUser(user);
        });
    }, []);

    if (user) { // user is logged in
        return (
            <main id='navigator'>
                <section className='tab'>
                    <BibleExplorer user={user} />
                </section>
                <section className='tab'>
                    <StudiesExplorer user={user} />
                </section>
            </main>
        );
    }
    else { // loading
        return(
            <main id='loading-page'>
                <span className='loader'></span>
                <p>Loading...</p>
            </main>
        )
    }
};

export default AppPage;
