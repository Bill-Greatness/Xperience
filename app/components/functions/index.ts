import { Share } from "react-native";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'


type Post = {
	title: string;
	content: string;
	datePosted: FirebaseFirestoreTypes.Timestamp;
	authorId: FirebaseAuthTypes.User;
};

export const getStore = (table:string) => {
	return firestore().collection(table)
}

export const getDocuments = async (table:string, getData:Function) => {
	const data = await getStore(table).get()
	getData(data)
}

export const getDocument = (table:string, document:string) => {
	return getStore(table).doc(document)
}

export const newPost = async (content: Post) => {
	await getStore('Posts').add({...content})
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
	await auth().signOut()
}


