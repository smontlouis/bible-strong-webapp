'use client';

import React, { useCallback, useEffect, useState } from 'react';
// import Browser from './browser';
import { collection, query, where, getDocs, getFirestore } from 'firebase/firestore';
import { firebase_app } from '@/lib/firebase-app';

import './page.scss';

type Verse = { // firebase verse object
    id: string;
    book: number;
    chapter: number;
    verse: number;
    content: string;
};

type Index = { // where the user wants to navigates
    book: number;
    chapter: number;
    verse: number;
};

function renderChapter(chapter: Verse[]) {
    return chapter.map((v, index) => {
        return (
            <span key={index}>{v.verse}. {v.content}</span>
        )
    });
}

const AppPage = () => {
    const [index, setIndex] = useState<Index>({ book: 1, chapter: 1, verse: 1 }); // set default index
    const [chapter, setChapter] = useState<Verse[]>([]);

    const query_chapter = async () => {
        try {
            let verses: Verse[] = [];

            const db = getFirestore(firebase_app);
            const q = query(collection(db, 'bible-neg79'), where('book', '==', index.book), where('chapter', '==', index.chapter));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                verses.push(doc.data() as Verse);
            });

            setChapter(verses.sort((a, b) => a.verse - b.verse));
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
            <section>
                <p>{renderChapter(chapter)}</p>
            </section>
        </main>
    )
};

export default AppPage;
