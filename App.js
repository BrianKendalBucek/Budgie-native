import * as React from 'react';
import { SafeAreaView, Text } from 'react-native';
import MainContainer from './navigation/MainContainer';
import BottomTabNavigator from './src/navigations/BottomTabNavigator';
import { NavigationContainer } from '@react-navigation/native';

// import AuthNavigator from './src/navigations/AuthNavigator';

export default function App() {
  return (
    <NavigationContainer>
      {/* <AuthNavigator /> */}
      <MainContainer />
      <BottomTabNavigator />
    </NavigationContainer>
  );
}