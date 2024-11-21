import React from 'react';
import ChapterVersesList from './ChapterVersesList';
import books_map from '@/lib/types/books.json';
import { getAuth, User } from 'firebase/auth';
import { firebase_app } from '@/lib/firebase-app';
import { redirect } from 'next/navigation';

import { collection, query, where, getDocs, getFirestore, Firestore } from 'firebase/firestore';
import { Note, Verse } from '@/lib/types/bible';

type Index = { // where the user wants to navigates
    book: number;
    chapter: number;
    verse: number;
};

type StyleSettings = {
    line_break: boolean;
};

function renderChaptersList(book: number) {
    const book_chapters = books_map.find(b => b.numero === book)?.chapters;
    
    if (book_chapters) {
        const list = [];

        for (let i = 1; i <= book_chapters; i++) {
            list.push(<option key={i} value={i}>{i}</option>);
        }

        return list;
    }

    return (<option value=''></option>);
}

function renderBooksList() {
    return books_map.map((book, index) => {
        return (
            <option key={index} value={book.numero}>{book.name}</option>
        )
    });
}

const BibleExplorer = () => {
    const [index, setIndex] = React.useState<Index>({ book: 1, chapter: 1, verse: 1 }); // set default index
    const [chapter, setChapter] = React.useState<Verse[]>([]);
    const [notes, setNotes] = React.useState<Note[]>([]);
    const [style, setStyle] = React.useState<StyleSettings>({ line_break: false });
    
    const outline_dialog = React.useRef<HTMLDialogElement>(null);

    React.useEffect(() => {
        const auth = getAuth(firebase_app);
        const user = auth.currentUser;
        if (!user) 
            return redirect('/login');

        query_chapter();
    }, [index]);

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
    
            // get user data
            const auth = getAuth(firebase_app);
            const user = auth.currentUser;
            if (!user) return;
    
            query_notes(db, user);
        }
        catch (e) {
            console.log(e);
        }
    }
    
    const query_notes = async (db: Firestore, user: User) => {
        try {
            const query_notes = query(collection(db, 'users'), where('id', '==', user.uid));
            const notes_snapshot = await getDocs(query_notes);
            notes_snapshot.forEach((doc) => {
                const object_notes = doc.data()['bible']['notes'] as { [key: string]: Note };
                let buffer: Note[] = [];
                for (let [key, value] of Object.entries(object_notes)) {
                    buffer.push({
                        id: key,
                        description: value.description,
                        date: value.date,
                        title: value.title
                    });
                }
                setNotes(buffer);
            });
        }
        catch (e) {
            console.log(e);
        }
    }

    const onBookChange = (e: any) => {
        const book = Number(e.target.value);
        const book_chapters = books_map.find(b => b.numero === book)?.chapters || 1;
    
        if (index.chapter > book_chapters)
            setIndex({ ...index, book: book, chapter: 1 });
        else
            setIndex({ ...index, book: book });
    }
    
    const onChapterChange = (e: any) => {
        setIndex({ ...index, chapter: Number(e.target.value) });
    }

    return (
        <>
            <header className='index-nav'>
                <section>
                    <select name='book' value={index.book} onChange={onBookChange}>
                        { renderBooksList() }
                    </select>
                    <select name='chapter' value={index.chapter} onChange={onChapterChange}>
                        { renderChaptersList(index.book) }
                    </select>
                </section>
            </header>
            <section className='content'>
                <ChapterVersesList chapter={chapter} notes={notes} />
            </section>
        </>
    )
};

export default BibleExplorer;
