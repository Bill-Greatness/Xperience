import React from 'react'
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'
import testImage from '../../assets/images/_.png'
import MI from 'react-native-vector-icons/MaterialIcons'
import Ion from 'react-native-vector-icons/Ionicons'

export const Comments = () => (
    <View style={styles.container}>
        <View style={styles.comment}>
            <View style={styles.postDetails}>
            <MI name="mark-chat-read" size={24} color="#ccc" /> 
            <View style={{paddingLeft:3}}>
            <Text style={styles.heading}>Heading of Xperence Here</Text>
            <Text style={styles.author}>Samuel Smithson</Text>
            </View>
            </View>
            <Text style={styles.date}>03/02/2021</Text>
        </View>
        <View style={{padding:15}}>
            <Text style={styles.userComment}>This is very wierd and I am hopeful you'll get through this.
             This life is really messed up. Hopefully we do not get to the top just to find out there is nothing there</Text>
        </View>
    </View>
)

export const Posts = () => (
    <View style={styles.container}>
         <View style={styles.comment}>
            <View style={styles.postDetails}>
            <Image source={testImage} style={styles.avatar}/> 
            <View style={{paddingLeft:3}}>
            <Text style={styles.heading}>Heading of Xperence Here</Text>
            <Text style={styles.date}>21/33/6556</Text>
            </View>
            </View>
            <View style={styles.icons}>
                <TouchableOpacity>
                <View style={styles.icons}>
                <Text style={styles.counts}>1</Text>
                <Ion name="md-heart" size={20} color="red"/> 
                </View>
                </TouchableOpacity>

                <TouchableOpacity>
                <View style={styles.icons}>
                <Ion name="chatbubbles" size={20} color="teal"/>
                <Text style={styles.counts}>2</Text>
                </View>
                </TouchableOpacity>
                  
            </View>
           
        </View>
        <View style={{padding:15}}>
            <Text style={styles.userComment}>This is very wierd and I am hopeful you'll get through this.
             This life is really messed up. Hopefully we do not get to the top just to find out there is nothing there</Text>
        </View>
    </View>
)

export const Interests = () => (
    <View style={styles.container}>
        <View style={styles.outerRow}>
            <View style={styles.innerRow}>
            <Ion name="md-flower" color="orange" size={24}/>
            <View style={{padding:5}}>
                <Text style={styles.interest}>Happiness</Text>
                <Text style={styles.stats}>+13,454,1 Others</Text>
            </View>
            </View>
            <Ion size={16} color="red" name="trash-outline" />
        </View>
          
    </View>
)

const styles = StyleSheet.create({
    container:{
        flex:1,
        display:'flex',
        borderBottomColor:'darkgray',
        borderBottomWidth:StyleSheet.hairlineWidth,
    },
    comment:{
        display:'flex',
        flexDirection:'row',
        alignItem:'center',
        justifyContent:'space-between',
        paddingHorizontal:15
    },
    heading:{
        fontWeight:'bold',
        color:'black',
        fontSize:12
    },
    author:{
        fontSize:10,
        color:'#000'
    },
    userComment:{
        color:'#000'
    },
    postDetails:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    date:{
        color:'darkgray',
        fontSize:10
    },
    icons:{
        flexDirection:'row',
        alignItems:'center'
    },
    counts:{
    color:"#000",
    paddingLeft:3
    },
    avatar:{
        width:30,
        height:30
    },
    interest:{
        color:'#000',
        fontSize:16
    },
    stats:{
        fontSize:10,
        color:'darkgray'
    },
    outerRow:{
        flexDirection:'row',
        alignItems:'center',
        padding:10,
        justifyContent:'space-between'
    },
    innerRow:{
        flexDirection:'row',
        alignItems:'center',
        width:160
    }
})

