import React,{useState} from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Ion from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';
import {Chat} from '../screens';
export default function Top() {
	const currentRoute = useRoute().name;
	const navigate = useNavigation();
	const [visible, setVisible] = useState(false);

	const RouteIcon = () => {
		if (currentRoute === 'Search') {
			return (
				<View
					style={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
					}}
				>
					<TextInput
						returnKeyType="search"
						style={styles.searchInput}
						maxLength={35}
						placeholder="Search Trending Xperience"
						placeholderTextColor="#000"
					/>
					<TouchableOpacity>
						<Ion name="search" size={24} color={'#000'} />
					</TouchableOpacity>
				</View>
			);
		}

		if (currentRoute === 'Profile') {
			return (
				<TouchableOpacity>
					<Ion name="log-out" size={24} color={'#000'} />
				</TouchableOpacity>
			);
		} else {
			return (
				<TouchableOpacity onPress={() => setVisible(true)}>
					<Ion name="ios-chatbubble-outline" size={24} color={'#000'} />
				</TouchableOpacity>
			);
		}
	};

	const goHome = () => {
		navigate.navigate('Posts');
	}
	return (
		<View style={styles.container}>
			<View style={styles.child}>
				<TouchableOpacity onPress={goHome}>
					<Ion name="logo-electron" size={24} color={'#000'} />
				</TouchableOpacity>
			</View>

			<View style={styles.child}>
				<RouteIcon />
			</View>
			<Chat visible={visible} setVisible={setVisible}/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		backgroundColor: '#fff',
		shadowOffset: {
			width: 50,
			height: 50,
		},
		shadowColor: 'black',
		elevation: 10,
		height: 50,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	child: {
		paddingHorizontal: 10,
	},
	searchInput: {
		borderBottomColor: '#fff',
		borderBottomWidth: 2,
		marginHorizontal: 15,
		color: 'black',
	},
});
