import React, { useEffect, useState } from "react";
import _ from "lodash";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from "react-native";
import { constants } from "../../styles";
import userTest from "../../assets/images/Flier.jpg";
import Ion from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { getDocument, notifyAuthor, updateDocument } from "../functions";
import auth from "@react-native-firebase/auth";
import {
  createChunks,
  getDelta,
  hasLiked,
  reactToPost,
} from "../functions/callers";
import {
  getAuthor,
  getPost,
  getReactor,
  orderComments,
} from "../../providers/api";

const Comment = ({ info }) => {
  const reactor = async (id) => {
    const { displayName, photoURL } = await getReactor({ id: id });

    return { displayName, photoURL };
  };

  return (
    <View style={{ paddingVertical: 10 }}>
      <View style={styles.comment}>
        <View style={styles.commenter}>
          <Image
            style={{ width: 30, height: 30, borderRadius: 100 }}
            source={userTest}
          />
          <View style={{ paddingLeft: 3 }}>
            <Text style={styles.heading}>
              {reactor(info.author).displayName}
            </Text>
            <Text style={styles.date}>{getDelta(new Date(info.time))}</Text>
          </View>
        </View>
      </View>
      <View style={{ paddingLeft: 45, paddingRight: 5, paddingVertical: 2 }}>
        <Text style={styles.userComment}>{info.comment}</Text>
      </View>
    </View>
  );
};

const Post = ({ info }) => {
  return (
    <View style={styles.postPadding}>
      {createChunks(info.content ?? "Loading Xperience", 300)?.map(
        (pd, idx) => (
          <View key={pd}>
            <Text style={styles.counts}>Episode {idx + 1}</Text>
            <View style={styles.contentContainer}>
              <Text style={styles.postContent}>{pd}</Text>
            </View>
          </View>
        )
      )}
    </View>
  );
};

export const Details = ({ route }) => {
  const { actionType, postId, meta } = route.params;

  const [comment, setComment] = useState("");
  const [author, setAuthor] = useState({});

  const [info, setInfo] = useState({});

  useEffect(() => {
    getPost({ id: postId, getInfo: (post) => setInfo(post) });
    getAuthor({ id: meta.authorId, getInfo: (user) => setAuthor(user) });
  }, [postId]);

  const Navigator = useNavigation();
  const navigateToComment = () => {
    return Navigator.navigate("Posts", {
      screen: "Details",
      params: {
        actionType: "Comments",
        author: author,
      },
    });
  };
  const addComment = () => {
    const info = {
      comment,
      author: auth().currentUser.uid,
      commentId: new Date().getTime(),
      time: new Date().toLocaleString("en-GB"),
    };
    const { data } = getDocument("Posts", postId).get({
      source: "server",
    });

    const postData = {
      ...data,
      meta: {
        ...meta,
        comments: [...meta.comments, info],
        commenters: _.uniq([...meta.commenters, meta.authorId]),
      },
    };
    updateDocument("Posts", postId, postData).then(() => {
      setComment("");
      const userName = auth().currentUser.displayName ?? "Anon";
      if (data.author !== auth.currentUser.uid) {
        notifyAuthor({
          creator: userName,
          creatorId: auth().currentUser.uid,
          postId,
          postCreator: data.author,
          date: new Date().toLocaleString(),
          content: `${userName} wrote something about your post.`,
        });
      }
    });
  };

  return (
    <SafeAreaView style={constants.container}>
      <ScrollView style={styles.container} stickyHeaderIndices={[0]}>
        <View style={{ backgroundColor: "#fff" }}>
          <View style={styles.headerView}>
            <View style={styles.header}>
              <Image
                source={{ uri: author.photoURL }}
                style={{ width: 40, height: 40, borderRadius: 100 }}
              />
              <View>
                <Text style={styles.postHeader}>{info.title}</Text>
                <Text style={styles.postSub}>
                  {author.displayName} - {getDelta(new Date(meta.nativeDate))}
                </Text>
              </View>
            </View>
            <View style={styles.actionRows}>
              <TouchableOpacity onPress={() => reactToPost(postId)}>
                <Ion
                  name="md-heart"
                  size={24}
                  color={hasLiked(meta.likes) ? "#ccc" : "orange"}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigateToComment()}>
                <Ion
                  name="chatbubbles"
                  size={24}
                  color={actionType === "Post" ? "black" : "crimson"}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* Action type is Post */}
        {actionType === "Post" ? (
          <Post postId={postId} info={info} />
        ) : (
          <>
            {orderComments({ meta: meta.comments }).map((info) => (
              <Comment info={info} key={info.commentId} author={author} />
            ))}
          </>
        )}
      </ScrollView>
      <View style={constants.commentInput}>
        <TextInput
          value={comment}
          onChangeText={(text) => setComment(text)}
          multiline
          placeholderTextColor="#ccc"
          placeholder="You can Comment Here."
        />
        <TouchableOpacity onPress={() => addComment()}>
          <Ion name="md-send" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: "95%",
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    padding: 15,
  },
  postHeader: {
    fontWeight: "500",
    color: "#000",
    fontSize: 15,
    paddingHorizontal: 7,
  },
  postSub: {
    color: "black",
    fontSize: 12,
    paddingHorizontal: 8,
  },
  postContent: {
    color: "#000",
    fontSize: 15,
  },
  contentContainer: {
    paddingHorizontal: 30,
  },
  counts: {
    color: "black",
    fontWeight: "800",
    fontSize: 16,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  headerView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionRows: {
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  userComment: {
    color: "#000",
  },
  commenter: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  date: {
    color: "darkgray",
    fontSize: 10,
  },
  comment: {
    display: "flex",
    flexDirection: "row",
    alignItem: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  heading: {
    fontWeight: "bold",
    color: "black",
    fontSize: 12,
  },
  postPadding: {
    paddingBottom: 50,
  },
});
