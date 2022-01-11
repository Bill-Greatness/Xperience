
import React, { useState, useEffect } from 'react';
import {
	SafeAreaView,
	TouchableHighlight,
	StyleSheet,
	FlatList,
} from 'react-native';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import Top from '../layout/top';
import { NewPost } from '../components/posts';
import { testPost } from '../assets/data';
import {getPosts} from '../providers/posts'
import {renderItem} from '../components/functions/callers'

export default function Posts() {
	const [visible, setVisible] = useState(false);
	const [posts, setPosts] = useState([])

	useEffect(() => {
		getPosts( async (data) => setPosts(data))
	},[])

	return (
		<SafeAreaView style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
			<Top />
			<FlatList
				data={testPost}
				renderItem={renderItem}
				keyExtractor={(post) => post.id}
			/>

			<TouchableHighlight
				style={styles.post}
				onPress={() => setVisible(!visible)}
			>
				<Material name="comment-edit-outline" color="#fff" size={30} />
			</TouchableHighlight>
			<NewPost visible={visible} setVisible={setVisible} />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	post: {
		position: 'absolute',
		width: 50,
		height: 50,
		backgroundColor: '#333',
		borderRadius: 100,
		justifyContent: 'center',
		alignItems: 'center',
		bottom: 20,
		elevation: 5,
		right: 20,
	},
});
