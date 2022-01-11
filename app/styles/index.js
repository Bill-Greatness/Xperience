import { StyleSheet } from "react-native";

export const constants = StyleSheet.create({
	container: {
		display: "flex",
		padding: 5,
		flex: 1,
		flexDirection: "column",
	},
	profileView: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
        backgroundColor:'#fff',
        height:70
	},
	centeredView: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 15,
	},
	authorName: {
        fontSize:17,
        color:'#000'
    },
    subInfo:{
        fontSize:12, 
        color:'#ccc',
        paddingHorizontal:5
    },
    dates:{
        color:'#000',
        fontSize:10
    },
	modalView: {
		margin: 20,
		flex: 1,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
    modalImage:{
        width:'100%',
        flex:1,
        height:'100%'
    },
	commentInput:{
		display:'flex',
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'space-between',
		position:'absolute',
		bottom:0,
		paddingHorizontal:15,
		width:'100%',
		backgroundColor:'#fff'
	},
	contentSummary: {
		color: "black",
		alignSelf: "flex-start",
		paddingVertical: 15,
		fontWeight: "800",
		letterSpacing:1.2
	},
});
