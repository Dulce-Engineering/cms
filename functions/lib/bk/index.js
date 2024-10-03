const functions = require('firebase-functions');
const Square = require('./lib/Square');
//const De_Db_Firestore = require('./lib/De_Db_Firestore.js');
//const De_Component = require('./lib/De_Component.js');
//const De_Project = require('./lib/De_Project.js');

const square = new Square(false, "EAAAEPtmyNk9S-mNT-qoN2nYzI9SNs7dq18rdJG5zOh1nP4t2Uo5At79tWxFf0mc");
//const db = new De_Db_Firestore();

/*async function De_Component_Select_HTML_Contents(data, ctx)
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
}*/

const runtimeOpts = {timeoutSeconds: 540};
//exports.De_Component_Select_HTML_Contents = functions.https.onCall(De_Component_Select_HTML_Contents);
//exports.De_Component_Select_Text_Contents = functions.https.onCall(De_Component_Select_Text_Contents);
//exports.De_Project_Select_By_Key = functions.https.onCall(De_Project_Select_By_Key);
//exports.Health = functions.runWith(runtimeOpts).https.onRequest(Health);

/*exports.updateAllTrendsScheduled = 
  functions
    .runWith(runtimeOpts)
    .pubsub
    .schedule('every day 11:30')
    .timeZone("Australia/Sydney")
    .onRun(Update_All_Trends);*/
//exports.Api_Client = functions.runWith(runtimeOpts).https.onRequest(Api_Client);
//exports.Api_Server = functions.runWith(runtimeOpts).https.onRequest(Api_Server);
exports.Process_Payment = functions.https.onCall(square.Process_Payment);
