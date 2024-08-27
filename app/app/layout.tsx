'use client';

import Link from 'next/link';
import { PropsWithChildren, useEffect } from 'react';

import { FiGlobe, FiSend, FiHelpCircle, FiGithub, FiFacebook, FiDollarSign, FiShare2 } from 'react-icons/fi';
import './navbar.layout.scss';
import { getAuth } from 'firebase/auth';
import { firebase_app } from '@/lib/firebase-app';

const Layout = ({ children }: PropsWithChildren<{}>) => {
    const auth = getAuth(firebase_app);
    const user = auth.currentUser;

    return (
        <>
            <header id='nav-container'>
                <nav className='navbar'>
                    <section className='profil'>
                        <article id="user">
                            <img src="/images/avatar-dummy.png" alt="Avatar" />
                                <h2>Bonjour {user?.displayName}</h2>
                                <div>
                                <legend>Verset du jour</legend>
                                <p>Le Seigneur est fidèle, il vous affermira et vous preservera du malin.</p>
                                </div>
                        </article>
                    </section>
                    <section className='settings' id="settings">
                        <ul>
                            <li>
                                <FiHelpCircle />
                                <Link href="/">Foire aux questions</Link>
                            </li>
                            <li>
                                <FiSend />
                                <Link href="/">Contacter le développeur</Link>
                            </li>
                            <li>
                                <FiGlobe />
                                <Link href="/">Changer la langue</Link>
                            </li>
                            <li>
                                <FiDollarSign />
                                <Link href="/">Contribuer</Link>
                            </li>
                        </ul>
                    </section>
                    <section id="about">
                        <ul>
                            <li>
                                <Link href="/"><FiGithub size={20} /></Link>
                            </li>
                            <li>
                                <Link href="/"><FiFacebook size={20} /></Link>
                            </li>
                            <li>
                                <Link href="/"><FiShare2 size={20} /></Link>
                            </li>
                        </ul>
                    </section>
                </nav>
            </header>
            {children}
        </>
    )
}

export default Layout;
