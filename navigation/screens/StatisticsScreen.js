import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, ScrollView } from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import CircularProgress from 'react-native-circular-progress-indicator';



export default function StatisticsScreen({ navigation }) {

  const [value, setValue] = useState(0);

  return (
    <ScrollView
    // style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Text
        style={{ paddingTop: 10, paddingLeft: 20, color: 'grey' }}
      >Budget spent</Text>
      <View style={styles.container}>
        <CircularProgress
          radius={90}
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


      <Text
        style={{ paddingTop: 0, paddingLeft: 20, color: 'grey' }}
      >Weekly</Text>
      <LineChart
        data={{
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
          backgroundColor: '#black',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 255) => `rgba(0,143,251, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={{
          marginVertical: 1,
          borderRadius: 16,
        }}
      />


      <Text
        style={{ paddingLeft: 20, color: 'grey' }}
      >Monthly by Category</Text>
      {/* <PieChart
        data={[
          {
            name: 'Groceries',
            population: 21500000,
            color: '#008ffb',
            legendFontColor: '#7F7F7F',
            legendFontSize: 10,
          },
          {
            name: 'Rent',
            population: 2800000,
            color: '#00e396',
            legendFontColor: '#7F7F7F',
            legendFontSize: 10,
          },
          {
            name: 'Fun',
            population: 8538000,
            color: '#feb019',
            legendFontColor: '#7F7F7F',
            legendFontSize: 10,
          },
          {
            name: 'Utilities',
            population: 11920000,
            color: '#ff4560',
            legendFontColor: '#7F7F7F',
            legendFontSize: 10,
          },
          {
            name: 'School',
            population: 11920000,
            color: '#775dd0',
            legendFontColor: '#7F7F7F',
            legendFontSize: 10,
          },
          {
            name: 'Other',
            population: 11920000,
            color: '#3f51b5',
            legendFontColor: '#7F7F7F',
            legendFontSize: 10,
          },
        ]}
        width={Dimensions.get('window').width - 16}
        height={220}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 1,
          borderRadius: 16,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute //for the absolute number remove if you want percentage
      /> */}


      <BarChart
        data={{
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
              ]
            },
          ],
        }}
        width={Dimensions.get('window').width - 16}
        height={220}
        // yAxisLabel={'Rs'}
        chartConfig={{
          backgroundColor: 'transparent',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 2,
          color: (opacity = 1) => `grey`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 1,
          borderRadius: 16,
        }}
        withCustomBarColorFromData={true}
        flatColor={true}
        showBarTops={true}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});