import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Login, ForgotPassword, Register } from '../screens';
import { ROUTES } from '../constants';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createStackNavigator();
// Navigator, Screen, Group

function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{
      // headerTintColor: 'white',
      // headerBackTitleVisible: false,
      // headerStyle: {
      //   backgroundColor: 'red'
      // }
    }} initialRouteName={ROUTES.LOGIN}>
      <Stack.Screen name={ROUTES.LOGIN} component={Login} />
      <Stack.Screen
        name={ROUTES.FORGOT_PASSWORD}
        component={ForgotPassword}
        options={({route}) => ({
          title: route.params.userId,
        })
      } />
      <Stack.Screen name={ROUTES.LOGIN} component={Login} />
      <Stack.Screen name={ROUTES.REGISTER} component={Register} />
      <Stack.Screen name={ROUTES.STATISTICS} component={BottomTabNavigator} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;