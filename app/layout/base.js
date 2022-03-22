import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ion from "react-native-vector-icons/Ionicons";
import Simple from "react-native-vector-icons/SimpleLineIcons";
import Fontisto from "react-native-vector-icons/Fontisto";

import { Posts, Profile, Alert, Search } from "../screens";
import { ThemeContext } from "../providers/context";
export default function Base() {
  const theme = useContext(ThemeContext) === "light" ? "#082c6c" : "#2069e0";

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Posts"
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor:
            useContext(ThemeContext) === "light" ? "#fff" : "#082c6c",
        },
      }}
    >
      <Tab.Screen
        name="Posts"
        component={Posts}
        options={{
          tabBarLabel: "Posts",
          tabBarIcon: ({ size }) => (
            <Ion name="home-outline" color={theme} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Alert}
        options={{
          tabBarLabel: "Alerts",
          tabBarIcon: ({ size }) => (
            <Fontisto name="bell" color={theme} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ size }) => (
            <Ion name="search" color={theme} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ size }) => (
            <Simple name="user" color={theme} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
