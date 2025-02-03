'use client';

import React, { useEffect } from 'react';
import * as Auth from 'firebase/auth';
import * as firestore from 'firebase/firestore';
import { firebase_app } from '@/lib/firebase-app';
import styles from './studies.module.scss';
import StudyEditor from './StudyEditor';
import { FiArrowLeft } from "react-icons/fi";
import { Study } from '@/lib/types/bible';

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
    const [current, setCurrent] = React.useState<Study | null>(null);

    useEffect(() => {
        query_studies(user, setStudies);
    }, []);

    if (current) {
        return (
            <>
                <StudyEditor study={current} />
                <header className='index-nav'>
                    <section>
                        <button onClick={() => setCurrent(null)}><FiArrowLeft size={28} /></button>
                        <label>go back</label>
                    </section>
                    <section>
                        <h2>{ current.title }</h2>
                    </section>
                </header>
            </>
        );
    }
    else {
        return (
            <>
                <section className='study-explorer'>
                    {studies.map((study) => (
                        <article key={study.id} className='study-card' onClick={() => setCurrent(study)}>
                            <h3>{study.title}</h3>
                            <p>{study.content.ops[0].insert}</p>
                        </article>
                    ))}
                </section>
                <header className='index-nav'>
                    <h2>Studies</h2>
                </header>
            </>
        );
    }
    
};

export default StudiesExplorer;
