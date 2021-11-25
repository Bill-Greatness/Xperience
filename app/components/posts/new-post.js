/* eslint-disable quotes */
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Text,
  TextInput,
  Button,
  TouchableHighlight,
} from "react-native";
import Ion from "react-native-vector-icons/Ionicons";
import { newPost } from "../functions";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

export default function Post({ visible, setVisible }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const postContent = () => {
    newPost(title, content);
  };
  return (
    <Modal
      transparent={false}
      statusBarTranslucent
      visible={visible}
      onRequestClose={() => setVisible(false)}
      animationType="slide"
    >
      
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.header}>Share Some Experience</Text>
            <View style={styles.inputView}>
              <TextInput
                value={title}
                onChangeText={(text) => setTitle(text)}
                style={styles.inputs}
                placeholderTextColor="silver"
                placeholder="Title/Summary"
              />

              <TextInput
                value={content}
                onChangeText={(text) => setContent(text)}
                style={styles.inputs}
                multiline
                placeholder="Content"
                placeholderTextColor="silver"
                maxLength={500}
                numberOfLines={5}
              />

              <View style={{ display: "flex", flexDirection: "row" }}>
                <TouchableHighlight
                  onPress={() =>
                    launchImageLibrary(
                      {
                        mediaType: "photo",
                        quality: 1,
                      },
                      (resp) => console.log(resp)
                    )
                  }
                  style={styles.pickButtons}
                >
                  <Ion color="darkgray" name="ios-image-outline" size={20} />
                </TouchableHighlight>
                <TouchableHighlight
                  onPress={() =>
                    launchCamera(
                      {
                        mediaType: "photo",
                        quality: 1,
                        saveToPhotos: true,
                      },
                      (resp) => console.log(resp)
                    )
                  }
                  style={styles.pickButtons}
                >
                  <Ion name="camera-outline" size={20} color="darkgray" />
                </TouchableHighlight>
              </View>

              <Button onClick={() => postContent()} title="Post Experience" />
            </View>
          </View>
        </View>
      
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    marginTop: 15,
  },

  modalView: {
    margin: 20,
    flex: 1,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    fontWeight: "bold",
    color: "darkgray",
    marginVertical: 10,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  inputs: {
    borderWidth: 1,
    borderRadius: 2,
    marginVertical: 5,
    color: "#000",
  },
  inputView: {
    minWidth: 350,
  },
  pickButtons: {
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
});
