import React, { useState } from 'react';
import { ScrollView, View, Button, StyleSheet, Text, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
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
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
      <ScrollView>
        <TextInput
          // onChangeText={(textEntry) => { this.setState({ searchText: textEntry }) }}
          style={{ backgroundColor: 'transparent', variant: 'filled' }}
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
          style={{ backgroundColor: 'transparent', variant: 'filled' }}
          label="Title"
        // onSubmitEditing={() => { this.onSubmit(this.state.searchText) }}
        />
      </ScrollView>
    </TouchableWithoutFeedback>
  )
}