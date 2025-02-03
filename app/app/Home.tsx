import { Tab } from '@/lib/types/bible';
import React from 'react';
import { FiBook, FiFeather } from "react-icons/fi";

type Props = {
    setTab: (tab: Tab) => void;
}

const Home = ({setTab}: Props) => {
    return (
        <div className='home'>
            <button onClick={() => setTab(Tab.Bible)}>
                <FiBook size={52} />
                <h2>Bible</h2>
            </button>
            <button onClick={() => setTab(Tab.Studies)}>
                <FiFeather size={52} />
                <h2>Studies</h2>
            </button>
        </div>
    );
}

export default Home;
