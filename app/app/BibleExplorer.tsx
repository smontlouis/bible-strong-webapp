import React from 'react';
import BibleChapter from './BibleChapter';
import books_map from '@/lib/types/books.json';
import * as Auth from 'firebase/auth';
import { firebase_app } from '@/lib/firebase-app';

import { collection, query, where, getDocs, getFirestore, Firestore } from 'firebase/firestore';
import { Note, Tag, Verse } from '@/lib/types/bible';

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

type Props = {
    user: Auth.User;
}

const BibleExplorer = ({ user }: Props) => {
    const [index, setIndex] = React.useState<Index>({ book: 1, chapter: 1, verse: 1 }); // set default index
    const [chapter, setChapter] = React.useState<Verse[]>([]);
    const [style, setStyle] = React.useState<StyleSettings>({ line_break: false });
    const [notes, setNotes] = React.useState<Note[]>([]);
    const [tags, setTags] = React.useState<Tag[]>([]);
    
    const outline_dialog = React.useRef<HTMLDialogElement>(null);

    React.useEffect(() => {
        const db = getFirestore(firebase_app);

        query_chapter(db);
        query_notes(db, user); // TODO : move this into ChapterVersesList
    }, [index]);

    const query_chapter = async (db: Firestore) => {
        try {
            let verses: Verse[] = [];
    
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

    const query_notes = async (db: Firestore, user: Auth.User) => {
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

                const object_tags = doc.data()['bible']['tags'] as { [key: string]: Tag };
                let buffer_tags: Tag[] = [];
                for (let [key, value] of Object.entries(object_tags)) {
                    buffer_tags.push({
                        id: key,
                        date: value.date,
                        name: value.name,
                        highlights: value.highlights
                    });
                }
                // setTags(buffer_tags);
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
            <section className='bible-content'>
                <BibleChapter user={user} chapter={chapter} notes={notes} tags={tags} />
            </section>
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
        </>
    )
};

export default BibleExplorer;
