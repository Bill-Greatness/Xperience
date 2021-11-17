import React from 'react'
import { View, SafeAreaView,ScrollView, Text, StyleSheet } from 'react-native'
import {constants} from '../styles'
import {Notice} from '../components/alert'
import {testNotice} from '../assets/data'

import Top from '../layout/top'
export default function Alert(){
   

    return(
        <SafeAreaView style={constants.container}>
            <Top />
            <ScrollView>
                {testNotice.map(ntc => (
                        <View key={ntc.content}>
                            <Notice notice={ntc}/>
                        </View>
                ))}
                
            </ScrollView>
        </SafeAreaView>
    )
}