import React, {useState} from 'react';
import auth from '@react-native-firebase/auth'
import {
  SafeAreaView,
  ScrollView,
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import testImage from '../assets/images/_.png';
import {Comments, AuthorPost, Interests} from '../components/profile';
import Top from '../layout/top';
export default function Profile() {
  const [tile, setTile] = useState('Posts');

  const setStyle = (node) => {
    return tile === node ? styles.activeTile : styles.stale;
  };
  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      height: 190,
    },
    profileImage: {
      resizeMode: 'contain',
      width: 80,
      height: 80,
      borderRadius: 1000,
    },
    name: {
      fontSize: 20,
      color: '#000',
      textAlign: 'center',
      fontWeight: '200',
    },
    joined: {
      textAlign: 'center',
      fontSize: 12,
      color: 'darkgray',
    },
    tiles: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginBottom: 15,
    },
    tile: {
      textTransform: 'uppercase',
      fontWeight: 'bold',
      color: '#000',
      letterSpacing: 0.7,
    },
    activeTile: {
      borderBottomWidth: 1.5,
      borderBottomColor: '#000',
    },
    stale: {
      borderBottomColor: 'currentColor',
    },
    interestContainer: {
      display: 'flex',
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  });

  const switchNode = (node) => {
    switch (node) {
      case 'Comments':
        return <Comments />;
      case 'Posts':
        return <AuthorPost />;
      default:
        return (
          <View style={styles.interestContainer}>
            {[1, 3, 4, 5, 6, 8, 9, 0, 99, 67, 45, 33, 56].map((idx) => (
              <View key={idx}>
                <Interests />
              </View>
            ))}
          </View>
        );
    }
  };
  return (
    <SafeAreaView>
      <Top /> 
      <View style={styles.container}>
        <TouchableOpacity>
          <Image style={styles.profileImage} source={{uri:auth().currentUser.photoURL}} />
        </TouchableOpacity>
        <View>
          <Text style={styles.name}>{auth().currentUser.displayName}</Text>
          <Text style={styles.joined}>Joined: 02/02/2022</Text>
        </View>
      </View>
      <View style={styles.tiles}>
        <TouchableOpacity
          onPress={() => setTile('Posts')}
          style={setStyle('Posts')}>
          <Text style={styles.tile}>Posts</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setTile('Comments')}
          style={setStyle('Comments')}>
          <Text style={styles.tile}>Comments</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setTile('Interests')}
          style={setStyle('Interests')}>
          <Text style={styles.tile}>Interests</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={{backgroundColor: '#fff'}}>
        <View style={{paddingTop: 10, flex: 1}}>{switchNode(tile)}</View>
      </ScrollView>
    </SafeAreaView>
  );
}
