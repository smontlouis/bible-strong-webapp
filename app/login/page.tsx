import { FormEvent, FormEventHandler, useRef } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { app } from '../../lib/firebase-app'

export default function Login() {
    const email_input = useRef<HTMLInputElement>(null)
    const password_input = useRef<HTMLInputElement>(null)
    
    const auth = getAuth(app)

    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const email = email_input.current?.value;
        const password = password_input.current?.value;

        if (email === undefined || password === undefined) {
            return;
        }


        signInWithEmailAndPassword(auth, email, password)
            .then((credential) => {
                const user = credential.user;
            })
            .catch((error) => {
                const error_code = error.code;
                const error_message = error.message;

                console.error(error);
            })
    }

    return (
        <main>
            <form onSubmit={submit}>
                <input ref={email_input} type="email" name="email" />
                <input ref={password_input} type="password" name="password" />
            </form>
        </main>
    )
}