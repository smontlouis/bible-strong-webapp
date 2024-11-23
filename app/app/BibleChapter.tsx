'use client';

import React, { use, useEffect, useState } from 'react';
import * as Auth from 'firebase/auth';
import { firebase_app } from '@/lib/firebase-app';
import { collection, query, where, getDocs, getFirestore, Firestore } from 'firebase/firestore';

import { Note, Tag, Verse } from '@/lib/types/bible';

interface Props {
    user: Auth.User;
    chapter: Verse[];
    notes: Note[];
    tags: Tag[];
}

/**
 * Computes the number of lines that can be displayed within a container element
 * based on the height of the first paragraph element inside the container.
 *
 * @param {HTMLElement} root - The root element containing the container with class 'verse-content'.
 * @returns {string} - The number of lines that can be displayed, or 'unset' if the verse content is not found.
 */
function computeLineClamp(root: HTMLElement): string {    
    const container = root.getElementsByClassName('verse-content')[0] as HTMLElement;
    const verseContent = container.firstElementChild as HTMLParagraphElement;
    if (!verseContent) {
        console.error('Verse content not found');
        return 'unset';
    }
    
    const verseContentHeight = verseContent.clientHeight;
    return Math.floor(verseContentHeight / 24).toString();
}

 /**
 * Toggles the `webkitLineClamp` style between 'unset' and
 * the computed line clamp value based on the height of the verse content.
 *
 * @param e - The mouse event triggered by clicking on the note element.
 * @returns void
 */
 function onClickNote(e: React.MouseEvent<HTMLParagraphElement>) {
    const el = e.currentTarget;
    const root = el.parentElement;
    if (!root) {
        console.error('Parent not found');
        return;
    }

    el.style.webkitLineClamp = el.style.webkitLineClamp !== 'unset' ? 'unset' : computeLineClamp(root);
}

const BibleChapter = ({ user, chapter, notes, tags }: Props) => {
    const [selected, setSelected] = useState<number>(0);
    const verseRefs = React.useRef<HTMLElement[]>([]);

    useEffect(() => {
        verseRefs.current.forEach((node) => {
            const note_node = node.getElementsByClassName('note')[0] as HTMLElement | null;
            if (!note_node) {
                console.error('Note node not found');
                return;
            }

            const lineClamp = computeLineClamp(node);
            note_node.style.webkitLineClamp = lineClamp;
        });     
    }, [chapter, notes]);

    useEffect(() => {
        // render tags
        tags.forEach((tag) => {
           console.log(tag);
           tag.highlights.forEach((highlight) => { // TODO : use regex to find if it corresponds to the current book and chapter
                // if (highlight.find) {
                //     return;
                // }
           });
        });
    }, [tags]);

    function onClickVerse(verse: number) {
        setSelected(verse);
    }

    function addVerseRef(node: HTMLElement | null) {
        if (!node) {
            console.error('Node not found');
            return;
        }

        verseRefs.current.push(node);
    };

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
            <article key={index} 
                ref={addVerseRef} 
                className={ index % 2 != 0 ? 'verse' : 'verse color' }> 
                <h3 className='verse-number'>{v.verse}</h3>
                <section
                    className={selected === v.verse ? 'verse-content selected' : 'verse-content'}
                    onClick={(e) => onClickVerse(v.verse)}>
                    <p id={`verse-${index}`}>{v.content}</p>
                </section>
                <p
                    className='note'
                    onClick={onClickNote}>{note?.description}</p>
            </article>
        )
    });
};

export default BibleChapter;
