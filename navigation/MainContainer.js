import * as React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { AppBar, HStack, IconButton } from "@react-native-material/core";
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';


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
        tintColor='grey'

        leading={props => (
          <Image
            style={{width: 40, height: 40 }}
            source={require('../assets/budgie-icon.png')}
          />
        )}
        trailing={props => (
          <HStack>
            <IconButton
              icon={props => <MaterialCommunityIcons name="logout" {...props} />}
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
                <MaterialCommunityIcons name="chart-box" color={"grey"} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name={categoriesName}
            component={CategoriesScreen}
            options={{
              tabBarLabel: 'Categories',
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="category" color={"grey"} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name={expendituresName}
            component={ExpendituresScreen}
            options={{
              tabBarLabel: 'Expenditures',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="wallet" color={"grey"} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name={converterName}
            component={ConverterScreen}
            options={{
              tabBarLabel: 'Converter',
              tabBarIcon: ({ color }) => (
                <Ionicons name="sync-circle" color={"grey"} size={26} />
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
    backgroundColor: "lightblue",
    tintColor: "grey",
    height: 100,
    paddingTop: 40
  }
})