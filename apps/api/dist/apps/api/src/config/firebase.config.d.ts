import * as admin from 'firebase-admin';
export declare const initializeFirebase: () => void;
export declare const getPrimaryDatabase: () => import("firebase-admin/lib/database/database").Database;
export declare const getSecondaryDatabase: () => import("firebase-admin/lib/database/database").Database;
export declare const getPrimaryFirestore: () => admin.firestore.Firestore;
export declare const getSecondaryFirestore: () => admin.firestore.Firestore;
export declare const getDatabaseByUrl: (databaseURL: string) => import("firebase-admin/lib/database/database").Database;
