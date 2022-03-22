import React, { useState } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  TextInput,
  Switch,
  Pressable,
} from "react-native";
import Ion from "react-native-vector-icons/Ionicons";
import Mi from "react-native-vector-icons/MaterialIcons";
import firestore from "@react-native-firebase/firestore";
import { getFile } from "../functions";
import { launchImageLibrary } from "react-native-image-picker";
import auth from "@react-native-firebase/auth";
import { v4 } from "uuid";
import { BACKGROUND, PLACEIMAGE } from "../../assets/images";
import { showMessage } from "../functions/callers";

export default function Edit({ authorId }) {
  const [isEnabled, setEnabled] = useState(false);
  const [displayName, setDisplayName] = useState(
    auth().currentUser.displayName
  );
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [mail, setMail] = useState(auth().currentUser.email);

  const updateProfile = async () => {
    //cover images
    if (coverImage !== null) {
      await getFile(
        `/profiles/${auth().currentUser.uid}/images/covers/${v4().slice(
          0,
          20
        )}`,
        coverImage,
        setCoverImage
      );
    }

    if (profileImage !== null) {
      await getFile(
        `/profiles/${auth().currentUser.uid}/images/profile/${v4().slice(
          0,
          20
        )}`,
        profileImage,
        setProfileImage
      );
    }
    const data = {
      displayName: displayName ?? "Anon",
      photoURL: profileImage ?? PLACEIMAGE,
      email: auth().currentUser.email ?? mail,
    };
    auth()
      .currentUser.updateProfile({ ...data })
      .then(() => {
        //update user collection
        firestore()
          .collection("Users")
          .doc(auth().currentUser.uid)
          .update({
            ...data,
            coverImage: coverImage ?? BACKGROUND,
            isAnon: isEnabled,
          })
          .then(() => showMessage("Profile Update Successful"))
          .catch((err) => showMessage(err.message));
      })
      .catch((err) => showMessage(err.message));
  };
  return (
    <View style={styles.container}>
      <View style={styles.editor}>
        <View style={styles.iconInput}>
          <Ion name="person-circle" size={24} color="black" />
          <TextInput
            placeholderTextColor="darkgray"
            style={styles.inputs}
            value={displayName}
            onChangeText={(name) => setDisplayName(name)}
            placeholder="Display Name"
          />
        </View>
        <View style={styles.iconInput}>
          <Ion name="person-circle" size={24} color="black" />
          <TextInput
            keyboardType="email-address"
            placeholderTextColor="darkgray"
            style={styles.inputs}
            value={mail}
            onChangeText={(email) => setMail(email)}
            placeholder="Email"
            editable={auth().currentUser.email !== ""}
          />
        </View>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            paddingVertical: 15,
          }}
        >
          <View
            style={{
              justifyContent: "space-between",
              paddingHorizontal: 5,
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Text>Post as Anonymous</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              value={isEnabled}
              onChange={() => setEnabled(!isEnabled)}
            />
          </View>
        </View>

        <View>
          <Pressable
            style={styles.press}
            onPress={() =>
              launchImageLibrary(
                {
                  mediaType: "photo",
                  quality: 1,
                },
                (resp) => {
                  const { uri } = resp.assets[0];
                  setCoverImage(uri);
                }
              )
            }
          >
            <Mi name="insert-photo" size={24} />
            <Text style={styles.desc}>
              Cover Image {coverImage && coverImage.slice(80)}
            </Text>
          </Pressable>
          <Pressable
            style={styles.press}
            onPress={() =>
              launchImageLibrary(
                {
                  mediaType: "photo",
                  quality: 1,
                },
                (resp) => {
                  const { uri } = resp.assets[0];
                  setProfileImage(uri);
                }
              )
            }
          >
            <Ion name="camera" size={24} />
            <Text style={styles.desc}>
              Profile Image {profileImage && profileImage.slice(80)}
            </Text>
          </Pressable>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            paddingVertical: 10,
          }}
        >
          <Button
            disabled={!displayName && !profileImage && !coverImage}
            onPress={() => updateProfile()}
            color={"teal"}
            title="Update Profile"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
  },
  imageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    minHeight: 250,
  },
  editor: {
    paddingHorizontal: 20,
    minHeight: 150,
  },
  iconInput: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  inputs: {
    borderBottomWidth: 1.2,
    borderColor: "black",
    width: 300,
    marginVertical: 10,
    color: "#000",
  },
  press: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  desc: {
    paddingHorizontal: 5,
  },
});
