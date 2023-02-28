import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { ROUTES } from '../constants';
import { StatisticsScreen, ExpendituresScreen, CategoriesScreen, ConverterScreen } from '../screens';

const Tab = createMaterialBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="#1976d2"
      barStyle={{ backgroundColor: 'lightblue', height: 100 }}
    >
      <Tab.Screen
        name={ROUTES.STATISTICS}
        component={StatisticsScreen}
        options={{
          tabBarLabel: 'Statistics',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chart-box" color={"grey"} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.EXPENDITURES}
        component={ExpendituresScreen}
        options={{
          tabBarLabel: 'Expenditures',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="wallet" color={"grey"} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.CATEGORIES}
        component={CategoriesScreen}
        options={{
          tabBarLabel: 'Categories',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="category" color={"grey"} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.CONVERTER}
        component={ConverterScreen}
        options={{
          tabBarLabel: 'Converter',
          tabBarIcon: ({ color }) => (
            <Ionicons name="sync-circle" color={"grey"} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;