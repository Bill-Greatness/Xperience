import React,{useState} from "react";
import {
	View,
	TextInput,
	SafeAreaView,
	Modal,
	Image,
	StyleSheet,
	Text,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import Ion from "react-native-vector-icons/Ionicons";
import testImage from "../assets/images/_.png";
import testImage2 from "../assets/images/hello.jpg";
import { constants } from "../styles";
const Incoming = () => (
	<View style={styles.incoming}>
		<Text>This is a message from a different Person</Text>
		<View style={styles.extra}>
			<Text style={styles.time}>09:08 AM</Text>
			<TouchableOpacity>
				<Ion name="trash-outline" size={12} />
			</TouchableOpacity>
		</View>
	</View>
);

const Outgoing = () => (
	<View style={styles.outgoing}>
		<Text>
			This is a message from Sender. This is a message from a different Person
			and I want it to be as long as It can be to see what happens when someone
			is angry. This is a message from a different Person and I want it to be as
			long as It can be to see what happens when someone is angry.
		</Text>
	</View>
);
export default function Chat({ visible, setVisible }) {
	const [showChats, toggleChat] = useState(false)
	return (
		<Modal
			transparent={false}
			visible={visible}
			onRequestClose={() => setVisible(false)}
			animationType="slide"
		>
			<SafeAreaView style={styles.container}>
				<View style={styles.actors}>
					<TouchableOpacity onLongPress={() => toggleChat(!showChats)}>
					<View style={styles.innerSections}>
						<View style={styles.circled}>
							<Image source={testImage} style={styles.avatar} />
						</View>
						<Text style={styles.authorName}>Bill Greatness</Text>
					</View>
					</TouchableOpacity>

					<View style={styles.innerSections}>
						<Text style={styles.authorName}>You</Text>
						<View style={styles.circled}>
							<Image source={testImage2} style={styles.avatar} />
						</View>
					</View>
				</View>
				{showChats && <View style={styles.chatPersons}>
					{/* Possible Chat */}
					<Text style={styles.receiver}>Random 1</Text>
					<Text style={styles.receiver}>Random 2</Text>
					<Text style={styles.receiver}>Random 3</Text>
				</View>}
				<ScrollView>
					{[1, 2, 3, 4].map((msg) => (
						<View key={msg}>
							<Incoming />
							<Outgoing />
						</View>
					))}
				</ScrollView>
				<View style={constants.commentInput}>
					<TextInput
						multiline
						placeholderTextColor="#ccc"
						placeholder="Compose your message"
					/>
					<TouchableOpacity>
						<Ion name="md-send" size={24} color="black" />
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		</Modal>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingBottom: 50,
	},
	chatPersons:{
		width:200,
		backgroundColor:'#fff',
		position:'absolute',
		top:50,
		left:10,
		display:'flex',
		zIndex:1000
	},
	receiver:{
		color:'#ccc',
		paddingVertical:10,
	},
	incoming: {
		backgroundColor: "forestgreen",
		minHeight: 50,
		margin: 10,
		padding: 10,
		width: "auto",
		maxWidth: "75%",
		display: "flex",
		alignSelf: "flex-start",
		borderBottomRightRadius: 15,
		borderTopRightRadius: 15,
		borderTopLeftRadius: 15,
	},
	outgoing: {
		backgroundColor: "teal",
		minHeight: 50,
		margin: 10,
		display: "flex",
		alignSelf: "flex-end",
		padding: 15,
		width: "auto",
		maxWidth: "75%",
		borderBottomLeftRadius: 15,
		borderTopRightRadius: 15,
		borderTopLeftRadius: 15,
	},
	extra: {
		borderTopWidth: StyleSheet.hairlineWidth,
		borderTopColor: "#fff",
		marginTop: 5,
		display: "flex",
		justifyContent: "flex-end",
		alignItems: "center",
		flexDirection: "row",
	},
	time: {
		fontSize: 12,
		paddingHorizontal: 5,
	},
	actors: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 10,
	},
	avatar: {
		width: 30,
		height: 30,
		resizeMode: "cover",
		borderRadius: 60,
	},
	authorName: {
		fontSize: 15,
		fontWeight: "600",
		color: "#000",
		paddingHorizontal: 3,
	},
	innerSections: {
		display: "flex",
		alignItems: "center",
		flexDirection: "row",
	},
	circled: {
		borderRadius: 100,
	},
});
