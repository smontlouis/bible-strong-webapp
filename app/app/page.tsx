'use client';

import React from 'react';

import './page.scss';

import BibleExplorer from './BibleExplorer';
import StudiesExplorer from './StudiesExplorer';

const AppPage = () => {
    return (
        <main id='navigator'>
            <section className='tab'>
                <BibleExplorer />
            </section>
            <section className='tab'>
                <StudiesExplorer />
            </section>
        </main>
    )
};

export default AppPage;
