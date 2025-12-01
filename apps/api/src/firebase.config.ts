import * as admin from 'firebase-admin';

const serviceAccount = require('../../../google-credentials.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://insight-erp-firebase.firebaseio.com'
});

export default admin;
