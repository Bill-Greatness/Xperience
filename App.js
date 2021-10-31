/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import Layout from './app/layout';
import Top from './app/layout/top';
import {StatusBar, useColorScheme} from 'react-native';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <NavigationContainer>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Top />
      <Layout />
    </NavigationContainer>
  );
};

export default App;
