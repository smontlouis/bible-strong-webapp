export type Verse = { // firebase verse object
    id: string;
    book: number;
    chapter: number;
    verse: number;
    content: string;
};

export type Note = {
    id: string;
    date: string;
    description: string;
    title: string;
}
