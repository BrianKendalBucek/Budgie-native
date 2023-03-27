import React from 'react';
import { StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { ROUTES } from '../constants';
import useCategoryItems from '../screens/categoryItems';
import useChartUpdater from '../screens/chartState';
import { StatisticsScreen, ExpendituresScreen, CategoriesScreen, ConverterScreen, UsersScreen, Play } from '../screens';

const Tab = createMaterialBottomTabNavigator();

function BottomTabNavigator() {

  // CATEGORIES LIST PASSED IN TO COMPONENTS THROUGH NAVIGATION BAR
  const { categoryItems, setCategoryItems } = useCategoryItems();
  const { cashChart, setCashChart } = useChartUpdater();

  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="#1976d2"
      barStyle={{ backgroundColor: 'lightblue', height: 80 }}
    >

      {/* STATISTICS TAB */}
      <Tab.Screen
        name={ROUTES.STATISTICS}
        // component={StatisticsScreen}
        options={{
          tabBarLabel: false,
          tabBarIcon: () => (
            <MaterialCommunityIcons name="chart-box" color={"grey"} size={26} />
          ),
        }}
      >
        {() => <StatisticsScreen 
          cashChart={cashChart}
        />}
      </Tab.Screen>

      {/* EXPENDITURES TAB */}
      <Tab.Screen
        name={ROUTES.EXPENDITURES}
        options={{
          tabBarLabel: false,
          tabBarIcon: () => (
            <MaterialCommunityIcons name="wallet" color={"grey"} size={26} />
          ),
        }}
      >
        {() => <ExpendituresScreen
          categoryItems={categoryItems}
          cashChart={cashChart}
          setCashChart={setCashChart}
        />}
      </Tab.Screen>

      {/* CATEGORIES TAB */}
      <Tab.Screen
        name={ROUTES.CATEGORIES}
        options={{
          tabBarLabel: false,
          tabBarIcon: () => (
            <MaterialIcons name="category" color={"grey"} size={26} />
          ),
        }}
      >
        {() => <CategoriesScreen
          categoryItems={categoryItems}
          setCategoryItems={setCategoryItems}
        />}
      </Tab.Screen>

      {/* CONVERTER TAB */}
      <Tab.Screen
        name={ROUTES.CONVERTER}
        component={ConverterScreen}
        options={{
          tabBarLabel: false,
          tabBarIcon: () => (
            <Ionicons name="sync-circle" color={"grey"} size={26} />
          ),
        }}
      />

      {/* USER TAB */}
      <Tab.Screen
        name={ROUTES.USER}
        component={UsersScreen}
        options={{
          tabBarLabel: false,
          tabBarIcon: () => (
            <MaterialCommunityIcons name="account" color={"grey"} size={26} />
          ),
        }}
      />

      {/* EXPERIMENTAL TAB */}
      <Tab.Screen
        name={ROUTES.PLAY}
        component={Play}
        options={{
          tabBarLabel: false,
          tabBarIcon: () => (
            <MaterialCommunityIcons name="bird" color={"grey"} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;