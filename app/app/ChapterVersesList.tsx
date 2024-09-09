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
        console.log(verse);
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

        return (
            <span key={index}
                className={selected === v.verse ? 'selected' : ''}
                onClick={(e) => onClickVerse(v.verse)}
                >{v.verse}. {v.content} {note?.description}</span>
        )
    });
};

export default ChapterVersesList;
