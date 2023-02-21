import React, { useState } from 'react';
import { ScrollView, View, SafeAreaView, StyleSheet, Text, Platform } from 'react-native';
import { Box, Container, Tab, Tabs, TextInput, Autocomplete, Button } from "@react-native-material/core";
// import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function ExpendituresScreen({ props }) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };

  const [category, setCategory] = useState('');
  const [data, setData] = useState();
  const [currency, setCurrency] = useState('');

  const onChangeText = async (text = '') => {
    setCategory(text)
  }

  return (
    <ScrollView keyboardShouldPersistTaps='always'> 
      <View>
        <TextInput
          // onChangeText={(textEntry) => { this.setState({ searchText: textEntry }) }}
          style={{ backgroundColor: 'transparent', variant: 'filled', margin: 20, paddingTop: 50 }}
          label="Price of item"
          color="grey"
          variant='outlined'
        // onSubmitEditing={() => { this.onSubmit(this.state.searchText) }}
        />
        {/* <Autocomplete /> */}
        <SafeAreaView style={{ flex: 1 }}>

          <TextInput
            variant='outlined'
            placeholder='Category'
            placeholderTextColor="grey"
            color='grey'
            value={category}
            onChangeText={onChangeText}
            style={{
              marginHorizontal: 12,
              paddingHorizontal: 8,
            }}

          />

        </SafeAreaView>

        <Button title="Date" tintColor='grey' style={{ alignItems: 'left', width: 75, margin: 20, backgroundColor: 'lightblue', color: 'grey' }} onPress={showDatePicker} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />

        <SafeAreaView style={{ flex: 1 }}>
          <TextInput
            variant='outlined'

            placeholder='Currency'
            placeholderTextColor="grey"
            color='grey'
            value={currency}
            onChangeText={onChangeText}
            style={{
              marginHorizontal: 12,
              paddingHorizontal: 8,
            }}
          />
        </SafeAreaView>

        <TextInput
          // onChangeText={(textEntry) => { this.setState({ searchText: textEntry }) }}
          style={{ backgroundColor: 'transparent', variant: 'filled', margin: 20 }}
          label="Title"
          color="grey"
          variant='outlined'
        // onSubmitEditing={() => { this.onSubmit(this.state.searchText) }}
        />
      </View>
    </ScrollView>
  )
}