import React, { useState } from 'react';
import { ScrollView, View, SafeAreaView, StyleSheet, Text, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Box, Container, Tab, Tabs, TextInput, Autocomplete, Button } from "@react-native-material/core";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function ExpendituresScreen({ props }) {

  const [expenditure, setExpenditure] = useState({
    price: '',
    currency: '',
    date: '',
    category: '',
    title: ''
  })
  console.log("Expenditure", expenditure);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // const handleConfirm = (date, input) => {
  //   setExpenditure(prevState => ({ ...prevState, [input]: date }));
  //   hideDatePicker();
  // };

  const handleChange = (inputName, inputValue) => {
    // Keyboard.dismiss();
    setExpenditure(prevState => ({ ...prevState, [inputName]: inputValue }));
    hideDatePicker();
    // setExpenditure({
    //   price: '',
    //   currency: '',
    //   date: '',
    //   category: '',
    //   title: ''
    // })
    // this.textInput.clear();
    // setExpenditure(null);
  };

  const handleSubmit = () => {
    setExpenditure({
      price: '',
      currency: '',
      date: '',
      category: '',
      title: ''
    });
  }

  // const handleError = (error, input) => {
  //   setErrors(prevState => ({...prevState, [input]: error}));
  // };

  const [data, setData] = useState();

  return (
    <ScrollView keyboardShouldPersistTaps='handled'>
      <View>
        <TextInput
          value={expenditure.price}
          onChangeText={value => handleChange('price', value)}
          style={{ backgroundColor: 'transparent', variant: 'filled', margin: 20, paddingTop: 10 }}
          placeholder="Price of item"
          color="grey"
          variant='outlined'
        // onSubmitEditing={() => { this.onSubmit(this.state.searchText) }}
        />
        {/* <Autocomplete /> */}
        <SafeAreaView style={{ flex: 1 }}>
          <TextInput
            value={expenditure.currency}
            variant='outlined'
            placeholder='Currency'
            placeholderTextColor="grey"
            color='grey'
            // value={currency}
            onChangeText={value => handleChange('currency', value)}
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
          // onChangeText={text => handleChange(text, 'date')}
          onConfirm={value => handleChange('date', value)}
          onCancel={hideDatePicker}
        />

        <SafeAreaView style={{ flex: 1 }}>
          <TextInput
            value={expenditure.category}
            variant='outlined'
            placeholder='Category'
            placeholderTextColor="grey"
            color='grey'
            // value={category}
            onChangeText={value => handleChange('category', value)}
            style={{
              marginHorizontal: 12,
              paddingHorizontal: 8,
            }}
          />
        </SafeAreaView>

        <TextInput
          // ref={input => { this.textInput = input }}
          value={expenditure.title}
          onChangeText={value => handleChange('title', value)}
          style={{ backgroundColor: 'transparent', variant: 'filled', margin: 20 }}
          placeholder="Title"
          color="grey"
          variant='outlined'
        // onSubmitEditing={() => { this.onSubmit(this.state.searchText) }}
        />

        <Button
          title="Submit"
          tintColor='grey'
          style={{ alignItems: 'left', width: 95, marginHorizontal: 20, backgroundColor: 'lightblue', color: 'grey' }}
          onPress={handleSubmit}
        />

      </View>
    </ScrollView>
  )
}