import React, { useState, useMemo, useEffect } from 'react';
import { ScrollView, View, SafeAreaView, StyleSheet, Text, Keyboard, Alert, Modal, Pressable, TouchableOpacity } from 'react-native';
import { TextInput, Button, ListItem } from "@react-native-material/core";
import { Flex } from 'react-native-flex-layout';
import DateTimePickerModal from "react-native-modal-datetime-picker";
// import {Picker} from '@react-native-picker/picker';
// import DropDownPicker from 'react-native-dropdown-picker';
import { Picker, onOpen } from 'react-native-actions-sheet-picker';
import { SelectList } from 'react-native-dropdown-select-list'
import moment from 'moment';
import { create } from 'lodash';
import CategoryAuto from '../components/categoryAuto';
import countries from './countries.json';


export default function ExpendituresScreen({ categoryItems }) {


  function createObjectArray(array) {
    return array.map((item, index) => {
      return {
        key: index + 1, // adding 1 to index to avoid zero-based indexing
        value: item
      };
    });
  }

  const dataCateg = createObjectArray(categoryItems);
  console.log("ExpendituresScreen:", dataCateg);


  const [objects, setObjects] = useState([]);
  const [type, setType] = useState('');
  const [currency, setCurrency] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  // FOR CATEGORY PICKER
  // const [categoryData, setCategoryData] = useState([]);
  // const [selectedCategory, setSelectedCategory] = useState(undefined);
  // console.log("SELECTED", selectedCategory)
  // const [categoryQuery, setCategoryQuery] = useState('');

  // useEffect(() => {
  //   setCategoryData(dataCateg);
  // }, []);

  // const filteredData = useMemo(() => {
  //   if (categoryData && categoryData.length > 0) {
  //     return categoryData.filter((item) =>
  //       item.name
  //         .toLocaleLowerCase('en')
  //         .includes(categoryQuery.toLocaleLowerCase('en'))
  //     );
  //   }
  // }, [categoryData, categoryQuery]);
  // const onSearch = (text) => {
  //   setCategoryQuery(text);
  // };
  // FOR CATEGORY PICKER

  // FOR CURRENCY PICKER
  // const [currencyData, setCurrencyData] = useState([]);
  // const [selectedCurrency, setSelectedCurrency] = useState(undefined);
  // // console.log("SELECTED CURRENCY", selectedCurrency)
  // const [currencyQuery, setCurrencyQuery] = useState('');

  // const filteredCurrencyData = useMemo(() => {
  //   if (currencyData && currencyData.length > 0) {
  //     return currencyData.filter((item) =>
  //       item.name
  //         .toLocaleLowerCase('en')
  //         .includes(currencyQuery.toLocaleLowerCase('en'))
  //     );
  //   }
  // }, [currencyData, currencyQuery]);
  // FOR CURRENCY PICKER

  // CURRENCY PICKER
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(undefined);
  const [query, setQuery] = useState('');

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
  // CURRENCY PICKER 

  // CATEGORY PICKER
  const [categorySelected, setCategorySelected] = useState("");
  // CATEGORY PICKER


  const handleTypeChange = (text) => {
    setType('');
    setType(text);
  };
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
  // const handleCategoryChange = (text) => {
  //   setCategory(text);
  // };
  const handleTitleChange = (text) => {
    setTitle(text);
  };

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

  const testData = [
    {key:'1', value:'Mobiles', disabled:true},
    {key:'2', value:'Appliances'},
    {key:'3', value:'Cameras'},
    {key:'4', value:'Computers', disabled:true},
    {key:'5', value:'Vegetables'},
    {key:'6', value:'Diary Products'},
    {key:'7', value:'Drinks'},
]

  return (
    <ScrollView keyboardShouldPersistTaps='handled'>
      <View>

        <View style={styles.buttonboxtop}>
          <Button title="Cash" tintColor='grey' style={styles.bluebutton}
            onPress={() => {
              handleTypeChange('Cash');
            }
            } />
          <Button title="Debit" tintColor='grey' style={styles.bluebutton}
            onPress={() => {
              handleTypeChange('Debit');
            }
            } />
          <Button title="Credit" tintColor='grey' style={styles.bluebutton}
            onPress={() => {
              handleTypeChange('Credit');
            }
            } />
        </View>

        {/* CATEGORY PICKER */}
        <SafeAreaView style={styles.pickerContainer}>
          {/* <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    /> */}
          <Button
            title={"Currency"
              // + String(selectedCurrency.name)
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
            setSelected={setSelected}
            onSearch={onSearch}
          />
        </SafeAreaView>

        {/* CURRENCY PICKER */}
        <SafeAreaView
        //  style={styles.pickerContainer}
            style={{marginHorizontal: 20, marginVertical: 10, borderRadius: 20}}
        >
          <SelectList
            placeholder='Category'
            boxStyles={{borderRadius: 5, height: 52, backgroundColor: 'white'}}
            inputStyles={{fontSize: 17, color: 'grey', marginLeft: -8}}
            dropdownStyles={{borderRadius: 5, backgroundColor: 'lightgrey'}}
            dropdownTextStyles={{fontSize: 17, color: 'black'}}
            setSelected={(val) => setSelected(val)}
            data={dataCateg}
            save="value"
          />
          {/* <Button
            title={"Currency"
              // + String(selectedCategory.name)
            }
            tintColor='grey'
            style={styles.bluebutton}
          // onPress={() => {
          //   onOpen('country');
          // }}
          >
          </Button> */}
          {/* <Picker
            id="country"
            data={filteredCurrencyData}
            inputValue={currencyQuery}
            searchable={true}
            label="Select Currency"
            setSelected={setSelectedCurrency}
            onSearch={onSearch}
          /> */}
        </SafeAreaView>

        <View>

          <TextInput
            style={styles.input}
            value={price}
            onChangeText={handlePriceChange}
            placeholder="Price of item"
            color="grey"
            variant='outlined'
          />

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
              handleSubmit({ type, price, currency, date, category, title });
              Keyboard.dismiss();
            }}
          />
        </View>

      </View>
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
        {/* <View>
          {
            categoryItems.map((category, index) => {
              return (
                <View key={index}>
                  <View style={styles.listcontainer}>
                    <View style={{ flex: 1 }}>
                      <ListItem
                        title={category} />
                    </View>
                  </View>
                </View>
              )
            })
          }
        </View> */}
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