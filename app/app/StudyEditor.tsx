import React, { useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill-new';
import { Study } from '@/lib/types/bible';

import 'react-quill-new/dist/quill.snow.css';

type Props = {
    study: Study;
}

const StudyEditor = ({ study }: Props) => {
    const [value, setValue] = React.useState<ReactQuill.Value>(study.content as ReactQuill.Value);

    useEffect(() => {
        setValue(study.content as ReactQuill.Value);
    }, [study]);

    return (
        <ReactQuill className='study-editor' theme="snow" value={value} onChange={setValue} />
    );
}

export default StudyEditor;
