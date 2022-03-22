import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  TouchableHighlight,
  StyleSheet,
  FlatList,
} from "react-native";
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import Top from "../layout/top";
import { NewPost } from "../components/posts";
import { getPosts } from "../providers/posts";
import { renderItem } from "../components/functions/callers";
import { useContext } from "react";
import { ThemeContext } from "../providers/context";

export default function Posts() {
  const [visible, setVisible] = useState(false);
  const [posts, setPosts] = useState([]);
  const theme = useContext(ThemeContext);
  useEffect(() => {
    getPosts(async (data) => setPosts(data));
  }, []);

  const styles = StyleSheet.create({
    post: {
      position: "absolute",
      width: 50,
      height: 50,
      backgroundColor: theme === "light" ? "#333" : "#082c6c",
      borderRadius: 100,
      justifyContent: "center",
      alignItems: "center",
      bottom: 20,
      elevation: 5,
      right: 20,
    },
  });

  return (
    <SafeAreaView
      style={{
        display: "flex",
        backgroundColor: theme === 'light' ?  '#fff': "#000",
        flexDirection: "column",
        flex: 1,
      }}
    >
      <Top />
      <FlatList
        data={posts}
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
