import * as React from 'react';
import { View, Text } from 'react-native';

export default function ConverterScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text
        onPress={() => navigation.nativate('Statistics')}
        style={{ fontSize: 26, fontWeight: 'bold' }}>Converter Screen</Text>
    </View>
  )
}