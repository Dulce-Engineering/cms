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
import De_Product from './lib/De_Product.js';
import De_Tag from './lib/De_Tag.js';
import De_Brand from './lib/De_Brand.js';

const app = express();
app.use(cors({ origin: true }));

admin.initializeApp();
const db = new De_Db_Firestore(admin.firestore());

//const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);
//const db_strg = admin.storage().bucket(firebaseConfig.storageBucket);

const rpc_buddy = new RPC_Buddy
(
  app, 
  '/rpc-server', 
  '/rpc-client',
  [
    De_Project, 
    De_Component, 
    De_Component_Link, 
    De_Component_Image, 
    De_Product,
    De_Tag,
    De_Brand
  ],
  [
    {name: "De_Project.Select_By_Id", inject: [db]},
    {name: "De_Project.Select_By_Key", inject: [db]},
    {name: "De_Project.Select_All_By_User", inject: [db]},
    {name: "De_Project.Select_As_Options", inject: [db]},
    {name: "De_Project.Save", inject: [db]},
    {name: "De_Project.Delete", inject: [db]},
    {name: "De_Project.New"},

    {name: "De_Component.Select_All", inject: [db]},
    {name: "De_Component.Select_Contents", inject: [db]},
    {name: "De_Component.Select_By_Id", inject: [db]},
    {name: "De_Component.Save", inject: [db]},
    {name: "De_Component.New"},
    {name: "De_Component.Get_Child_Ids", inject: [db]},
    {name: "De_Component.Has_Children", inject: [db]},
    {name: "De_Component.Get_Title", inject: [db]},
    {name: "De_Component.Get_Path", inject: [db]},
    {name: "De_Component.Get_Parent_Id", inject: [db]},

    {name: "De_Component_Link.Select_Contents", inject: [db]},
    {name: "De_Component_Link.Select_By_Id", inject: [db]},
    {name: "De_Component_Link.Get_Children", inject: [db]},
    {name: "De_Component_Link.Has_Children", inject: [db]},
    {name: "De_Component_Link.Get_Title", inject: [db]},
    {name: "De_Component_Link.Save", inject: [db]},
    {name: "De_Component_Link.New"},

    {name: "De_Component_Image.Select_Contents", inject: [db]},
    {name: "De_Component_Image.Select_By_Id", inject: [db]},
    {name: "De_Component_Image.Get_Children", inject: [db]},
    {name: "De_Component_Image.Has_Children", inject: [db]},
    {name: "De_Component_Image.Get_Title", inject: [db]},
    {name: "De_Component_Image.Save", inject: [db]},
    {name: "De_Component_Image.New"},

    {name: "De_Product.Select_All", inject: [db]},
    {name: "De_Product.Select_By_Id_With_Details", inject: [db]},
    {name: "De_Product.Delete", inject: [db]},
    {name: "De_Product.Save", inject: [db]},
    {name: "De_Product.New"},

    {name: "De_Tag.Select_All", inject: [db]},
    
    {name: "De_Brand.Select_All", inject: [db]},
  ],
  RPC_Buddy.Express
);
rpc_buddy.client_cache_control = "max-age=2592000"; // 30 days

//const Square = require('./lib/Square');
//const square = new Square(db, false, "EAAAEPtmyNk9S-mNT-qoN2nYzI9SNs7dq18rdJG5zOh1nP4t2Uo5At79tWxFf0mc");
//exports.Process_Payment = functions.https.onCall(square.Process_Payment);

export const api = functions.https.onRequest(app);
