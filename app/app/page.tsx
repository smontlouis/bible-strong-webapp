'use client';

import React from 'react';
import * as Auth from 'firebase/auth';
import { firebase_app } from '@/lib/firebase-app';
import { redirect } from 'next/navigation';

import './page.scss';

import BibleExplorer from './BibleExplorer';
import StudiesExplorer from './StudiesExplorer';

const AppPage = () => {
    const [user, setUser] = React.useState<Auth.User | null>(null);

    React.useEffect(() => {
        const auth = Auth.getAuth(firebase_app);
        auth.onAuthStateChanged((user) => {
            if (!user)
                return redirect('/login');

            setUser(user);
        });
    }, []);

    if (user) {
        return (
            <main id='navigator'>
                <section className='tab'>
                    <BibleExplorer />
                </section>
                <section className='tab'>
                    <StudiesExplorer />
                </section>
            </main>
        );
    }
    else {
        return(
            <main id='loader'>
                <h1>Loading...</h1>
            </main>
        )
    }
};

export default AppPage;
