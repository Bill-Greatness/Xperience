import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import MI from "react-native-vector-icons/MaterialIcons";
import Ion from "react-native-vector-icons/Ionicons";
import Info from "./Info";
import Edit from './Edit'
import { getAuthor } from "../../providers/api";
import { createChunks, getDelta, reactToPost } from "../functions/callers";

export const AuthorComment = ({ data }) => (
  <View style={styles.container}>
    <View style={styles.comment}>
      <View style={styles.postDetails}>
        <MI name="mark-chat-read" size={24} color="#ccc" />
        <View style={{ paddingLeft: 3 }}>
          <Text style={styles.heading}>{data.title}</Text>
          <Text style={styles.author}>Samuel Smithson</Text>
        </View>
      </View>
      <Text style={styles.date}>{getDelta(new Date(data.date))}</Text>
    </View>
    <View style={{ padding: 15 }}>
      <Text style={styles.userComment}>{data.info.comment}</Text>
    </View>
  </View>
);

export const AuthorPost = ({ data }) => {
  const [author, setAuthor] = useState({});

  useEffect(() => {
    getAuthor({ id: data.author, getInfo: (user) => setAuthor(user) });
  }, [data]);
  return (
    <View style={styles.container}>
      <View style={styles.comment}>
        <View style={styles.postDetails}>
          <Image source={{ uri: author.photoURL }} style={styles.avatar} />
          <View style={{ paddingLeft: 3 }}>
            <Text style={styles.heading}>{data.title}</Text>
            <Text style={styles.date}>
              {getDelta(new Date(data.meta.nativeDate))}
            </Text>
          </View>
        </View>
        <View style={styles.icons}>
          <TouchableOpacity onPress={() => reactToPost(data.id)}>
            <View style={styles.icons}>
              <Text style={styles.counts}>
                {data.meta.likes.length > 0 && data.meta.likes.length}
              </Text>
              <Ion
                name="md-heart"
                size={20}
                color={data.meta.likes.length > 0 ? "orange" : "#ccc"}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.icons}>
              <Ion name="chatbubbles" size={20} color="teal" />
              <Text style={styles.counts}>
                {data.meta.comments.length > 0 && data.meta.comments.length}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ padding: 10 }}>
        <Text style={styles.userComment}>
          {createChunks(data.content, 300)[0]}
        </Text>
      </View>
    </View>
  );
};

export const Interests = () => (
  <View style={styles.container}>
    <View style={styles.outerRow}>
      <View style={styles.innerRow}>
        <Ion name="md-flower" color="orange" size={24} />
        <View style={{ padding: 5 }}>
          <Text style={styles.interest}>Happiness</Text>
          <Text style={styles.stats}>+13,454,1 Others</Text>
        </View>
      </View>
      <Ion size={16} color="red" name="trash-outline" />
    </View>
  </View>
);

export { Info, Edit };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    display: "flex",
    borderBottomColor: "darkgray",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  comment: {
    display: "flex",
    flexDirection: "row",
    alignItem: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  heading: {
    fontWeight: "bold",
    color: "black",
    fontSize: 12,
  },
  author: {
    fontSize: 10,
    color: "#000",
  },
  userComment: {
    color: "#000",
  },
  postDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  date: {
    color: "darkgray",
    fontSize: 10,
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
  },
  counts: {
    color: "#000",
    paddingLeft: 3,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  interest: {
    color: "#000",
    fontSize: 16,
  },
  stats: {
    fontSize: 10,
    color: "darkgray",
  },
  outerRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    justifyContent: "space-between",
  },
  innerRow: {
    flexDirection: "row",
    alignItems: "center",
    width: 160,
  },
});
