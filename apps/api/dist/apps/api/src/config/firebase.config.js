"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatabaseByUrl = exports.getSecondaryFirestore = exports.getPrimaryFirestore = exports.getSecondaryDatabase = exports.getPrimaryDatabase = exports.initializeFirebase = void 0;
const admin = require("firebase-admin");
const initializeFirebase = () => {
    if (admin.apps.length === 0) {
        try {
            admin.initializeApp({
                credential: admin.credential.applicationDefault()
            });
            console.log('Firebase Admin Initialized');
        }
        catch (error) {
            console.warn('Firebase initialization skipped: credentials not found.');
        }
    }
    if (!admin.apps.some(app => app.name === 'SecondaryApp')) {
        try {
            const secondaryServiceAccount = require('/path/to/your/secondary-service-account.json');
            const secondaryDatabaseURL = 'https://your-secondary-database-url.firebaseio.com';
            admin.initializeApp({
                credential: admin.credential.cert(secondaryServiceAccount),
                databaseURL: secondaryDatabaseURL
            }, 'SecondaryApp');
            console.log('Secondary Firebase App Initialized');
        }
        catch (error) {
            console.error('Could not initialize secondary Firebase app. Make sure the credential path is correct.', error);
        }
    }
};
exports.initializeFirebase = initializeFirebase;
const getPrimaryDatabase = () => {
    return admin.database();
};
exports.getPrimaryDatabase = getPrimaryDatabase;
const getSecondaryDatabase = () => {
    try {
        const secondaryApp = admin.app('SecondaryApp');
        return admin.database(secondaryApp);
    }
    catch (error) {
        console.error('Secondary app has not been initialized.');
        throw new Error('Secondary Firebase app is not available.');
    }
};
exports.getSecondaryDatabase = getSecondaryDatabase;
const getPrimaryFirestore = () => {
    return admin.firestore();
};
exports.getPrimaryFirestore = getPrimaryFirestore;
const getSecondaryFirestore = () => {
    try {
        const secondaryApp = admin.app('SecondaryApp');
        return secondaryApp.firestore();
    }
    catch (error) {
        console.error('Secondary app has not been initialized.');
        throw new Error('Secondary Firebase app is not available.');
    }
};
exports.getSecondaryFirestore = getSecondaryFirestore;
const getDatabaseByUrl = (databaseURL) => {
    return admin.database(databaseURL);
};
exports.getDatabaseByUrl = getDatabaseByUrl;
//# sourceMappingURL=firebase.config.js.map