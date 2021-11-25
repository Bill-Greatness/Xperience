import React from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { constants } from "../../styles";
import testImage from "../../assets/images/_.png";
import { ScrollView } from "react-native";

import { renderItem } from "../functions/callers";
import { testPost } from "../../assets/data";
export default function ProfileInfo({ userId }) {
	return (
		<View style={constants.container}>
			<View style={constants.profileView}>
				{/* Author Profile */}
				<View style={styles.profileContent}>
					<Image source={testImage} style={styles.profileImage} />
					<View>
						<Text style={constants.authorName}>Name of Author </Text>
						<View style={styles.row}>
							<Text style={constants.subInfo}>Reputations</Text>
							<Text style={constants.subInfo}>Posts</Text>
						</View>
					</View>
				</View>
				{/* Date joined - Right Side */}
				<View>
					<Text style={constants.dates}>Date Joined</Text>
					<Text style={constants.dates}>Last Posted on: .... </Text>
				</View>
			</View>
			<View style={styles.content}>
			
					<FlatList 
                        renderItem={renderItem} 
                        data={testPost}
                        keyExtractor={post => post.id}
                    />
			
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	profileImage: {
		width: 50,
		height: 50,
		resizeMode: "contain",
	},
	row: {
		flexDirection: "row",
	},
	profileContent: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
	},
	content: {
		display: "flex",
		flex: 1
	},
});
