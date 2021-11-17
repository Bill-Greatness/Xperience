import React from 'react'
import {View, StyleSheet, Text, Pressable} from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import Ion from 'react-native-vector-icons/Ionicons'

export const Notice = ({notice}) => (
<View style={styles.main}>
                <View style={styles.icon}>
                <Feather name="bell" size={24} />
                </View>
                <View style={styles.content}>
                <Text style={styles.message}>{notice.content}</Text>
                <Text style={{fontSize:10}}>{notice.time}</Text>
                </View>
                <View>
                    <Pressable onPress={() => {}}>
                    <Ion name="trash-outline" color="#fff" />
                    </Pressable>
                </View>
            </View>
            )

const styles = StyleSheet.create({
    main:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        padding:3,
        backgroundColor:'#000',
        borderBottomColor:'#fff',
        borderBottomWidth:StyleSheet.hairlineWidth
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
        padding:5,
        minWidth:'80%'
    },
    message:{
        color:'#fff',
        padding:2,
        
    }
})