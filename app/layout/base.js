import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Ion from 'react-native-vector-icons/Ionicons'
import Simple from 'react-native-vector-icons/SimpleLineIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'

import {Posts, Profile, Alert} from '../screens'
export default function Base(){
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator initialRouteName="Posts" screenOptions={{
      tabBarShowLabel:false,
      headerShown:false
    }}>
      <Tab.Screen name="Posts" component={Posts}  options={{
        tabBarLabel:'Posts',
        tabBarIcon:({color, size}) => (
          <Ion name="home-outline" color={color} size={size} />
        )
      }}/> 
      <Tab.Screen name="Notification" component={Alert} options={{
        tabBarLabel:"Alerts",
        tabBarIcon:({color, size}) =>(
          <Fontisto name="bell" size={size} color={color} />
        )
      }}/> 
      <Tab.Screen name="Tagged" component={Posts} options={{
        tabBarLabel:'Tagged',
        tabBarIcon:({color, size}) =>(
          <Ion name="bookmarks-outline" size={size} color={color} />
        )
      }}/>
      <Tab.Screen name="Profile" component={Profile} options={{
        tabBarLabel:'Profile',
        tabBarIcon:({color, size}) => (
          <Simple name="user" color={color} size={size} />
        )
      }} />
    </Tab.Navigator>
  );
}
