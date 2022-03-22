import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { constants } from "../../styles";
import { renderPost } from "../functions/callers";
import { getAuthor, getAuthorPosts } from "../../providers/api";

export default function ProfileInfo({ route }) {
  const [author, setAuthor] = useState({});
  const [posts, setPosts] = useState([]);
  const { authorId } = route.params;
  useEffect(() => {
    getAuthor({ id: authorId, getInfo: (user) => setAuthor(user) });
    getAuthorPosts({ id: authorId, getInfo: (info) => setPosts(info) });
  }, [authorId]);

  return (
    <View style={constants.container}>
      <View style={constants.profileView}>
        {/* Author Profile */}
        <View style={styles.profileContent}>
          <Image source={{uri: author.photoURL}} style={styles.profileImage} />
          <View>
            <Text style={constants.authorName}>{author.displayName}</Text>
            <View style={styles.row}>
              <Text style={constants.subInfo}>Reputations</Text>
              <Text style={constants.subInfo}>{posts.length} Posts</Text>
            </View>
          </View>
        </View>
        {/* Date joined - Right Side */}
        <View>
          <Text style={constants.dates}>Date Joined</Text>
          <Text style={constants.dates}>Last Posted on: .... </Text>
        </View>
      </View>
		<View style={{borderBottomWidth:StyleSheet.hairlineWidth}}/>

      <View style={styles.content}>
        <FlatList
          renderItem={renderPost}
          data={posts}
          keyExtractor={(post) => post.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileImage: {
    width: 40,
    height: 40,
	borderRadius:100,
    resizeMode: "contain",
  },
  row: {
    flexDirection: "row",
	paddingHorizontal:10
  },
  profileContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  content: {
    display: "flex",
    flex: 1,
  },
});
