import React, { useState } from "react";
import { onShare } from "../functions";
import {
	View,
	TouchableOpacity,
	Pressable,
	Image,
	StyleSheet,
	Text,
} from "react-native";
import NewPost from "./new-post";
import Ion from "react-native-vector-icons/Ionicons";
import MCI from "react-native-vector-icons/MaterialCommunityIcons";
import testImage from "../../assets/images/Flier.jpg";
import { useNavigation } from "@react-navigation/native";
import { ImageInfo } from "./images";

const styles = StyleSheet.create({
	postContainer: {
		display: "flex",
		margin: 3,
		borderRadius: 5,
		backgroundColor: "#fff",
		flexDirection: "column",
		minHeight: 100,
		shadowOffset: { width: 0, height: 10 },
		shadowColor: "#000",
		elevation: 1,
		shadowOpacity: 0.75,
	},
	postHeader: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	postDetails: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-start",
		paddingHorizontal: 5,
		alignItems: "center",
	},
	userData: {
		display: "flex",
		flexDirection: "column",
		paddingVertical: 10,
	},
	postContent: {
		padding: 10,
	},
	contentText: {
		color: "#000",
	},
	postActions: {
		display: "flex",
		padding: 5,
		flexDirection: "row",
		justifyContent: "space-around",
		borderTopWidth: StyleSheet.hairlineWidth,
		borderTopColor: "darkgray",
	},
	title: {
		textTransform: "capitalize",
		color: "darkgray",
		fontWeight: "bold",
		letterSpacing: 1.2,
		paddingVertical: 5,
	},
	postAction: {
		display: "flex",
		flexDirection: "row",
	},
	author: {
		fontSize: 16,
		paddingLeft: 3,
		fontWeight: "800",
		color: "#000",
	},
	time: {
		fontSize: 10,
		paddingTop: 0,
		color: "darkgray",
		paddingLeft: 5,
	},
	stats: {
		paddingVertical: 2,
		paddingHorizontal: 3,
		color: "#000",
	},
	imageContainer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		height: 180,
	},
	postImage: {
		flex: 1,
		aspectRatio: 2.0,
		resizeMode: "cover",
	},
	postCount: {
		color: "black",
		paddingHorizontal: 10,
	},
});

const Author = ({ post }) => {
	const Navigator = useNavigation();

	const goToProfile = (authorId) => {
		return Navigator.navigate("Posts", {
			screen: "Author",
			params: {
				authorId,
			},
		});
	};

	const goToPost = (postId) => {
		return Navigator.navigate("Posts", {
			screen: "Details",
			params: {
				postId,
				actionType: "Post",
			},
		});
	};
	return (
		<View style={styles.postHeader}>
			<TouchableOpacity onPress={() => goToProfile("Hello")}>
				<View style={styles.postDetails}>
					<Image
						style={{ borderRadius: 100 }}
						source={{ uri: post.profileImage }}
						width={40}
						height={40}
					/>
					<View style={styles.userData}>
						<Text style={styles.author}>{post.author}</Text>
						<Text style={styles.time}>{post.datePosted}</Text>
					</View>
				</View>
			</TouchableOpacity>

			<TouchableOpacity onPress={() => goToPost(55)}>
				<Text style={styles.postCount}>1/3</Text>
			</TouchableOpacity>
		</View>
	);
};

const Reactions = ({ postId }) => {

	const Navigator = useNavigation();
	const goToComments = () => {
		return Navigator.navigate("Posts", {
			screen: "Details",
			params: {
				actionType: "Comments",
				postId,
			},
		});
	};
	return (
		<View style={styles.postActions}>
			<TouchableOpacity>
				<View style={styles.postAction}>
					<Ion name="ios-heart-outline" size={20} color={"#000"} />
					<Text style={styles.stats}>5</Text>
				</View>
			</TouchableOpacity>

			<TouchableOpacity onPress={() => goToComments()}>
				<View style={styles.postAction}>
					<Ion name="md-chatbubbles-outline" size={20} color={"#000"} />
					<Text style={styles.stats}>15</Text>
				</View>
			</TouchableOpacity>
			<TouchableOpacity onPress={onShare}>
				<MCI name="share-outline" size={24} color={"#000"} />
			</TouchableOpacity>
		</View>
	);
};

const TextContent = ({ data }) => (
	<View style={styles.postContent}>
		<Text style={styles.title}>{data.title} </Text>
		<Text style={styles.contentText}>{data.content}</Text>
	</View>
);

const ImageContent = ({ data }) => {
	const [show, setShow] = useState(false);
	return (
		<View>
			<Pressable style={styles.imageContainer} onPress={() => setShow(true)}>
				<Image style={styles.postImage} source={testImage} />
			</Pressable>
			<ImageInfo show={show} setShow={setShow} />
		</View>
	);
};
export const TextPost = ({ data }) => {
	const [visible, setVisible] = useState(false);
	return (
		<View style={styles.postContainer}>
			<Author post={data.meta} setVisible={setVisible} />
			<TextContent data={data} />
			<Reactions />
		</View>
	);
};

export const ImagePost = ({ data }) => {
	const [visible, setVisible] = useState(false);
	return (
		<View style={styles.postContainer}>
			<Author post={data.meta} setVisible={setVisible} />
			{data.content.length > 0 ? (
				<>
					<TextContent data={data} />
					<ImageContent />
				</>
			) : (
				<ImageContent />
			)}

			<Reactions />
		</View>
	);
};

export { NewPost };
