import React from 'react';
import {View,StyleSheet, TouchableOpacity} from 'react-native';
import Ion from 'react-native-vector-icons/Ionicons'
export default function Top(){
const styles = StyleSheet.create({
  container:{
    display:'flex',
    backgroundColor:'#000',
    height:50,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'  
  },
  child:{
    paddingHorizontal:10
  }
})
  return (
    <View style={styles.container}>
      <View style={styles.child}>
        <TouchableOpacity>
        <Ion name="logo-electron" size={24}/>
        </TouchableOpacity>
      </View>
      
      <View style={styles.child}>
        <TouchableOpacity>
      <Ion name="search" size={24}/>
      </TouchableOpacity>
      </View>
    </View>
  );
}
