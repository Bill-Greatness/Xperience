import React, { useState } from "react";
import {
	View,
	StyleSheet,
	Modal,
	Text,
	TextInput,
	Button,
	TouchableHighlight,
} from "react-native";
import Ion from "react-native-vector-icons/Ionicons";
import { newPost } from "../functions";
import { constants } from "../../styles";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { showMessage } from "../functions/callers";

export default function Post({ visible, setVisible }) {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [image, setImage] = useState(null)

	const postContent = () => {
		newPost({
			title: title.trim(),
			content: content.trim(),
			type:'Text',
			meta:{
				authorId:auth().currentUser.uid,
			},
			datePosted: firestore.Timestamp.now(),
			isAnon: false,
		})
			.then(() => {
				setVisible(false);
				setTitle("");
				setContent("");
			})
			.then(() => showMessage("Your Xperience now Public!"))
			.catch((err) => console.log(err));
	};

	return (
		<Modal
			visible={visible}
			onRequestClose={() => setVisible(false)}
			animationType="slide"
		>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					<Text style={styles.header}>Share Some Experience</Text>
					<View style={styles.inputView}>
						<Text style={constants.contentSummary}>Summary Text </Text>
						<TextInput
							value={title}
							onChangeText={(text) => setTitle(text)}
							style={styles.inputs}
							placeholderTextColor="silver"
							placeholder="Title/Summary"
						/>

						<Text style={constants.contentSummary}>Content </Text>
						<TextInput
							value={content}
							onChangeText={(text) => setContent(text)}
							style={styles.inputs}
							multiline
							placeholder="Content"
							placeholderTextColor="silver"
							maxLength={500}
							numberOfLines={5}
						/>

						<View style={{ display: "flex", flexDirection: "row" }}>
							<TouchableHighlight
								onPress={() =>
									launchImageLibrary(
										{
											mediaType: "photo",
											quality: 1,
										},
										(resp) => setImage(resp)
									)
								}
								style={styles.pickButtons}
							>
								<Ion color="darkgray" name="ios-image-outline" size={20} />
							</TouchableHighlight>
							<TouchableHighlight
								onPress={() =>
									launchCamera(
										{
											mediaType: "photo",
											quality: 1,
											saveToPhotos: true,
										},
										(resp) => console.log(resp)
									)
								}
								style={styles.pickButtons}
							>
								<Ion name="camera-outline" size={20} color="darkgray" />
							</TouchableHighlight>
						</View>

						<Button onPress={() => postContent()} title="Post Experience" />
					</View>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		alignContent: "center",
		justifyContent: "center",
		backgroundColor: "rgba(45,60,50,0.3)",
	},

	modalView: {
		margin: 5,
		flex: 1,
		borderRadius: 20,
		backgroundColor: "#fff",
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	header: {
		fontWeight: "bold",
		color: "darkgray",
		marginVertical: 10,
		letterSpacing: 2,
		textTransform: "uppercase",
	},
	inputs: {
		borderBottomWidth: 1.5,
		borderBottomColor: "teal",
		borderRadius: 2,
		color: "#000",
	},
	inputView: {
		minWidth: 350,
	},
	pickButtons: {
		paddingHorizontal: 5,
		paddingVertical: 10,
	},
});
