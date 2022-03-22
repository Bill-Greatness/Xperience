import React, { useState, useEffect, useContext } from "react";
import { onShare } from "../functions";
import {
  View,
  TouchableOpacity,
  Pressable,
  Image,
  StyleSheet,
  Text,
} from "react-native";
import NewPost from "./new-post";
import Ion from "react-native-vector-icons/Ionicons";
import MCI from "react-native-vector-icons/MaterialCommunityIcons";
import { ThemeContext } from "../../providers/context";
import { useNavigation } from "@react-navigation/native";
import { ImageInfo } from "./images";
import auth from "@react-native-firebase/auth";
import _ from "lodash";
import { createChunks, getDelta, reactToPost } from "../functions/callers";
import { getAuthor, deletePost } from "../../providers/api";

const styles = StyleSheet.create({
  postContainer: {
    display: "flex",
    margin: 3,
    borderRadius: 5,
    backgroundColor: "#fff",
    flexDirection: "column",
    minHeight: 100,
    shadowOffset: { width: 0, height: 10 },
    shadowColor: "#000",
    elevation: 1,
    shadowOpacity: 0.75,
  },
  postHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  postDetails: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 5,
    alignItems: "center",
  },
  userData: {
    display: "flex",
    flexDirection: "column",
    paddingVertical: 10,
  },
  postContent: {
    padding: 10,
  },
  contentText: {
    color: "#000",
  },
  postActions: {
    display: "flex",
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "darkgray",
  },
  title: {
    textTransform: "capitalize",
    color: "darkgray",
    fontWeight: "bold",
    letterSpacing: 1.2,
    paddingVertical: 5,
  },
  postAction: {
    display: "flex",
    flexDirection: "row",
  },
  author: {
    fontSize: 16,
    paddingLeft: 3,
    fontWeight: "800",
    color: "#000",
  },
  time: {
    fontSize: 10,
    paddingTop: 0,
    color: "darkblue",
    paddingLeft: 5,
  },
  stats: {
    paddingVertical: 2,
    paddingHorizontal: 3,
    color: "#000",
  },
  imageContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 180,
  },
  postImage: {
    flex: 1,
    aspectRatio: 2.0,
    resizeMode: "cover",
  },
  postCount: {
    color: "black",
    paddingHorizontal: 10,
  },
});

const Author = ({ info, postId, chunk }) => {
  const Navigator = useNavigation();
  const theme = useContext(ThemeContext)

  const [author, setAuthor] = useState({});
  useEffect(() => {
    getAuthor({ id: info.authorId, getInfo: (user) => setAuthor(user) });
  }, [info]);

  const goToProfile = (authorId) => {
    return Navigator.navigate("Posts", {
      screen: "Author",
      params: {
        authorId,
      },
    });
  };

  const goToPost = (postId) => {
    return Navigator.navigate("Posts", {
      screen: "Details",
      params: {
        postId,
        actionType: "Post",
        author: author,
        meta: info,
      },
    });
  };

  return (
    <View style={styles.postHeader}>
      <TouchableOpacity onPress={() => goToProfile(info.authorId)}>
        <View style={styles.postDetails}>
          <Image
            style={{ borderRadius: 100 }}
            source={{ uri: author.photoURL }}
            width={40}
            height={40}
          />
          <View style={styles.userData}>
            <Text style={{...styles.author, color: theme === 'light' ? "#000" : '#2069e0' }}>{author.displayName}</Text>
            <Text style={styles.time}>
              {getDelta(new Date(info.nativeDate))}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <View style={{ paddingHorizontal: 10 }}>
        {info.authorId === auth().currentUser.uid ? (
          <TouchableOpacity onPress={() => deletePost({ id: postId })}>
            <Ion name="ios-trash" size={15} color="crimson" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => goToPost(postId)}>
            <Text style={styles.postCount}>1/{chunk}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const Reactions = ({ postId, meta }) => {
  const userId = auth().currentUser.uid;
  const theme = useContext(ThemeContext) === 'light' ? '#000' : "#2069e0";
  const Navigator = useNavigation();

  const goToComments = () => {
    return Navigator.navigate("Posts", {
      screen: "Details",
      params: {
        actionType: "Comments",
        postId,
        meta,
      },
    });
  };

  const hasLiked = (id) => {
    const hasReacted = _.find(meta.likes, (info) => info.reactor === userId);

    return hasReacted === undefined;
  };

  return (
    <View style={styles.postActions}>
      <TouchableOpacity onPress={() => reactToPost(postId)}>
        <View style={styles.postAction}>
          <Ion
            name={hasLiked(postId) ? "ios-heart-outline" : "ios-heart"}
            size={18}
            color={hasLiked(postId) ? "#ccc" : "orange"}
          />
          <Text style={styles.stats}>
            {meta.likes.length > 0 && meta.likes.length}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => goToComments()}>
        <View style={styles.postAction}>
          <Ion name="md-chatbubbles-outline" size={20} color={theme} />
          <Text style={styles.stats}>
            {meta.comments.length > 0 && meta.comments.length}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onShare}>
        <MCI name="share-outline" size={24} color={theme} />
      </TouchableOpacity>
    </View>
  );
};

const TextContent = ({ data }) => {
  return (
    <View style={styles.postContent}>
      <Text style={styles.title}>{data.title} </Text>
      <Text style={{...styles.contentText, fontSize:14}}>{data.content}</Text>
    </View>
  );
};

const ImageContent = ({ data }) => {
  const [show, setShow] = useState(false);
  return (
    <View style={{ marginBottom: 7 }}>
      <Pressable style={styles.imageContainer} onPress={() => setShow(true)}>
        <Image style={styles.postImage} source={{ uri: data.photo }} />
      </Pressable>
      <ImageInfo show={show} setShow={setShow} uri={data.photo} />
    </View>
  );
};
export const TextPost = ({ data }) => {
  const chuncked = createChunks(data.content, 300);
  const info = {
    title: data.title,
    content: chuncked[0],
  };
  const theme = useContext(ThemeContext);
  return (
    <View
      style={{
        ...styles.postContainer,
        backgroundColor: theme === "light" ? "#fff" : "#082c6c",
      }}
    >
      <Author chunk={chuncked.length} info={data.meta} postId={data.id} />
      <TextContent data={info} />
      <Reactions postId={data.id} meta={data.meta} />
    </View>
  );
};

export const ImagePost = ({ data }) => {
  const [visible, setVisible] = useState(false);
  const chuncked = createChunks(data.content, 300);
  const theme = useContext(ThemeContext);
  const info = {
    title: data.title,
    content: chuncked[0],
  };
  return (
    <View
      style={{
        ...styles.postContainer,
        backgroundColor: theme === "light" ? "#fff" : "#082c6c",
      }}
    >
      <Author
        chunk={chuncked.length}
        info={data.meta}
        postId={data.id}
        setVisible={setVisible}
      />
      {data.content.length > 0 ? (
        <>
          <TextContent data={info} />
          <ImageContent data={data} />
        </>
      ) : (
        <ImageContent />
      )}

      <Reactions postId={data.id} meta={data.meta} />
    </View>
  );
};

export { NewPost };
