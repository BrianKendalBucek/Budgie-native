import * as React from 'react';
import { SafeAreaView, Text } from 'react-native';
import MainContainer from './src/navigations/TopBar';
import BottomTabNavigator from './src/navigations/BottomTabNavigator';
import { NavigationContainer } from '@react-navigation/native';
import TopBar from './src/navigations/TopBar';

// import AuthNavigator from './src/navigations/AuthNavigator';

export default function App() {
  return (
    <NavigationContainer>
      {/* <AuthNavigator /> */}
      <TopBar />
      <BottomTabNavigator />
    </NavigationContainer>
  );
}