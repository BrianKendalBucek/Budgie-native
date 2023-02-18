import * as React from 'react';
import { View, Text } from 'react-native';
// import Header from '../../components/Header';

export default function StatisticsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text
        onPress={() => alert('This is the "Statistics" screen.')}
        style={{ fontSize: 26, fontWeight: 'bold' }}>Statistics</Text>
    </View>
  )
}