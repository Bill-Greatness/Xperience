import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Posts from "./Posts";
import {Info} from '../components/profile'
export default function Poster() {
	const Stack = createStackNavigator();

	return (
		<Stack.Navigator
		initialRouteName="Timeline"
		screenOptions={{
			headerShown:false
		}}
		>
			<Stack.Screen name="Timeline" component={Posts} />
			<Stack.Screen name="Author" component={Info} />
		</Stack.Navigator>
	);
}