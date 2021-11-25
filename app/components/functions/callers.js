import React from 'react'
import { TextPost, ImagePost } from "../posts";


export const renderItem = ({ item }) => {
	if (item.type === "Text") {
		return <TextPost data={item} />;
	}

	if (item.type === "Media") {
		return <ImagePost data={item} />;
	}
};