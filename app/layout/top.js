import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from "react-native";
import Ion from "react-native-vector-icons/Ionicons";
import Mci from "react-native-vector-icons/MaterialCommunityIcons";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Chat } from "../screens";
import { logOut } from "../components/functions";
import { ThemeContext } from "../providers/context";
import auth from "@react-native-firebase/auth";

export default function Top() {
  const currentRoute = useRoute().name;
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigation();
  const [visible, setVisible] = useState(false);
  const theme = useContext(ThemeContext);

  const RouteIcon = () => {
    if (currentRoute === "Search") {
      return (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TextInput
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
            style={styles.searchInput}
            maxLength={35}
            placeholder="Search Trending Xperience"
            placeholderTextColor="#000"
          />
          <TouchableOpacity onPress={() => {}}>
            <Ion name="search" size={24} color={"#000"} />
          </TouchableOpacity>
        </View>
      );
    }

    if (currentRoute === "Profile") {
      return (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            paddingHorizontal: 5,
          }}
        >
          <TouchableOpacity
            onPress={() =>
              navigate.navigate("Posts", {
                screen: "Edit",
                params: {
                  authorId: auth().currentUser.uid,
                },
              })
            }
            style={{ paddingHorizontal: 10 }}
          >
            <Mci
              name="account-edit"
              size={28}
              color={theme === "light" ? "#000" : "#ccc"}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => logOut()}>
            <Ion
              name="power-sharp"
              size={24}
              color={theme === "light" ? "#000" : "#ccc"}
            />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <TouchableOpacity onPress={() => setVisible(true)}>
          <Ion
            name="ios-chatbubble-outline"
            size={24}
            color={theme === "light" ? "#000" : "#ccc"}
          />
        </TouchableOpacity>
      );
    }
  };

  const goHome = () => {
    navigate.navigate("Posts");
  };

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      backgroundColor: theme === "light" ? "#fff" : "#082c6c",
      shadowOffset: {
        width: 50,
        height: 50,
      },
      shadowColor: "#fff",
      elevation: 10,
      height: 50,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    child: {
      paddingHorizontal: 10,
    },
    searchInput: {
      borderBottomColor: "#fff",
      borderBottomWidth: 2,
      marginHorizontal: 15,
      color: "black",
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={theme === "light" ? "#bebebe" : "#082c6c"} />
      <View style={styles.child}>
        <TouchableOpacity onPress={goHome}>
          <Ion
            name="logo-electron"
            size={24}
            color={theme === "light" ? "#000" : "#ccc"}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.child}>
        <RouteIcon />
      </View>
      <Chat visible={visible} setVisible={setVisible} />
    </View>
  );
}
