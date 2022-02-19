const functions = require('firebase-functions');
const admin = require('firebase-admin');
const Square = require('./lib/Square');
const De_Db_Firestore = require('./lib/De_Db_Firestore');

admin.initializeApp();
const db = new De_Db_Firestore(admin.firestore());
const square = new Square(db, false, "EAAAEPtmyNk9S-mNT-qoN2nYzI9SNs7dq18rdJG5zOh1nP4t2Uo5At79tWxFf0mc");

exports.Process_Payment = functions.https.onCall(square.Process_Payment);
