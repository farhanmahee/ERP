import * as admin from 'firebase-admin';

export const initializeFirebase = () => {
  if (admin.apps.length === 0) {
    try {
        // In production, use standard GOOGLE_APPLICATION_CREDENTIALS
        // For dev/MVP, we initialize with default credentials or a placeholder
        admin.initializeApp({
            credential: admin.credential.applicationDefault()
        });
        console.log('Firebase Admin Initialized');
    } catch (error) {
        console.warn('Firebase initialization skipped: credentials not found.');
    }
  }
};