import React, { useState } from 'react';
import { View, Button, StyleSheet, Text, Platform } from 'react-native';
import { Box, Container, Tab, Tabs, TextInput, Autocomplete } from "@react-native-material/core";
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

  return (
    <View>
      <TextInput
        // onChangeText={(textEntry) => { this.setState({ searchText: textEntry }) }}
        style={{ backgroundColor: 'transparent', variant: 'outlined' }}
        label="Price of item"
      // onSubmitEditing={() => { this.onSubmit(this.state.searchText) }}
      />
      {/* <Autocomplete /> */}
      <Button title="Show Date Picker" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <TextInput
        // onChangeText={(textEntry) => { this.setState({ searchText: textEntry }) }}
        style={{ backgroundColor: 'transparent', variant: 'outlined' }}
        label="Title"
      // onSubmitEditing={() => { this.onSubmit(this.state.searchText) }}
      />
    </View>
  )
}