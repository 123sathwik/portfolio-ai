import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Firebase Admin SDK Configuration
 * 
 * This file initializes the Firebase Admin SDK for server-side operations.
 * It requires a service account key for authentication.
 */

import fs from 'fs';

try {
    const serviceAccountPath = './serviceAccountKey.json';

    if (fs.existsSync(serviceAccountPath)) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccountPath)
        });
        console.log('🔥 Firebase Admin SDK initialized with serviceAccountKey.json');
    } else {
        console.warn('⚠️ serviceAccountKey.json not found, using mock database');
    }
} catch (error) {
    console.error('❌ Firebase Admin initialization error:', error.message);
}

const db = admin.apps.length > 0 ? admin.firestore() : {
    collection: () => ({ doc: () => ({ set: () => Promise.resolve(), get: () => Promise.resolve({ exists: false, data: () => ({}) }) }) })
};

export { db, admin };
