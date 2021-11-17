/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useCallback} from 'react';
import {NavigationContainer} from '@react-navigation/native'
import Layout from './app/layout';
import Login from './app/screens/Login'
import {StatusBar, useColorScheme} from 'react-native';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [isLogged, setLogged] = useState(false)

  const setLogState = useCallback(state => {
     if(state === false){
       return
     }
     setLogged(state)
  },[])
  return (
    <NavigationContainer>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {isLogged ? 
        <Layout />:
        <Login setLogged={setLogState}/>
      }
    </NavigationContainer>
  );
};

export default App;
