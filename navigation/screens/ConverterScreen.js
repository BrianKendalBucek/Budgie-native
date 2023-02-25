import React, { useState } from 'react';
import { View, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { Box, TextInput, Button } from "@react-native-material/core";


export default function ConverterScreen({ navigation }) {
  const [currency, setCurrency] = useState('');

  const onChangeText = async (text = '') => {
    setCategory(text)
  }

  return (
    <ScrollView keyboardShouldPersistTaps='handled'>
      <View style={styles.boxposition}>
        <Box
          style={styles.box}
        />
      </View>
      <SafeAreaView>
        <TextInput
          style={styles.input}
          variant='outlined'
          placeholder='Primary Currency'
          placeholderTextColor="grey"
          color='grey'
          // value={currency}
          onChangeText={onChangeText}
        />
      </SafeAreaView>
      <SafeAreaView>
        <TextInput
          style={styles.input}
          variant='outlined'
          placeholder='Secondary Currency'
          placeholderTextColor="grey"
          color='grey'
          // value={currency}
          onChangeText={onChangeText}
        />
        <TextInput
          // onChangeText={(textEntry) => { this.setState({ searchText: textEntry }) }}
          style={styles.input}
          placeholder="Price of item"
          color="grey"
          variant='outlined'
        // onSubmitEditing={() => { this.onSubmit(this.state.searchText) }}
        />
        <Button title="Convert" tintColor='grey' style={styles.bluebutton} />

      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'transparent',
    variant: 'filled',
    marginHorizontal: 20,
    marginVertical: 5
  },
  bluebutton: {
    backgroundColor: 'lightblue',
    color: 'grey',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  box: {
    height: 50,
    width: 200,
    backgroundColor: 'lightgrey',
    borderRadius: 10,
  },
  boxposition: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  }
})