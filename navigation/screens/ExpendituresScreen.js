import React, { useState } from 'react';
import { ScrollView, View, SafeAreaView, StyleSheet, Text, Platform, TouchableWithoutFeedback, Keyboard, Alert, Modal, Pressable } from 'react-native';
import { Box, Container, Tab, Tabs, TextInput, Autocomplete, Button, List, ListItemText, ListItem } from "@react-native-material/core";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function ExpendituresScreen({ props }) {

  const [objects, setObjects] = useState([]);
  const [currency, setCurrency] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);


  console.log("objects", objects);

  // const objectArray = Object.entries(objects);
  // console.log("ObjectArray", objectArray);

  const handlePriceChange = (text) => {
    setPrice(text);
  };

  const handleCurrencyChange = (text) => {
    setCurrency(text);
  };

  const handleDateChange = (text) => {
    setDate(String(text));
    hideDatePicker();
  };

  const handleCategoryChange = (text) => {
    setCategory(text);
  };

  const handleTitleChange = (text) => {
    setTitle(text);
  };

  const handleSubmit = () => {
    setObjects([...objects, { price, currency, date, category, title }]);
    setCurrency('');
    setPrice('');
    setDate('');
    setCategory('');
    setTitle('');
  };

  // const [expenditure, setExpenditure] = useState({
  //   price: '',
  //   currency: '',
  //   date: '',
  //   category: '',
  //   title: ''
  // })
  // console.log("Expenditure", expenditure);

  // const expenditureArray = Object.entries(expenditure);
  // console.log("ExpenditureArray", expenditureArray);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const deleteCategory = (index) => {
    let itemsCopy = [...objects];
    itemsCopy.splice(index, 1);
    setObjects(itemsCopy);
    setSelectedItem(null);
  }
  // const handleConfirm = (date, input) => {
  //   setExpenditure(prevState => ({ ...prevState, [input]: date }));
  //   hideDatePicker();
  // // };

  // const handleChange = (inputName, inputValue) => {
  //   // Keyboard.dismiss();
  //   // setExpenditure(prevState => ({ ...prevState, [inputName]: inputValue }));
  //   // setExpenditure({
  //   //   price: '',
  //   //   currency: '',
  //   //   date: '',
  //   //   category: '',
  //   //   title: ''
  //   // })
  //   // this.textInput.clear();
  //   // setExpenditure(null);
  // };

  // const handleSubmit = () => {
  //   // setExpenditure({
  //   //   price: '',
  //   //   currency: '',
  //   //   date: '',
  //   //   category: '',
  //   //   title: ''
  //   // });
  // }

  // const deleteCategory = (index) => {
  //   let itemsCopy = [...categoryItems];
  //   itemsCopy.splice(index, 1);
  //   setCategoryItems(itemsCopy);
  // }

  // const handleError = (error, input) => {
  //   setErrors(prevState => ({...prevState, [input]: error}));
  // };

  return (
    <ScrollView keyboardShouldPersistTaps='handled'>
      <View>
        <SafeAreaView>
          <TextInput
            style={{ backgroundColor: 'transparent', variant: 'filled', margin: 20, paddingTop: 10 }}
            value={currency}
            variant='outlined'
            placeholder='Currency'
            placeholderTextColor="grey"
            color='grey'
            onChangeText={handleCurrencyChange}
          // style={{
          //   marginHorizontal: 12,
          //   paddingHorizontal: 8,
          // }}
          />
        </SafeAreaView>

        <TextInput
          value={price}
          onChangeText={handlePriceChange}
          style={{ backgroundColor: 'transparent', variant: 'filled', marginHorizontal: 20, paddingTop: 0 }}
          placeholder="Price of item"
          color="grey"
          variant='outlined'
        // onSubmitEditing={() => { this.onSubmit(this.state.searchText) }}
        />
        {/* <Autocomplete /> */}

        <Button title="Date" tintColor='grey' style={{ alignItems: 'left', width: 75, margin: 20, backgroundColor: 'lightblue', color: 'grey' }} onPress={showDatePicker} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          // onChangeText={text => handleChange(text, 'date')}
          onConfirm={handleDateChange}
          onCancel={hideDatePicker}
        />

        <SafeAreaView style={{ flex: 1 }}>
          <TextInput
            value={category}
            variant='outlined'
            placeholder='Category'
            placeholderTextColor="grey"
            color='grey'
            // value={category}
            onChangeText={handleCategoryChange}
            style={{
              marginHorizontal: 12,
              paddingHorizontal: 8,
            }}
          />
        </SafeAreaView>

        <TextInput
          // ref={input => { this.textInput = input }}
          value={title}
          onChangeText={handleTitleChange}
          style={{ backgroundColor: 'transparent', variant: 'filled', margin: 20 }}
          placeholder="Title"
          color="grey"
          variant='outlined'
        // onSubmitEditing={() => { this.onSubmit(this.state.searchText) }}
        />

        <Button
          title="Submit"
          tintColor='grey'
          style={{ alignItems: 'left', width: 95, marginHorizontal: 20, marginBottom: 10, backgroundColor: 'lightblue', color: 'grey' }}
          onPress={handleSubmit}
        />

      </View>
      <View>
        {
          objects.map((object, index) => {
            return (
              <>
                <View style={{ flexDirection: 'row', width: window.width, marginTop: 20, padding: 4, paddingTop: 10, borderColor: 'lightgrey', borderRadius: 10, backgroundColor: '#fff' }}>
                  <View style={{ flex: 1 }}>
                    <ListItem
                      title={object.title}
                      onPress={() => setSelectedItem(object)}
                    />
                  </View>

                </View>
              </>
            )
          })
        }
      </View>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={selectedItem !== null}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {
                objects.map((object, index) => {
                  return (
                    <>
                      <Text style={styles.modalText}>{selectedItem?.title}</Text>
                      <Text style={styles.modalText}>{selectedItem?.price}</Text>
                      <Text style={styles.modalText}>{selectedItem?.currency}</Text>
                      <Text style={styles.modalText}>{selectedItem?.category}</Text>
                      <Text style={styles.modalText}>{selectedItem?.date}</Text>
                      <View
                        sytle={styles.buttonBox}
                      >
                        <Pressable
                          style={[styles.button, styles.buttonClose]}
                          onPress={() => setSelectedItem(null)}>
                          <Text style={styles.textStyle}>Close</Text>
                        </Pressable>
                        <Pressable
                          style={[styles.button, styles.buttonDelete]}
                          onPress={() => deleteCategory()}>
                          <Text style={styles.textStyle}>Delete</Text>
                        </Pressable>
                      </View>
                    </>
                  )
                })
              }
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  buttonFirst: {
    width: 100,
    height: 35,
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: 'lightblue'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 30,
    margin: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: 'lightblue',
  },
  buttonDelete: {
    backgroundColor: 'red',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});