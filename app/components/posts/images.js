import React from "react";
import { Modal, View, Image, StyleSheet } from "react-native";
import { constants } from "../../styles";
import ReactNativeZoomableView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";

export const ImageInfo = ({ show, setShow, uri }) => (
	<Modal
		visible={show}
		onRequestClose={() => setShow(false)}
		animationType="fade"
		transparent
		statusBarTranslucent
		style={constants.centeredView}
	>
		<ReactNativeZoomableView
			maxZoom={1.5}
			minZoom={0.5}
			zoomStep={0.5}
			initialZoom={1}
			bindToBorders={true}
		>
			<View style={styles.imageModalView}>
				<Image
					style={constants.modalImage}
					source={{uri}}
					resizeMode="contain"
				/>
			</View>
		</ReactNativeZoomableView>
	</Modal>
);

const styles = StyleSheet.create({
	imageModalView: {
		flex: 1,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "column",
		backgroundColor: "rgba(30,40,60,0.7)",
	},
});
