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
    <ScrollView>
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