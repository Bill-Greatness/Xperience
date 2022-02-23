const functions = require("firebase-functions");
const admin = require("firebase-admin");

// remove this when deploying...
const serviceAcc = require("./keys/x.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAcc),
});

exports.getAuthorInfo = functions.https.onCall((data, context) => {
  console.log(data, context);
});
