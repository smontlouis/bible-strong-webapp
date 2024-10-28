'use client';

import React, { useEffect, useState } from 'react';

import { Note, Verse } from '@/lib/types/bible';

interface Props {
    chapter: Verse[];
    notes: Note[];
}

const ChapterVersesList = ({ chapter, notes }: Props) => {
    const [selected, setSelected] = useState<number>(0);
    
    useEffect(() => {
    }, [chapter, notes]);

    function onClickVerse(verse: number) {
        setSelected(verse);
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

        // return (
        //     <span key={index}
        //         className={selected === v.verse ? 'selected' : ''}
        //         onClick={(e) => onClickVerse(v.verse)}
        //         >{v.verse}. {v.content} {note ? <span>[{note?.description}]</span> : null}</span>
        // )

        console.log(index % 2)

        return (
            <article key={index} className={ index % 2 != 0 ? 'verse' : 'verse color' }>
                <h3 className='verse-number'>{v.verse}</h3>
                <section
                    className={selected === v.verse ? 'verse-content selected' : 'verse-content'}
                    onClick={(e) => onClickVerse(v.verse)}>
                    <p>{v.content}</p>
                </section>
                <p className='note'>{note?.description}</p>
            </article>
        )
    });
};

export default ChapterVersesList;
