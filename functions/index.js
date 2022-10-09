import * as functions from 'firebase-functions';
import admin from 'firebase-admin';
import De_Db_Firestore from './lib/De_Db_Firestore.js';
import RPC_Buddy from 'rpc-buddy';
import express from 'express';
import cors from 'cors';
import De_Project from './lib/De_Project.js';
import De_Component from './lib/De_Component.js';
import De_Component_Link from './lib/De_Component_Link.js';
import De_Component_Image from './lib/De_Component_Image.js';

const app = express();
app.use(cors({ origin: true }));

admin.initializeApp();
const db = new De_Db_Firestore(admin.firestore());

const rpc_buddy = new RPC_Buddy
(
  app, 
  '/rpc-server', 
  '/rpc-client',
  [De_Project, De_Component, De_Component_Link, De_Component_Image],
  [
    {name: "De_Project.Select_By_Id", inject: [db]},
    {name: "De_Project.Select_By_Key", inject: [db]},
    {name: "De_Project.Select_All_By_User", inject: [db]},
    {name: "De_Project.Save", inject: [db]},
    {name: "De_Project.Delete", inject: [db]},
    {name: "De_Component.Select_Contents", inject: [db]},
    {name: "De_Component_Link.Select_Contents", inject: [db]},
    {name: "De_Component_Image.Select_Contents", inject: [db]},
  ],
  RPC_Buddy.Express
);
rpc_buddy.client_cache_control = "max-age=2592000"; // 30 days

//const Square = require('./lib/Square');
//const square = new Square(db, false, "EAAAEPtmyNk9S-mNT-qoN2nYzI9SNs7dq18rdJG5zOh1nP4t2Uo5At79tWxFf0mc");
//exports.Process_Payment = functions.https.onCall(square.Process_Payment);

export const api = functions.https.onRequest(app);
