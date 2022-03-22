import React, { useEffect, useState, useMemo } from "react";
import auth from "@react-native-firebase/auth";
import {
  SafeAreaView,
  Text,
  Image,
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Edit } from "../components/profile";
import Top from "../layout/top";
import { getAuthorComments, getAuthorPosts } from "../providers/api";
import { renderPost, renderComment } from "../components/functions/callers";
import {getDocument} from '../components/functions'
import { PLACEIMAGE, BACKGROUND } from "../assets/images";
import firestore from "@react-native-firebase/firestore";

export default function Profile() {

  const authorId = auth().currentUser.uid;

  const getUserInfo = async (id) => {
    const data = getDocument("Users", id).get()
    return data
  };

  const [tile, setTile] = useState("Posts");
  const [posts, getPosts] = useState([]);
  const user = useMemo(() => getUserInfo(authorId), [authorId]);
  const [comments, setComments] = useState([]);

 

  useEffect(() => {
    getAuthorPosts({ id: authorId, getInfo: (data) => getPosts(data) });
    getAuthorComments({ id: authorId, getInfo: (comm) => setComments(comm) });
  }, [authorId]);

  const setStyle = (node) => {
    return tile === node ? styles.activeTile : styles.stale;
  };
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
      height: 190,
    },
    imageContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 20,
      minHeight: 250,
    },
    profileImage: {
      resizeMode: "contain",
      width: 100,
      height: 100,
      borderRadius: 1000,
    },
    name: {
      fontSize: 20,
      color: "#000",
      textAlign: "center",
      fontWeight: "200",
    },
    joined: {
      textAlign: "center",
      fontSize: 12,
      color: "darkgray",
    },
    tiles: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      marginBottom: 15,
      paddingVertical: 20,
    },
    tile: {
      textTransform: "uppercase",
      fontWeight: "bold",
      color: "#000",
      letterSpacing: 0.7,
    },
    activeTile: {
      borderBottomWidth: 1.5,
      borderBottomColor: "#000",
    },
    stale: {
      borderBottomColor: "currentColor",
    },
    interestContainer: {
      display: "flex",
      flex: 1,
      flexDirection: "row",
      flexWrap: "wrap",
    },
  });

  const filterComments = () => {
    let temp = [];
    for (var dt of comments) {
      for (var info of dt._data.meta.comments) {
        if (info.author === authorId) {
          temp.push({
            info,
            date: dt._data.meta.nativeDate,
            title: dt._data.title,
            content: dt._data.content,
            author: dt._data.author,
          });
        }
      }
    }
    return temp;
  };

  console.log(user);
  const switchNode = (node) => {
    switch (node) {
      case "Comments":
        return (
          <FlatList
            scrollEnabled={true}
            data={filterComments()}
            renderItem={renderComment}
            keyExtractor={(post) => post.author}
          />
        );
      case "Posts":
        return (
          <FlatList
            scrollEnabled={true}
            data={posts}
            renderItem={renderPost}
            keyExtractor={(post) => post.id}
          />
        );
      default:
        return <Edit authorId={auth().currentUser.uid} />;
    }
  };
  return (
    <SafeAreaView>
      <Top />
      <ImageBackground
        source={{ uri: BACKGROUND }}
        style={styles.imageContainer}
      >
        <TouchableOpacity>
          <Image
            style={styles.profileImage}
            source={{
              uri: auth().currentUser.photoURL ?? PLACEIMAGE,
            }}
          />
        </TouchableOpacity>

        <Text style={styles.name}>
          {auth().currentUser.displayName ?? "Anon User"}
        </Text>
        <Text style={styles.joined}>Joined: 02/02/2022</Text>
      </ImageBackground>
      <View style={styles.tiles}>
        <TouchableOpacity
          onPress={() => setTile("Posts")}
          style={setStyle("Posts")}
        >
          <Text style={styles.tile}>Posts</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setTile("Comments")}
          style={setStyle("Comments")}
        >
          <Text style={styles.tile}>Comments</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setTile("Interests")}
          style={setStyle("Interests")}
        >
          <Text style={styles.tile}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={{ display: "flex", flex: 1, flexDirection: "column" }}>
        {switchNode(tile)}
      </View>
    </SafeAreaView>
  );
}
