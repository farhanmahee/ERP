import * as admin from 'firebase-admin';

export const initializeFirebase = () => {
  // Initialize the default app if it hasn't been already
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

  // --- Initialize Secondary App ---
  // Check if the secondary app is already initialized to avoid errors
  if (!admin.apps.some(app => app.name === 'SecondaryApp')) {
    try {
      // IMPORTANT: Replace with the actual path to your secondary app's credentials
      // It's recommended to use environment variables for this in production
      const secondaryServiceAccount = require('/path/to/your/secondary-service-account.json');
      
      // IMPORTANT: Replace with your secondary app's database URL
      const secondaryDatabaseURL = 'https://your-secondary-database-url.firebaseio.com';

      admin.initializeApp({
        credential: admin.credential.cert(secondaryServiceAccount),
        databaseURL: secondaryDatabaseURL
      }, 'SecondaryApp'); // <-- Giving the secondary app a unique name

      console.log('Secondary Firebase App Initialized');

    } catch (error) {
      console.error('Could not initialize secondary Firebase app. Make sure the credential path is correct.', error);
    }
  }
};

/**
 * Returns the Realtime Database instance for the primary Firebase app.
 */
export const getPrimaryDatabase = () => {
  return admin.database();
};

/**
 * Returns the Realtime Database instance for the secondary Firebase app.
 */
export const getSecondaryDatabase = () => {
  try {
    const secondaryApp = admin.app('SecondaryApp');
    return admin.database(secondaryApp);
  } catch (error) {
    console.error('Secondary app has not been initialized.');
    throw new Error('Secondary Firebase app is not available.');
  }
};

/**
 * Returns the Firestore instance for the primary Firebase app.
 */
export const getPrimaryFirestore = () => {
  return admin.firestore();
};

/**
 * Returns the Firestore instance for the secondary Firebase app.
 */
export const getSecondaryFirestore = () => {
  try {
    const secondaryApp = admin.app('SecondaryApp');
    return secondaryApp.firestore();
  } catch (error) {
    console.error('Secondary app has not been initialized.');
    throw new Error('Secondary Firebase app is not available.');
  }
};

/**
 * Returns a Realtime Database instance for a specific database URL.
 * The default app's credentials will be used for authentication.
 * This is useful for projects with multiple RTDB instances.
 * @param databaseURL The full URL of the Realtime Database instance to connect to.
 */
export const getDatabaseByUrl = (databaseURL: string) => {
    return admin.database(databaseURL);
};
