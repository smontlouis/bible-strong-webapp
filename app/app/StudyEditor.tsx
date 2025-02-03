import React, { useEffect } from 'react';

import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';
import ReactQuill, { Quill } from 'react-quill-new';

type Study = {
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

type Props = {
    study: Study;
}

const StudyEditor = ({ study }: Props) => {
    const [value, setValue] = React.useState<ReactQuill.Value>(study.content as ReactQuill.Value);

    useEffect(() => {
        setValue(study.content as ReactQuill.Value);
    }, [study]);

    return (
        <ReactQuill theme="snow" value={value} onChange={setValue} />
    );
}

export default StudyEditor;
