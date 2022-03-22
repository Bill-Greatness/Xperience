/* eslint-disable */
const functions = require("firebase-functions");
const admin = require("firebase-admin");

// remove this when deploying...
const serviceAcc = require("./keys/x.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAcc),
});

exports.getAuthorInfo = functions.https.onCall((data, context) => {
  return admin.auth().getUser(data.authorId);
});

exports.listenForNewUser = functions.auth.user().onCreate(async (user) => {
  admin
    .firestore()
    .collection("Users")
    .doc(user.uid)
    .set({
      userId: user.uid,
      displayName: user.displayName ?? "Anon",
      dateJoined: new Date().toDateString(),
      timeJoined: new Date().toLocaleTimeString("en-GB"),
      photoURL: user.photoURL ?? "N/A",
    });
});



exports.onPostReact = functions.https.onCall((data, context) => {
  const { authorId, message } = data;
  const author = admin.firestore().collection("Users").doc(authorId).get();
  admin.messaging().sendToDevice(
    author.tokens,
    {
      notification: {
        title:'Xperience Plus',
        message,
      },
    },
    {
      priority: "high",
    }
  );
});
