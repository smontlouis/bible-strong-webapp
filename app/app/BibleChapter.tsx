'use client';

import React, { use, useEffect, useState } from 'react';
import * as Auth from 'firebase/auth';
import { firebase_app } from '@/lib/firebase-app';
import { collection, query, where, getDocs, getFirestore, Firestore } from 'firebase/firestore';

import { Note, Tag, Verse } from '@/lib/types/bible';

type Index = { // where the user wants to navigates
    book: number;
    chapter: number;
    verse: number;
};

interface Props {
    user: Auth.User;
    index: Index;
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

const BibleChapter = ({ user, index, chapter, notes, tags }: Props) => {
    const [selected, setSelected] = useState<number>(0);
    const verseRefs = React.useRef<HTMLElement[]>([]);
    const [_tags, setTags] = useState<Tag[]>([]);

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
        // tags.forEach((tag) => {
        //     if (tag.highlights) {
        //         const regex = `^${index.book}-${index.chapter}-\d+$`;
        //         const matching = Object.keys(tag.highlights).filter(key => key.match(regex));
        //         console.log(matching);
        //     }
        // });
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

    return chapter.map((v, i) => {
        const note = notes.find(n => {
            const verses = n.id.split('/');
            const last = verses[verses.length - 1];

            if (last === v.id) {
                return true;
            }
            return false;
        });

        const tag_match = tags.filter(t => {
            if (t.highlights === undefined) return false;

            const matching = Object.keys(t.highlights).filter(key => key === v.id);
            return matching.length > 0;
        });

        return (
            <article key={i} 
                ref={addVerseRef} 
                className={ i % 2 != 0 ? 'verse' : 'verse color' }> 
                <h3 className='verse-number'>{v.verse}</h3>
                <section
                    className={selected === v.verse ? 'verse-content selected' : 'verse-content'}
                    onClick={(e) => onClickVerse(v.verse)}>
                    <p id={`verse-${i}`}>{v.content}</p>
                    {tag_match.map((tag, i) => (
                        <span key={i} className='tag'>{tag.name}</span>
                    ))}
                </section>
                <p
                    className='note'
                    onClick={onClickNote}>{note?.description}</p>
            </article>
        )
    });
};

export default BibleChapter;
