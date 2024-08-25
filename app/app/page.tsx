'use client'
import React, { useCallback, useEffect, useState } from 'react';
// import Browser from './browser';
import { collection, query, where, getDocs, getFirestore } from 'firebase/firestore';
import { firebaseapp } from '@/lib/firebase-app';

const AppPage = () => {
    const [chapter, setChapter] = useState<string>();

    const query_chapter = async () => {
        try {
            const db = getFirestore(firebaseapp);
            const q = query(collection(db, 'bible-neg79'), where('book', '==', 1), where('chapter', '==', 1));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                console.log(doc.id, ' => ', doc.data());
            });
        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        query_chapter();
    }, []);

    return (
        <main>
            {/* <Browser /> */}
            <p>{chapter}</p>
        </main>
    )
};

export default AppPage;
