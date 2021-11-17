import React from 'react';
import {View, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import Ion from 'react-native-vector-icons/Ionicons';
import {useRoute} from '@react-navigation/native';

export default function Top() {
  const currentRoute = useRoute().name;
  const RouteIcon = () => {
    if (currentRoute === 'Search') {
      return (
        <View
          style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <TextInput
            returnKeyType="search"
            style={styles.searchInput}
            maxLength={35}
            placeholder="Search Trending Xperience"
            placeholderTextColor="#000"
          />
          <TouchableOpacity>
            <Ion name="search" size={24} color={'#000'} />
          </TouchableOpacity>
        </View>
      );
    }

    if (currentRoute === 'Profile') {
      return (
        <TouchableOpacity>
          <Ion name="log-out" size={24} color={'#000'} />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity>
          <Ion name="ios-chatbubble-outline" size={24} color={'#000'} />
        </TouchableOpacity>
      );
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.child}>
        <TouchableOpacity>
          <Ion name="logo-electron" size={24} color={'#000'} />
        </TouchableOpacity>
      </View>

      <View style={styles.child}>
        <RouteIcon />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#ccc',
    shadowOffset: {
      width: 50,
      height: 50,
    },
    shadowColor: 'black',
    elevation: 10,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  child: {
    paddingHorizontal: 10,
  },
  searchInput: {
    borderBottomColor: '#fff',
    borderBottomWidth: 2,
    marginHorizontal: 15,
    color: 'black',
  },
});
