// import firestore from '@react-native-firebase/firestore'
import { getStore, getDocument } from "../components/functions";

export const getPosts = async (getData) => {
	let posts = [];
	getStore("Posts").onSnapshot((qss) => {
		qss.forEach((doc) => {
			posts.push({ ...doc.data(), id: doc.id });
		});
		getData(posts);
		posts = [];
	});
};

export const getPost = (id) => {
	return getDocument("Posts", id);
};
