'use client';

import React, { useEffect } from 'react';
import * as Auth from 'firebase/auth';
import * as firestore from 'firebase/firestore';
import { firebase_app } from '@/lib/firebase-app';
import styles from './studies.module.scss';

type Study = {
    id: string;
    title: string;
    modified_at: number;
    created_at: number;
    user: {
        id: string;
        displayName: string;
        photoUrl: string;
    },
    content: {
        ops: any[];
    }
};

async function query_studies(user: Auth.User, setStudies: React.Dispatch<React.SetStateAction<Study[]>>) {
    const db = firestore.getFirestore(firebase_app);
    const query = firestore.query(firestore.collection(db, 'studies'), firestore.where('user.id', '==', user.uid));
    const snapshot = await firestore.getDocs(query);
    let buffer: Study[] = [];
    snapshot.forEach((doc) => {
        const object_study = doc.data() as Study;
        buffer.push(object_study);
    });

    setStudies(buffer);
}

type Props = {
    user: Auth.User;
}

const StudiesExplorer = ({ user }: Props) => {
    const [studies, setStudies] = React.useState<Study[]>([]);

    useEffect(() => {
        query_studies(user, setStudies);
    }, []);

    return (
        <>
            <header className='index-nav'>
                <h2>Studies</h2>
            </header>
            <section className='study-explorer'>
                {studies.map((study) => (
                    <article key={study.id} className='study-card'>
                        <h3>{study.title}</h3>
                        <p>{study.content.ops[0].insert}</p>
                    </article>
                ))}
            </section>
        </>
    );
};

export default StudiesExplorer;
