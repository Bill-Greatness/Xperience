import React, { useState } from "react";
import {
  View,
  StatusBar,
  SafeAreaView,
  Text,
  ImageBackground,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Ion from "react-native-vector-icons/Ionicons";
import testImage from "../assets/images/testBackground.jpg";
import { onTwitterButtonPress, onGoogleButtonPress } from "../components/login";
import auth from "@react-native-firebase/auth";

export default function Login() {
  const [pwd, setPwd] = useState("");
  const [mail, setMail] = useState("");

  const createUser = async () => {
    await auth().signInWithEmailAndPassword(mail, pwd);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#ccc" />
      <ImageBackground
        style={styles.background}
        resizeMode="cover"
        source={testImage}
      >
        <View style={styles.welcome}>
          <Text style={styles.tagHeader}>Welcome to Xperience</Text>
          <Text style={styles.tagline}>You are Not Alone!</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.loginLink}>SOCIAL LOGIN</Text>
          <View style={styles.socials}>
            <TouchableOpacity
              onPress={() =>
                onTwitterButtonPress().then(() => console.log("Success"))
              }
            >
              <View style={styles.socialView}>
                <Ion size={30} color="teal" name="logo-twitter" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.socialView}>
                <Ion size={30} color="blue" name="logo-facebook" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                onGoogleButtonPress().then(() =>
                  console.log("Signed in with Google")
                )
              }
            >
              <View style={styles.socialView}>
                <Ion size={30} color="red" name="logo-google" />
              </View>
            </TouchableOpacity>
          </View>
          <Text style={styles.loginLink}>CUSTOM LOGIN</Text>
          <View style={styles.iconInput}>
            <Ion name="person-circle" size={24} color="black" />
            <TextInput
              placeholderTextColor="darkgray"
              autoComplete="email"
              onChangeText={(info) => setMail(info)}
              style={styles.inputs}
              placeholder="Email"
            />
          </View>
          <View style={styles.iconInput}>
            <Ion name="ios-lock-closed" size={24} color="black" />
            <TextInput
              autoComplete="password"
              onChangeText={(info) => setPwd(info)}
              secureTextEntry={true}
              contextMenuHidden
              placeholderTextColor="darkgray"
              style={styles.inputs}
              placeholder="Password"
            />
          </View>

          <Button onPress={() => createUser()} title="Continue" />
          <View>
            <Text style={styles.linkTexts}>Forgotten Password?</Text>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  tagline: {
    fontSize: 17,
  },
  tagHeader: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "800",
  },
  socials: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingVertical: 5,
  },
  inputContainer: {
    backgroundColor: "#fff",
    width: "97%",
    height: "70%",
    alignItems: "center",
    borderTopRightRadius: 50,
  },
  inputs: {
    borderBottomWidth: 1.2,
    borderColor: "black",
    width: 300,
    marginVertical: 10,
    color: "#000",
  },
  background: {
    flex: 1,
    display: "flex",
    width: "100%",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  welcome: {
    alignItems: "center",
    justifyContent: "center",
    height: "45%",
  },
  socialView: {
    shadowOffset: {
      width: 50,
      height: 50,
    },
    borderRadius: 100,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    padding: 10,
    backgroundColor: "#ccc",
    shadowColor: "black",
    elevation: 5,
  },
  loginLink: {
    color: "black",
    alignSelf: "flex-start",
    padding: 15,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  linkTexts: {
    color: "blue",
  },
  iconInput: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
