import * as React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { AppBar, HStack, IconButton } from "@react-native-material/core";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


// Screens
import StatisticsScreen from './screens/StatisticsScreen'
import CategoriesScreen from './screens/CategoriesScreen'
import ExpendituresScreen from './screens/ExpendituresScreen'
import ConverterScreen from './screens/ConverterScreen';
import { NavigationContainer } from '@react-navigation/native';

// Screen names
const statisticsName = 'Statistics';
const categoriesName = 'Categories';
const expendituresName = 'Expenditures';
const converterName = 'Converter';

const Tab = createMaterialBottomTabNavigator();

export default function MainContainer() {
  return (
    <>
      <AppBar
      style={styles.header}
      title="Budgie"
      leading={props => (
        <IconButton icon={props => <Icon name="menu" {...props} />} {...props} />
      )}
      trailing={props => (
        <HStack>
          <IconButton
            icon={props => <Icon name="magnify" {...props} />}
            {...props}
          />
          <IconButton
            icon={props => <Icon name="dots-vertical" {...props} />}
            {...props}
          />
        </HStack>
      )}
    />
      
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Feed"
          activeColor="#1976d2"
          barStyle={{ backgroundColor: 'lightblue' }}

        >
          <Tab.Screen
            name={statisticsName}
            component={StatisticsScreen}
            options={{
              tabBarLabel: 'Statistics',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="chart-box" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name={categoriesName}
            component={CategoriesScreen}
            options={{
              tabBarLabel: 'Categories',
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="category" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name={expendituresName}
            component={ExpendituresScreen}
            options={{
              tabBarLabel: 'Expenditures',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="wallet" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name={converterName}
            component={ConverterScreen}
            options={{
              tabBarLabel: 'Converter',
              tabBarIcon: ({ color }) => (
                <Ionicons name="sync-circle" color={color} size={26} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "red",
    height: 100,
    paddingTop: 40
  }
})