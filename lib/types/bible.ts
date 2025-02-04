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

export type TagHighlight = {
    [key: string]: boolean;
}

export type Tag = {
    id: string;
    date: string;
    name: string;
    highlights: TagHighlight[];
}

export type Study = {
    id: string;
    title: string;
    modified_at: number;
    created_at: number;
    user: {
        id: string;
        displayName: string;
        photoUrl: string;
    },
    content: {
        ops: any[];
    }
};

export enum Tab {
    Home,
    Bible,
    Studies
}
