import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, ScrollView } from 'react-native';
import { LineChart, BarChart } from "react-native-chart-kit";
import CircularProgress from 'react-native-circular-progress-indicator';

export default function StatisticsScreen({ cashChart }) {
console.log("StatisticsScreen cashChart", cashChart)
  return (
    <ScrollView style={styles.scrollViewBackground} keyboardShouldPersistTaps='handled'>
      <View style={styles.container}>


        {/* CIRCLE PROGRESS - PRIMARY ACCOUNT */}
        <View>
          <Text
            style={styles.circle}
          >Primary Account</Text>
          <View>
            <CircularProgress
              radius={50}
              // DUMMY DATA
              value={85}
              textColor='#222'
              fontSize={20}
              valueSuffix={'%'}
              activeStrokeColor={'#008ffb'}
              inActiveStrokeColor={'#008ffb'}
              inActiveStrokeOpacity={0.2}
              duration={3000}
            />
          </View>
        </View>


        {/* CIRCLE PROGRESS - EVERY EXPENSE */}
        <View>
          <Text
            style={styles.circle}
          >Every Expense</Text>
          <View>
            <CircularProgress
              radius={50}
              // DUMMY DATA
              value={50}
              textColor='#222'
              fontSize={20}
              valueSuffix={'%'}
              activeStrokeColor={'#FF4560'}
              inActiveStrokeColor={'#FF4560'}
              inActiveStrokeOpacity={0.2}
              duration={3000}
            />
          </View>
        </View>


        {/* CIRCLE PROGRESS - CASH REMAINING */}
        <View>
          <Text
            style={styles.circle}
          >Cash Available</Text>
          <View>
            <CircularProgress
              radius={50}
              // DUMMY DATA
              value={cashChart}
              textColor='#222'
              fontSize={20}
              valueSuffix={'%'}
              activeStrokeColor={'#00E396'}
              inActiveStrokeColor={'#00E396'}
              inActiveStrokeOpacity={0.2}
              duration={3000}
            />
          </View>
        </View>
      </View>


      {/* WEEKLY EXPENDITURES LINE CHART */}
      <Text
        style={styles.title}
      >Weekly</Text>
      <View style={styles.container}>
        <LineChart

          data={{
            // DUMMY DATA
            labels: ['1', '7', '14', '21', '28', '30'],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                ],
              },
            ],
          }}

          width={Dimensions.get('window').width - 16} // from react-native
          height={220}
          // yAxisLabel={'Rs'}
          chartConfig={{
            // backgroundColor: '#black',
            backgroundGradientFrom: '#eee',
            backgroundGradientTo: 'lightblue',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 255) => `rgba(0,143,251, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
          style={styles.chart}
        />
      </View>


      {/* MOTHLY EXPENDITURES BAR CHART */}
      <Text
        style={styles.title}
      >Monthly by Category</Text>

      <View style={{ flexDirection: 'row' }}>
        {/* VIEW HACK TO CENTER BAR CHART */}
        <View style={{ width: 8 }} />

        <BarChart

          data={{
            // DUMMY DATA
            labels: [
              'Groceries',
              'Rent',
              'Fun',
              'Utilities',
              'School',
              'Other',
            ],
            datasets: [
              {
                data: [20, 45, 28, 80, 99, 43],
                colors: [
                  (opacity = 1) => '#008ffb',
                  (opacity = 1) => '#00e396',
                  (opacity = 1) => '#feb019',
                  (opacity = 1) => '#ff4560',
                  (opacity = 1) => '#775dd0',
                  (opacity = 1) => '#3f51b5',
                  (opacity = 1) => '#3f51b5',
                  (opacity = 1) => '#03A9F4',
                  (opacity = 1) => '#4CAF50',
                  (opacity = 1) => '#F9CE1D',
                  (opacity = 1) => '#FF9800',
                  (opacity = 1) => '#33B2DF',
                  (opacity = 1) => '#546E7A',
                  (opacity = 1) => '#D4526E',
                  (opacity = 1) => '#13D8AA',
                ]
              },
            ],
          }}

          width={Dimensions.get('window').width - 16}
          height={220}
          // yAxisLabel={'Rs'}
          chartConfig={{
            backgroundColor: 'transparent',
            backgroundGradientFrom: '#eee',
            backgroundGradientTo: 'lightblue',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0,143,251, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={styles.chart}
          withCustomBarColorFromData={true}
          flatColor={true}
          showBarTops={true}
        />
      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollViewBackground: {
    backgroundColor: '#eee',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  circle: {
    paddingTop: 20,
    paddingBottom: 10,
    color: 'grey',
  },
  title: {
    paddingLeft: 20,
    color: 'grey',
  },
  chart: {
    marginVertical: 5,
    borderRadius: 16,
  },
});