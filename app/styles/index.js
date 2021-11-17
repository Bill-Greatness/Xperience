import {StyleSheet} from 'react-native'

export const constants = StyleSheet.create({
    container:{
        display:'flex',
        flex:1,
        flexDirection:'column',
    },
    centeredView:{
        flex:1, 
        alignContent:'center',
        justifyContent:'center',
        marginTop:15
    },

        modalView: {
            margin: 20,
            flex:1,
            backgroundColor: "white",
            borderRadius: 20,
            padding: 35,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5

    },
})
