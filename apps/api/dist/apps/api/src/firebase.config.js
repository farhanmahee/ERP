"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const serviceAccount = require('../../../google-credentials.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://insight-erp-firebase.firebaseio.com'
});
exports.default = admin;
//# sourceMappingURL=firebase.config.js.map