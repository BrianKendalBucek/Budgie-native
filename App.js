import * as React from 'react';
import { SafeAreaView, Text } from 'react-native';
import MainContainer from './src/navigations/TopBarNavigator';
import BottomTabNavigator from './src/navigations/BottomTabNavigator';
import { NavigationContainer } from '@react-navigation/native';
import TopBarNavigator from './src/navigations/TopBarNavigator';

// import AuthNavigator from './src/navigations/AuthNavigator';

export default function App() {
  return (
    <NavigationContainer>
      {/* <AuthNavigator /> */}
      <TopBarNavigator />
      <BottomTabNavigator />
    </NavigationContainer>
  );
}