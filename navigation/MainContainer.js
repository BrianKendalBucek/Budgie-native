import * as React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AppBar, HStack, IconButton } from "@react-native-material/core";
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

// Screens
import StatisticsScreen from './screens/StatisticsScreen'
import CategoriesScreen from './screens/CategoriesScreen'
import ExpendituresScreen from './screens/ExpendituresScreen'
import ConverterScreen from './screens/ConverterScreen';
import UserScreen from './screens/UserScreen';
import TestScreen from './screens/TestScreen';
import { NavigationContainer } from '@react-navigation/native';

// Screen names
const statisticsName = 'Statistics';
const categoriesName = 'Categories';
const expendituresName = 'Expenditures';
const converterName = 'Converter';
const userName = 'User';
const testName = 'Test;'

const TopTab = createMaterialTopTabNavigator();
const BottomTab = createMaterialBottomTabNavigator();

function TopNavigator() {
  return (
    // <View style={{ flexDirection: 'row' }}>
      <TopTab.Navigator
        initialRouteName="Feed"
        screenOptions={{
          scrollEnable: true,
          centered: false,
        }}
      >
        <TopTab.Screen
          name={userName}
          component={UserScreen}
          options={{
            tabBarLabel: 'User',
            tabBarIcon: () => (
              <MaterialCommunityIcons name="account" color={"grey"} size={26} />
            ),
            tabBarStyle: {
              backgroundColor: 'lightblue',
              height: 90,
              paddingTop: 20,
              // flexDirection: 'row',
              // alignItems: 'center',
              // justifyContent: 'flex-start',

            },
            tabBarLabelStyle: {
              fontSize: 15,
              // fontWeight: 'bold',
              marginLeft: 10,
            },
          }}
        />
        <TopTab.Screen
          name={testName}
          component={TestScreen}
          options={{
            tabBarLabel: 'Test',
            tabBarIcon: () => (
              <MaterialCommunityIcons name="account" color={"grey"} size={26} />
            ),
            tabBarStyle: {
              backgroundColor: 'lightblue',
              height: 90,
              paddingTop: 20,
              // flexDirection: 'row',
              // alignItems: 'center',
              // justifyContent: 'flex-start',

            },
            tabBarLabelStyle: {
              fontSize: 15,
              // fontWeight: 'bold',
              marginLeft: 10,
            },
          }}
        />
      </TopTab.Navigator>
    // </View>
  );
}

function BottomNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Feed"
      activeColor="#1976d2"
      barStyle={{ backgroundColor: 'lightblue', height: 100 }}


    >
      <BottomTab.Screen
        name={statisticsName}
        component={StatisticsScreen}
        options={{
          tabBarLabel: 'Statistics',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="chart-box" color={"grey"} size={26} />
          ),
        }}
      />
      <BottomTab.Screen
        name={expendituresName}
        component={ExpendituresScreen}
        options={{
          tabBarLabel: 'Expenditures',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="wallet" color={"grey"} size={26} />
          ),
        }}
      />
      <BottomTab.Screen
        name={categoriesName}
        component={CategoriesScreen}
        options={{
          tabBarLabel: 'Categories',
          tabBarIcon: () => (
            <MaterialIcons name="category" color={"grey"} size={26} />
          ),
        }}
      />
      <BottomTab.Screen
        name={converterName}
        component={ConverterScreen}
        options={{
          tabBarLabel: 'Converter',
          tabBarIcon: () => (
            <Ionicons name="sync-circle" color={"grey"} size={26} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "lightblue",
    tintColor: "grey",
    height: 90,
    paddingTop: 40
  }
})

export default function MainContainer() {
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <TopNavigator />
      </NavigationContainer>
      <NavigationContainer>
        <BottomNavigator />
      </NavigationContainer>
    </View>
  );
}