import React from 'react'
import {View, TouchableOpacity, Image, StyleSheet, Text} from 'react-native'
import Ion from 'react-native-vector-icons/Ionicons'

const styles = StyleSheet.create({
    postContainer:{
        display:'flex',
        margin:10,
        borderRadius:5,
        backgroundColor:'#fff',
        flexDirection:'column',
        minHeight:100,
        shadowOffset:{width:0, height:10},
        shadowColor:'#000',
        elevation:1,
        shadowOpacity:0.75,
    },
    postHeader:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start'
    },
    postDetails:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        paddingHorizontal:5,
        alignItems:'center'
    },
    userData:{
        display:'flex',
        flexDirection:'column',
        paddingVertical:10
    },
    postContent:{
        padding:10
    },
    contentText:{
        color:'#000'
    },
    postActions:{
        display:'flex',
        padding:10,
        flexDirection:'row',
        justifyContent:'space-around'
    },
    postAction:{
        display:'flex',
        flexDirection:'row'
    },
    author:{
        fontSize:16,
        paddingLeft:3,
        fontWeight:'800',
        color:'#000'
    },
    time:{
        fontSize:10,
        paddingTop:0,
        color:'darkgray',
        paddingLeft:5
    },
    stats:{
        paddingVertical:2,
        paddingHorizontal:3,
         color:'#000'
    },
    imageContainer:{
        display:'flex',
        flexDirection:'column',
        height:150
    }
   
})

const Author = () => (
<View style={styles.postHeader}>
        <View style={styles.postDetails}>
            <Image style={{borderRadius:100}} source={{uri:'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'}} width={40} height={40} />
            <View style={styles.userData}> 
            <Text style={styles.author}>Bill Greatness Clinton</Text>
            <Text style={styles.time}>Today, 5 hours Ago</Text>
            </View>
        </View>
    </View>
)

const Reactions = () => (
    <View style={styles.postActions}>
        <TouchableOpacity>
            <View style={styles.postAction}>
            <Ion name="ios-heart-outline" size={20} color={'#000'}/>
            <Text style={styles.stats}>5</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity>
        <View style={styles.postAction}>
        <Ion name="md-chatbubbles-outline" size={20} color={'#000'}/>
        <Text style={styles.stats}>15</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity>
        <Ion name="checkmark-done-circle-outline" size={24} color={'#000'}/>
        </TouchableOpacity>
    </View>
)

export const TextPost = () => (
    <View style={styles.postContainer}>
    <Author />
    <View style={styles.postContent}>
        <Text style={styles.contentText}>React Native runs on React, a popular open source library for building user interfaces with JavaScript. To make the most of React Native, it helps to understand React itself. This section can get you started or can serve as a refresher course.</Text>
    </View>
    <Reactions />
</View>
)

export const ImagePost = () => (
    <View style={styles.postContainer}>
    <Author /> 
    <TouchableOpacity style={styles.imageContainer}>
        <Image resizeMethod="resize" width={100} height={100} source={{uri:'logic'}} />
    </TouchableOpacity>
    <Reactions />
    </View>
)