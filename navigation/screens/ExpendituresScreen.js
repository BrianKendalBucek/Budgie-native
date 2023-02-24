import React, { useState } from 'react';
import { ScrollView, View, SafeAreaView, StyleSheet, Text, Platform, TouchableWithoutFeedback, Keyboard, Alert, Modal, Pressable } from 'react-native';
import { Box, Container, Tab, Tabs, TextInput, Autocomplete, Button, List, ListItemText, ListItem } from "@react-native-material/core";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Flex, Spacer } from 'react-native-flex-layout';
import moment from 'moment';

export default function ExpendituresScreen({ props }) {

  const [objects, setObjects] = useState([]);
  const [currency, setCurrency] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

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

  const handleSubmit = ({ price, currency, date, category, title }) => {
    if (!title) {
      return;
    }
    const newObject = { key: Date.now(), price, currency, date, category, title };
    setObjects([...objects, newObject]);
    setPrice('');
    setCurrency('');
    setDate('');
    setCategory('');
    setTitle('');
  };

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

  return (
    <ScrollView keyboardShouldPersistTaps='handled'>
      <View>

        <View style={styles.buttonboxtop}>
          <Button title="Cash" tintColor='grey' style={styles.bluebutton} onPress={showDatePicker} />
          <Button title="Debit" tintColor='grey' style={styles.bluebutton} onPress={showDatePicker} />
          <Button title="Credit" tintColor='grey' style={styles.bluebutton} onPress={showDatePicker} />
        </View>

        <View style={{ paddingTop: 10 }}>
          <SafeAreaView>
            <TextInput
              style={styles.input}
              value={currency}
              variant='outlined'
              placeholder='Currency'
              placeholderTextColor="grey"
              color='grey'
              onChangeText={handleCurrencyChange}
            />
          </SafeAreaView>

          <TextInput
            style={styles.input}
            value={price}
            onChangeText={handlePriceChange}
            placeholder="Price of item"
            color="grey"
            variant='outlined'
          />
          <SafeAreaView>

            <TextInput
              style={styles.input}
              value={category}
              variant='outlined'
              placeholder='Category'
              placeholderTextColor="grey"
              color='grey'
              onChangeText={handleCategoryChange}
            />
          </SafeAreaView>

          <TextInput
            style={styles.input}
            value={title}
            onChangeText={handleTitleChange}
            placeholder="Title"
            color="grey"
            variant='outlined'
          />
        </View>

        <View style={styles.buttonbox}>
          <Flex inline justifyContent='space-between' center>
            <Button title="Date" tintColor='grey' style={styles.bluebutton} onPress={showDatePicker} />
            <View>
              {date === '' ? null : <Text style={{ paddingLeft: 20, color: 'grey', fontSize: 20 }}>{moment(date).format('LL')}</Text>}
            </View>
          </Flex>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleDateChange}
            onCancel={hideDatePicker}
          />
          <Button
            title="Submit"
            tintColor='grey'
            style={styles.bluebutton}
            onPress={() => {
              handleSubmit({ price, currency, date, category, title });
              Keyboard.dismiss();
            }}
          />
        </View>

      </View>

      <View>
        {
          objects.map((object, index) => {
            return (
              <>
                <View style={styles.listcontainer}>
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
              {selectedItem && (
                <>
                  <Text style={styles.modalText}>{selectedItem.title}</Text>
                  <Text style={styles.modalText}>{selectedItem.price}</Text>
                  <Text style={styles.modalText}>{selectedItem.currency}</Text>
                  <Text style={styles.modalText}>{selectedItem.category}</Text>
                  <Text style={styles.modalText}>{selectedItem.date}</Text>
                </>
              )}
              <>
                <View>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setSelectedItem(null)}>
                    <Text style={styles.textStyle}>Close</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonDelete]}
                    onPress={() => deleteCategory(objects.indexOf(selectedItem))}>
                    <Text style={styles.textStyle}>Delete</Text>
                  </Pressable>
                </View>
              </>
            </View>
          </View>
        </Modal>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  listcontainer: {
    flexDirection: 'row', 
    width: window.width, 
    marginTop: 20, 
    padding: 4, 
    paddingTop: 10, 
    borderColor: 'lightgrey', 
    borderRadius: 10, 
    backgroundColor: '#fff',
  },
  buttonboxtop: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    paddingTop: 5
  },
  buttonbox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    paddingTop: 5
  },
  bluebutton: {
    backgroundColor: 'lightblue',
    color: 'grey'
  },
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
  input: {
    backgroundColor: 'transparent',
    variant: 'filled',
    marginHorizontal: 20,
    marginVertical: 5
  }
});