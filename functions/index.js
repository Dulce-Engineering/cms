const functions = require('firebase-functions');
const Square = require('./lib/Square');

const square = new Square(false, "EAAAEPtmyNk9S-mNT-qoN2nYzI9SNs7dq18rdJG5zOh1nP4t2Uo5At79tWxFf0mc");

exports.Process_Payment = functions.https.onCall(square.Process_Payment);
