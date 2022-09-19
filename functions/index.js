const functions = require('firebase-functions');
const admin = require('firebase-admin');
const De_Db_Firestore = require('./lib/De_Db_Firestore');
const RPC_Buddy = require('rpc-buddy');
const express = require('express');
const cors = require('cors');
const De_Project = require('./lib/De_Project');
const De_Component = require('./lib/De_Component');

const app = express();
app.use(cors({ origin: true }));

admin.initializeApp();
const db = new De_Db_Firestore(admin.firestore());

const rpc_buddy = new RPC_Buddy
(
  app, 
  '/rpc-server', 
  '/rpc-client',
  [De_Project, De_Component],
  [
    {name: "De_Project.Select_By_Key", inject: [db]},
    {name: "De_Component.Select_Text_Contents", inject: [db]},
    {name: "De_Component.Select_HTML_Contents", inject: [db]},
  ],
  RPC_Buddy.Express
);
rpc_buddy.client_cache_control = "max-age=2592000"; // 30 days

//const Square = require('./lib/Square');
//const square = new Square(db, false, "EAAAEPtmyNk9S-mNT-qoN2nYzI9SNs7dq18rdJG5zOh1nP4t2Uo5At79tWxFf0mc");
//exports.Process_Payment = functions.https.onCall(square.Process_Payment);

exports.api = functions.https.onRequest(app);
