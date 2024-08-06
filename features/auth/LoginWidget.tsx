'use client';

import { FC, useCallback, useEffect } from 'react'
import firebase from 'firebase/compat/app';

interface Props {
    client: firebase.app.App
    config: firebaseui.auth.Config
}

const LoginWidget: FC<Props> = ({ client, config }) => {
    const load_firebaseui = useCallback(async () => {
        const firebaseui = await import('firebaseui');
        const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(client.auth());
        ui.start('#firebaseui-auth-container', config);
    }, [client, config]);

    useEffect(() => {
        load_firebaseui();
    }, [])

    return <div id="firebaseui-auth-container"></div>
}

export default LoginWidget;