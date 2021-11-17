import React from 'react' 
import {View, StyleSheet, SafeAreaView,Text, ScrollView} from 'react-native'
import Top from '../layout/top'
import {testSearch} from '../assets/data'
export default function Search(){
    return(
        <SafeAreaView style={{flex:1}}>
        <Top />
        <View style={styles.container}>
        <View>
                    <Text style={styles.worthReading}>Search Results</Text>
        </View>
            <ScrollView style={{flex:1, backgroundColor:'#fff'}}>
                {testSearch.map((src, idx) => (
                        <View style={styles.results} key={idx}>
                        <Text>#{idx + 1 + " " + src.item}</Text>
                    </View>
                ))}
                
               
            </ScrollView>
        </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1, 
        flexDirection:'column',
        margin:3,
        backgroundColor:'#fff'
    },
    searchInput:{
        borderWidth:1,
        borderRadius:100,
        marginHorizontal:15,
    },
    worthReading:{
        textTransform:'uppercase',
        color:'#000',
        fontSize:18, 
        fontWeight:'bold',
        padding:10,
        letterSpacing:2
    },
    results:{
        padding:15,
        margin:10,
        backgroundColor:'teal',
        minWidth:70,
        borderRadius:40,
    }
})