'use client';

import React, { useCallback, useEffect, useState } from 'react';
// import Browser from './browser';
import { collection, query, where, getDocs, getFirestore } from 'firebase/firestore';
import { firebase_app } from '@/lib/firebase-app';

import './page.scss';

type Verse = {
    id: string;
    book: number;
    chapter: number;
    verse: number;
    content: string;
};

function renderChapter(chapter: Verse[]) {
    return chapter.map((v, index) => <p key={index}>{v.content}</p>);
}

const AppPage = () => {
    const [chapter, setChapter] = useState<Verse[]>([]);

    const query_chapter = async () => {
        try {
            let verses: Verse[] = [];

            const db = getFirestore(firebase_app);
            const q = query(collection(db, 'bible-neg79'), where('book', '==', 1), where('chapter', '==', 1));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                verses.push(doc.data() as Verse);
            });

            setChapter(verses);
        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        query_chapter();
    }, [chapter]);

    return (
        <main>
            {/* <Browser /> */}
            <div>{renderChapter(chapter)}</div>
        </main>
    )
};

export default AppPage;
