'use client';

import React, { useEffect, useState } from 'react';
import * as Auth from 'firebase/auth';
import { firebase_app } from '@/lib/firebase-app';
import { collection, query, where, getDocs, getFirestore, Firestore } from 'firebase/firestore';

import { Note, Tag, Verse } from '@/lib/types/bible';

interface Props {
    user: Auth.User;
    chapter: Verse[];
}

// TODO : render notes after the verse. 
// Maybe by storing each article in a ref map and then render the notes & give each element a unique id.
// Then render the notes in a separate list.
// Look for a way to render after initial render.
const BibleChapter = ({ user, chapter }: Props) => {
    const [selected, setSelected] = useState<number>(0);
    const [notes, setNotes] = React.useState<Note[]>([]);
    const [tags, setTags] = React.useState<Tag[]>([]);

    useEffect(() => {
        const db = getFirestore(firebase_app);

        query_notes(db, user); // TODO : move this into ChapterVersesList
    }, [chapter, notes]);

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

    function onClickVerse(verse: number) {
        setSelected(verse);
    }

    function computeLineClamp(index: number) {
        const verseContent = document.getElementById(`verse-${index}`);
        if (!verseContent) {
            console.error('Verse content not found');
            return 'unset';
        }
        
        const verseContentHeight = verseContent.clientHeight;
        return Math.floor(verseContentHeight / 24);
    }

    function onClickNote(e: React.MouseEvent<HTMLParagraphElement>, index: number) {
        const el = e.currentTarget;
        el.style.webkitLineClamp = el.style.webkitLineClamp !== 'unset' ? 'unset' : computeLineClamp(index).toString();
    } 

    return chapter.map((v, index) => {
        const note = notes.find(n => {
            const verses = n.id.split('/');
            const last = verses[verses.length - 1];

            if (last === v.id) {
                return true;
            }
            return false;
        });

        return (
            <article key={index} className={ index % 2 != 0 ? 'verse' : 'verse color' }> 
                <h3 className='verse-number'>{v.verse}</h3>
                <section
                    className={selected === v.verse ? 'verse-content selected' : 'verse-content'}
                    onClick={(e) => onClickVerse(v.verse)}>
                    <p id={`verse-${index}`}>{v.content}</p>
                </section>
                <p
                    className='note' 
                    style={{ WebkitLineClamp: computeLineClamp(index) }}
                    onClick={(e) => onClickNote(e, index)}>{note?.description}</p>
            </article>
        )
    });
};

export default BibleChapter;
