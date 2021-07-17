const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const De_Db_Firestore = require('./lib/De_Db_Firestore.js');
const De_Component = require('./lib/De_Component.js');

const config = functions.config().firebase;
firebase.initializeApp(config, "de-cms");
const db = new De_Db_Firestore();

async function De_Component_Select_HTML_Contents(data, ctx)
{
  const contents = await De_Component.Select_HTML_Contents(db, data.project_id, data.key);
  return contents;
  //throw new functions.https.HttpsError(code, msg);
}

async function Test(req, res)
{
  res.status(200).send("yo ho ho!");
}

const runtimeOpts = {timeoutSeconds: 540};
exports.De_Component_Select_HTML_Contents = functions.https.onCall(De_Component_Select_HTML_Contents);
exports.Test = functions.runWith(runtimeOpts).https.onRequest(Test);

/*function Api_Client(req, res)
{

}

async function Api_Server(req, res)
{
  const contents = await De_Component.Select_HTML_Contents(db, this.project.id, this.key);
  const contents = await De_Component.Select_Text_Contents(db, this.project.id, this.key);

  // functions.logger.info("Hello logs!", {structuredData: true});
  res.send(contents);
  res.status(200);
  res.end();
}*/

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