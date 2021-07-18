import functions from 'firebase-functions';
import firebase from 'firebase-admin';
import De_Db_Firestore from './lib/De_Db_Firestore.js';
import De_Component from './lib/De_Component.js';
import De_Project from './lib/De_Project.js';

const config = functions.config().firebase;
firebase.initializeApp(config, "de-cms");
const db = new De_Db_Firestore();

async function De_Component_Select_HTML_Contents(data, ctx)
{
  return await De_Component.Select_HTML_Contents(db, data.project_id, data.key);
}

async function De_Component_Select_Text_Contents(data, ctx)
{
  return await De_Component.Select_Text_Contents(db, data.project_id, data.key);
}

async function De_Project_Select_By_Key(data, ctx)
{
  return await De_Project.Select_By_Key(db, data.key);
}

async function Health(req, res)
{
  res.status(200).send("v1");
}

const runtimeOpts = {timeoutSeconds: 540};
exports.De_Component_Select_HTML_Contents = functions.https.onCall(De_Component_Select_HTML_Contents);
exports.De_Component_Select_Text_Contents = functions.https.onCall(De_Component_Select_Text_Contents);
exports.De_Project_Select_By_Key = functions.https.onCall(De_Project_Select_By_Key);
exports.Health = functions.runWith(runtimeOpts).https.onRequest(Health);

/*exports.updateAllTrendsScheduled = 
  functions
    .runWith(runtimeOpts)
    .pubsub
    .schedule('every day 11:30')
    .timeZone("Australia/Sydney")
    .onRun(Update_All_Trends);*/
//exports.Api_Client = functions.runWith(runtimeOpts).https.onRequest(Api_Client);
//exports.Api_Server = functions.runWith(runtimeOpts).https.onRequest(Api_Server);

/*{
  "de-rpc": "1.0",
  "class": "",
  "method": "",
  "params": []
}*/