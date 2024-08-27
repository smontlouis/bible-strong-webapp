import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import config from '@/config'

export const firebase_app = initializeApp(config.firebase);

