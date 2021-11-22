/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React from "react";
import { View, Modal, Image, StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";
import Ion from 'react-native-vector-icons/Ionicons'
import testImage from '../assets/images/_.png'
import testImage2 from '../assets/images/hello.jpg'
const Incoming = () => (
	<View style={styles.incoming}>
		<Text>
			This is a message from a different Person and I want it to be as long as
			It can be to see what happens when someone is angry.
		</Text>
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
export default function Chat({visible, setVisible}) {
	return (
		<Modal
      transparent={false}
      visible={visible}
      onRequestClose={() => setVisible(false)}
      animationType="slide"
    >
		<View style={styles.container}>
			<View style={styles.actors}>
				<View style={styles.innerSections}>
					<View style={styles.circled}>

					<Image source={testImage} style={styles.avatar}/>
					</View>
					<Text style={styles.authorName}>Bill Greatness</Text>
				</View>

				<View style={styles.innerSections}>
					<Text style={styles.authorName}>You</Text>
					<View style={styles.circled}>

					<Image source={testImage2} style={styles.avatar}/>
					</View>
				</View>
			</View>
			<ScrollView>
				{[1, 2, 3, 4].map((msg) => (
					<View key={msg}>
						<Incoming />
						<Outgoing />
					</View>
				))}
			</ScrollView>
		</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	incoming: {
		backgroundColor: "forestgreen",
		minHeight: 50,
		margin: 10,
		padding: 10,
		width: "80%",
		display: "flex",
		alignSelf: "flex-start",
		borderRadius: 5,
	},
	outgoing: {
		backgroundColor: "teal",
		minHeight: 50,
		margin:10,
		display: "flex",
		alignSelf: "flex-end",
		padding: 10,
		width: "80%",
		borderRadius: 5,
	},
	extra:{
		borderTopWidth:StyleSheet.hairlineWidth,
		borderTopColor:'#fff',
		marginTop:5,
		display:"flex",
		justifyContent:'flex-end',
		alignItems:'center',
		flexDirection:'row'
	},
	time:{
		fontSize:12,
		paddingHorizontal:5
	},
	actors:{
		display:'flex',
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'space-between',
		padding:10
	},
	avatar:{
		width:30,
		height:30,
		resizeMode:'cover',
		borderRadius:60
	},
	authorName:{
		fontSize:15,
		fontWeight:'600',
		color:'#000',
		paddingHorizontal:3
	},
	innerSections:{
		display:'flex',
		alignItems:'center',
		flexDirection:'row'
	},
	circled:{
		borderRadius:100
	}
});
