import React from 'react'
import {ScrollView, SafeAreaView, TouchableOpacity, StyleSheet, View} from 'react-native'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import {TextPost, ImagePost} from '../components/posts'
export default function Posts(){
    const styles = StyleSheet.create({
        post:{
            position:'absolute',
            width:50,
            height:50,
            backgroundColor:'#000',
            borderRadius:100,
            justifyContent:'center',
            alignItems:'center',
            bottom:20,
            right:20
        }
    })
    return(
        <SafeAreaView style={{display:'flex', flexDirection:'column', flex:1}}>
        <ScrollView>
            <TextPost />
            <TextPost />
            <ImagePost />
            <ImagePost />
        </ScrollView>
        <TouchableOpacity >
            <View style={styles.post}>
            <Material name="comment-edit-outline" color="#fff" size={30}/>
            </View>
        </TouchableOpacity>
        </SafeAreaView>
    )
}

