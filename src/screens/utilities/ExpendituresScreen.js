import React, { useState, useMemo, useEffect } from 'react';
import { ScrollView, View, SafeAreaView, StyleSheet, Text, Keyboard, Alert, Modal } from 'react-native';
import { TextInput, Button, ListItem } from "@react-native-material/core";
import { Flex } from 'react-native-flex-layout';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker, onOpen } from 'react-native-actions-sheet-picker';
import { SelectList } from 'react-native-dropdown-select-list'
import moment from 'moment';
import countries from './countries.json';


export default function ExpendituresScreen({ categoryItems }) {

// CATEGORY ARRAY INTO AN OBJECT
  function createObjectArray(array) {
    return array.map((item, index) => {
      return {
        key: index + 1, // adding 1 to index to avoid zero-based indexing
        value: item
      };
    });
  }

// STORES OBJECT IN VARIABLE
  const dataCateg = createObjectArray(categoryItems);
  // console.log("ExpendituresScreen:", dataCateg);


  const [objects, setObjects] = useState([]);
  console.log("objects", objects);
  const [type, setType] = useState('');
  console.log("type", type);
  const [currency, setCurrency] = useState('');
  console.log("currency", currency);
  const [price, setPrice] = useState('');
  console.log("price", price);
  const [date, setDate] = useState('');
  console.log("date", date);
  const [category, setCategory] = useState('');
  console.log("category", category);
  const [title, setTitle] = useState('');
  console.log("title", title);

// MODAL
  const [modalVisible, setModalVisible] = useState(false);

// MODAL AND DELETION
  const [selectedItem, setSelectedItem] = useState(null);

// DATE
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

// CURRENCY
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  // const [selected, setSelected] = useState(undefined);

  useEffect(() => {
    setData(countries);
  }, []);

  const filteredData = useMemo(() => {
    if (data && data.length > 0) {
      return data.filter((item) =>
        item.name
          .toLocaleLowerCase('en')
          .includes(query.toLocaleLowerCase('en'))
      );
    }
  }, [data, query]);

  const onSearch = (text) => {
    setQuery(text);
  };

// PAYMENT TYPE

const [cashButton, setCashButton] = useState(false);
const [creditButton, setCreditButton] = useState(false);
const [debitButton, setDebitButton] = useState(false);

  const handleTypeChange = (text) => {
    setType('');
    setType(text);
    if (text === 'Cash') {
      setCreditButton(false);
      setDebitButton(false);
      setCashButton(true);
    }
    if (text === 'Credit') {
      setCashButton(false);
      setDebitButton(false);
      setCreditButton(true);
    }
    if (text === 'Debit') {
      setCashButton(false);
      setCreditButton(false);
      setDebitButton(true);
    }
  };

// const handleCashPress = () => {

// }

// PRICE
  const handlePriceChange = (text) => {
    setPrice(text);
  };

  // const handleCurrencyChange = (text) => {
  //   setCurrency(text);
  // };

// DATE
  const handleDateChange = (text) => {
    setDate(String(text));
    hideDatePicker();
  };
  // const handleCategoryChange = (text) => {
  //   setCategory(text);
  // };

// TITLE
  const handleTitleChange = (text) => {
    setTitle(text);
  };

// FINAL SUBMIT
  const handleSubmit = ({ type, price, currency, date, category, title }) => {
    if (!type || !price || !currency || !date || !category || !title) {
      alert("Please fill in all the required fields.");
      return;
    }
    const newObject = { key: Date.now(), type, price, currency, date, category, title };
    setObjects([...objects, newObject]);
    setType('');
    setPrice('');
    setCurrency('');
    setDate('');
    setCategory('');
    setTitle('');
    setCashButton(false);
    setCreditButton(false);
    setDebitButton(false);

  };

// DATE
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

// CATEGORY DELETION
  const deleteCategory = (index) => {
    let itemsCopy = [...objects];
    itemsCopy.splice(index, 1);
    setObjects(itemsCopy);
    setSelectedItem(null);
  }

  return (
    <ScrollView keyboardShouldPersistTaps='handled'>
      <View>


        {/* PAYMENT TYPE BUTTONS */}
        <View style={styles.buttonboxtop}>
          <Button title="Cash" tintColor='grey' style={cashButton ? styles.selectedbutton : styles.bluebutton}
            onPress={() => {
              handleTypeChange('Cash');
            }
            } />
          <Button title="Debit" tintColor='grey' style={debitButton ? styles.selectedbutton : styles.bluebutton}
            onPress={() => {
              handleTypeChange('Debit');
            }
            } />
          <Button title="Credit" tintColor='grey' style={creditButton ? styles.selectedbutton : styles.bluebutton}
            onPress={() => {
              handleTypeChange('Credit');
            }
            } />
        </View>


        {/* CURRENCY PICKER */}
        <SafeAreaView style={styles.pickerContainer}>
          <Button
            title={"Currency:  "
              + String(currency)
            }
            tintColor='grey'
            style={styles.bluebutton}
            onPress={() => {
              onOpen('country');
            }}>
          </Button>
          {/* <Text style={{ padding: 10 }}>Chosen : {JSON.stringify(selected.name)}</Text> */}
          <Picker
            id="country"
            data={filteredData}
            inputValue={query}
            searchable={true}
            label="Currency"
            setSelected={(val) => setCurrency(val.name)}
            onSearch={onSearch}
          />
        </SafeAreaView>


        {/* CATEGORY PICKER */}
        <SafeAreaView style={{ marginHorizontal: 20, marginVertical: 10, borderRadius: 20 }}>
          <SelectList
            placeholder='Category'
            boxStyles={{ borderRadius: 5, height: 54, backgroundColor: 'white', borderColor: 'grey' }}
            inputStyles={{ fontSize: 17, color: 'grey', marginLeft: -8 }}
            dropdownStyles={{ borderRadius: 5, backgroundColor: 'lightblue' }}
            dropdownTextStyles={{ fontSize: 17, color: 'grey' }}
            setSelected={(val) => setCategory(val)}
            data={dataCateg}
            save="value"
            notFoundText='Please create categories on next tab'
          />
        </SafeAreaView>


        {/* PRICE TEXT INPUT */}
        <View>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={handlePriceChange}
            placeholder="Price of item"
            color="grey"
            variant='outlined'
          />


          {/* TITLE TEXT INPUT */}
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={handleTitleChange}
            placeholder="Title"
            color="grey"
            variant='outlined'
          />
        </View>


        {/* DATE PICKER */}
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
              handleSubmit({ type, price, currency, date, category, title });
              Keyboard.dismiss();
            }}
          />
        </View>
      </View>


      {/* COMPLETE RENDERED EXPENSE */}
      <View style={{ marginTop: 20 }}>
        <View>
          {
            objects.map((object, index) => {
              return (
                <View key={index}>
                  <View style={styles.listcontainer}>
                    <View style={{ flex: 1 }}>
                      <ListItem
                        title={object.title}
                        onPress={() => setSelectedItem(object)}
                      />
                    </View>
                  </View>
                </View>
              )
            })
          }
        </View>
      </View>


      {/* MODAL */}
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
                  <Text style={styles.modalText}>{selectedItem.type}</Text>
                  <Text style={styles.modalText}>{selectedItem.title}</Text>
                  <Text style={styles.modalText}>{selectedItem.price}</Text>
                  <Text style={styles.modalText}>{selectedItem.currency}</Text>
                  <Text style={styles.modalText}>{selectedItem.category}</Text>
                  <Text style={styles.modalText}>{selectedItem.date}</Text>
                </>
              )}
              <>
                <View>
                  <Button
                    style={[styles.bluebutton, { marginHorizontal: 20 }]}
                    title="Close"
                    tintColor='grey'
                    onPress={() => setSelectedItem(null)}>
                  </Button>
                  <Button
                    style={styles.redbutton}
                    title="Delete"
                    tintColor='white'
                    onPress={() => deleteCategory(objects.indexOf(selectedItem))}>
                  </Button>
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
    marginHorizontal: 20,
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
  },
  bluebutton: {
    backgroundColor: 'lightblue',
    marginTop: 10,
    marginBottom: 15,
  },
  selectedbutton: {
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 15,
  },
  redbutton: {
    backgroundColor: '#FF4560',
    marginHorizontal: 20,
    marginVertical: 0,
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
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'grey',
  },
  input: {
    backgroundColor: 'transparent',
    variant: 'filled',
    marginHorizontal: 20,
    marginVertical: 5
  },
  pickerContainer: {
    marginHorizontal: 20,
    // color: 'lightblue'
    // flex: 1,
    // alignItems: 'center',
  },
  pickerButton: {
    backgroundColor: 'lightblue',
    color: 'grey',
    padding: 10,
    borderRadius: 6,
    // marginTop: 50,
  },
});