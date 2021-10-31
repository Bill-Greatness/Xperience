import React from 'react'
import { View, SafeAreaView, Text, StyleSheet } from 'react-native'
import {constants} from '../styles'
import Ion from 'react-native-vector-icons/Feather'
export default function Alert(){

    const styles = StyleSheet.create({
        main:{
            display:'flex',
            flexDirection:'row',
            justifyContent:'flex-start',
            alignItems:'center',
            minHeight:70,
            margin:10,
            padding:3,
            width:'auto',
            backgroundColor:'#000',
            borderRadius:5
        },
        icon:{
            width:40,
            height:40,
            marginLeft:5,
            backgroundColor:'silver',
            borderRadius:100, 
            alignItems:'center',
            justifyContent:'center'
        },
        content:{
            width:'auto',
            padding:5
        }
    })

    return(
        <SafeAreaView style={constants.container}>
            {[1,2,3,4,5,6].map((mp, idx) => (
                <View style={styles.main} key={idx}>
                <View style={styles.icon}>
                <Ion name="bell" size={24} />
                </View>
                <View style={styles.content}>
                <Text>This is a Message from Bill Greatness This is a Message from Bill Greatness</Text>
                <Text style={{fontSize:10}}>Today, 10:30PM</Text>
                </View>
            </View>
            ))}
            
        </SafeAreaView>
    )
}