import { Share } from "react-native";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import functions from "@react-native-firebase/functions";
import storage from "@react-native-firebase/storage";

type Post = {
  title: string;
  content: string;
  datePosted: FirebaseFirestoreTypes.Timestamp;
  authorId: FirebaseAuthTypes.User;
};

export const getStore = (table: string) => {
  return firestore().collection(table);
};

export const getToken = (userId: string, token: string) => {
  return getStore("Users")
    .doc(userId)
    .update({
      tokens: firestore.FieldValue.arrayUnion(token),
    });
};

export const getDocuments = async (table: string, getData: Function) => {
  const data = await getStore(table).get({ source: "server" });
  getData(data);
};

export const notifyAuthor = (content: Comment) => {
  return getStore("Notice").add({ ...content });
};

export const getDocument = (table: string, document: string) => {
  return getStore(table).doc(document);
};

export const updateDocument = (
  table: string,
  document: string,
  data: Object
) => {
  return getStore(table).doc(document).update(data);
};

export const newPost = async (content: Post) => {
  await getStore("Posts").add({ ...content });
};

export const onShare = async () => {
  try {
    const result = await Share.share({
      message: "This is a Test Message to be shared!",
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
      } else {
        //shared.
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (err) {
    alert(err.message);
  }
};

export const logOut = async () => {
  await auth().signOut();
};

export const getFunc = (name: string) => {
  return functions().httpsCallable(name);
};

export const getFile = async (path: string, file: any, getLink: Function) => {
  const storagePath = storage().ref("Xperience" + path);
  const { url } = await storagePath
    .putFile(file)
    .then(() => storagePath.getDownloadURL());
  getLink(url);
};

export const deleteFile = async (url: string) => {
  await storage().refFromURL(url).delete();
};
