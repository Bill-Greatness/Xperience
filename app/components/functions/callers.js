import React from "react";
import { ToastAndroid } from "react-native";
import { updateDocument, getDocument, getFunc } from ".";
import { TextPost, ImagePost } from "../posts";
import { AuthorComment, AuthorPost } from "../profile";
import _ from "lodash";
import auth from "@react-native-firebase/auth";

export const renderItem = ({ item }) => {
  if (item.type === "Text") {
    return <TextPost data={item} />;
  }

  if (item.type === "Media") {
    return <ImagePost data={item} />;
  }
};

export const renderComment = ({ item }) => {
  return <AuthorComment data={item} />;
};
export const renderPost = ({ item }) => {
  return <AuthorPost data={item} />;
};

export const showMessage = (msg) => {
  return ToastAndroid.showWithGravity(
    msg,
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM
  );
};

export const getDelta = (date) => {
  let seconds = Math.floor((Date.now() - date) / 1000);
  let unit = "second";
  let direction = "ago";
  if (seconds < 0) {
    seconds = -seconds;
    direction = "from now";
  }
  let value = seconds;
  if (seconds >= 31536000) {
    value = Math.floor(seconds / 31536000);
    unit = "year";
  } else if (seconds >= 86400) {
    value = Math.floor(seconds / 86400);
    unit = "day";
  } else if (seconds >= 3600) {
    value = Math.floor(seconds / 3600);
    unit = "hour";
  } else if (seconds >= 60) {
    value = Math.floor(seconds / 60);
    unit = "minute";
  }
  if (value != 1) unit = unit + "s";
  return value + " " + unit + " " + direction;
};

export const reactToPost = async (id) => {
  const userId = auth().currentUser.uid;

  const { _data } = await getDocument("Posts", id).get({ source: "server" });
  const reactions = _data.meta.likes;

  const hasLiked = _.find(reactions, (info) => info.reactor == userId);
  if (hasLiked !== undefined) {
    // user has already reacted to his post
    const removeReaction = reactions.filter((rct) => rct.reactor !== userId);
    await updateDocument("Posts", id, {
      ..._data,
      meta: {
        ..._data.meta,
        likes: removeReaction,
      },
    });
  } else {
    const addReaction = {
      ..._data,
      meta: {
        ..._data.meta,
        likes: [
          ...reactions,
          { reactor: userId, time: new Date().toLocaleString("en-GB") },
        ],
      },
    };
    const { data } = getDocument("Users", auth().currentUser.uid).get();
    await updateDocument("Posts", id, addReaction).then(() =>
      getFunc("onPostReact")({
        creatorId: auth().currentUser.uid,
        authorId: _data.author,
        message: `${data.displayName} reacted to your post!`,
      })
    );
  }
};

export const hasLiked = (likes, id) => {
  const userId = auth().currentUser.uid;

  const hasReacted = _.find(likes, (info) => info.reactor === userId);

  return hasReacted === undefined;
};

export const createChunks = (str, chunkSize) => {
  return str.match(new RegExp(".{1," + chunkSize + "}", "g"));
};
