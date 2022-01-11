import React from "react";
import {ToastAndroid} from 'react-native'
import { TextPost, ImagePost } from "../posts";
import { AuthorPost } from "../profile";

export const renderItem = ({ item }) => {
	if (item.type === "Text") {
		return <TextPost data={item} />;
	}

	if (item.type === "Media") {
		return <ImagePost data={item} />;
	}
};

export const renderPost = ({ item }) => {
	return <AuthorPost data={item} />;
};

export const showMessage = (msg) => {
	return ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.BOTTOM)
}
