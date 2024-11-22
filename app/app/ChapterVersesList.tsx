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

export default ChapterVersesList;
