import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icons from '@react-navigation/material-bottom-tabs'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

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
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name={statisticsName} component={StatisticsScreen} />
        <Tab.Screen name={categoriesName} component={CategoriesScreen} />
        <Tab.Screen name={expendituresName} component={ExpendituresScreen} />
        <Tab.Screen name={converterName} component={ConverterScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
    // <NavigationContainer>
    //   <Tab.Navigator
    //     initialRouteName={statisticsName}
    //     screenOptions={({ route }) => ({
    //       tabBarIcon: ({ focused, color, size }) => {
    //         let iconName;
    //         let rn = route.name;

    //         if (rn === statisticsName) {
    //           iconName = focused ? 'md-stats-chart' : 'md-stats-chart-outline'
    //         } else if (rn === categoriesName) {
    //           iconName = focused ? 'md-grid' : 'md-grid-outline'
    //         } else if (rn === expendituresName) {
    //           iconName = focused ? 'wallet' : 'wallet-outline';
    //         } else if (rn === converterName) {
    //           iconName = focused ? 'sync-circle' : 'sync-circle-outline';
    //         }

    //         return <Ionicons
    //           name={iconName}
    //           size={size}
    //           color={'grey'}
    //           />
    //       },
    //     })}
    //     // screenOptions={{
    //     //   activeTintcolor: 'tomato',
    //     //   inactiveTintcolor: 'grey',
    //     //   labelStyle: { paddingBottom: 10, fontSize: 10 },
    //     //   style: { padding: 10, height: 70 }
    //     // }}

    //     >

    //


    //   </Tab.Navigator>

    // </NavigationContainer >