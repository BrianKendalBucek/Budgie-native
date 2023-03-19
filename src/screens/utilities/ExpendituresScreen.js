import React, { useState, useMemo, useEffect } from 'react';
import { ScrollView, View, SafeAreaView, StyleSheet, Text, Keyboard, Alert, Modal } from 'react-native';
import { TextInput, Button, ListItem } from "@react-native-material/core";
import { Flex } from 'react-native-flex-layout';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker, onOpen } from 'react-native-actions-sheet-picker';
import { SelectList } from 'react-native-dropdown-select-list'
import moment from 'moment';
// import countries from './countries.json';
import countries from './currency.json';


export default function ExpendituresScreen({ categoryItems }) {

  // Remember to reference Budgie original for method
  // Budgie-api country code recognition file for search?

  // MANAGEMENT OF EXPENDITURE DATA FOR CALCULATIONS
  // Could do backend query addition of expenditures for charts
  // 
  // -FRONTEND METHOD: (But do calculations from looping through objects)
  // With every expenditure, the charts must update immediately
  // 
  // --TOFROM CONVERSION RESULTING IN PRIMARY COST
  // const fromValue = data.____.value
  // const fromInput = input value
  // const usdOfFrom = inputValue/fromValue
  // const toInput = input value
  // 
  // const fromTo = (usdOfFrom, toInput) {
  //    
  //    if (fromInput > 0) {
  //        return usdOfFrom * toInput;
  //    } else {
  //        return 'Input amount';
  //    }
  // }
  // 
  // --PRIMARY ACCOUNT
  // const primaryBudget = (from usersScreen)
  // must subtract every credit and debit purchase including atm withdrawls
  // must not factor in secondary currency cash expenditures
  // BUILD const primaryAccountCalc = object loop function adding 'converted' !cash
  // Parameters: type !cash, converted
  // 
  // const primaryAccountCalc = (type, converted, objects, budget) => {
  //    forIn ... (Logic to loop through objects) {
  //      if (objects.type !== cash) {
  //        setPrimaryAccount += objects.converted;
  //            const primaryChart = budget - primaryAccount;
  //    }
  //    return primaryChart;
  //  }
  // }
  // Then pass primaryChart to StatisticsScreen
  // 
  // 
  // --EVERY EXPENSE
  // Same as PrimaryChart/Account except: doesn't factor atm withdrawls as an expenditure
  // ignore debit atm withdrawls
  // credit, debit, and cash purchases included in calculation
  // credit and debit are in primary, cash 
  // ???How subtract cash expense from budget if exchange rate at time of atm withdrawl???
  // Technically you'd have to subtract by original exchange value
  // Withdrawls at different dates shouldn't be combined???
  // objects will include 'converted' which could be used in this case
  // could create an array of arrays or objects of withdrawls in order including their 'converted' number, and subtract in order of earliest to latest??
  // 
  // 
  // --CASH REMAINING
  // function that recognizes every debit or credit withdrawl, and adds to const secondaryCashAvail
  // function that loops through objects, recognizes cash type, const secondaryCashExp += secondary price
  // function that subtracts secondaryCashExp from secondaryCashAvail resulting in chart data const secondaryCashSpending
  // ALL OF THESE CAN PROBABLY BE DONE IN THE SUBMIT HANDLER


  // CATEGORY ARRAY INTO AN OBJECT
  function createObjectArray(array) {
    return array.map((item, index) => {
      return {
        key: index + 1,
        value: item
      };
    });
  }

  // STORES OBJECT IN VARIABLE
  const dataCateg = createObjectArray(categoryItems);

  // CREATES ARRAY OF EXPENDITURE INFORMATION
  const [objects, setObjects] = useState([]);
  const [type, setType] = useState('');
  const [currency, setCurrency] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');

  // const [usdOf, setUsdOf] = useState('');
  // const [converted, setConverted] = useState(''); (converted to primary)
  // const [primaryAccount, setPrimaryAccount] = useState('');
  // const [everyExpense, setEveryExpense] = useState('');
  // const [cashRemaining, setCashRemaining] = useState('');


  // MODAL
  const [modalVisible, setModalVisible] = useState(false);

  // MODAL AND DELETION
  const [selectedItem, setSelectedItem] = useState(null);

  // DATE PICKER
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleDateChange = (text) => {
    setDate(String(text));
    hideDatePicker();
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // CURRENCY PICKER

  // SECONDARY CURRENCY PICKER STATES
  const [secondaryCountryData, setSecondaryCountryData] = useState([]);
  const [secondarySelected, setSecondarySelected] = useState(undefined);
  const [secondaryQuery, setSecondaryQuery] = useState('');

  // HANDLE SECONDARY AMOUNT CHANGE
  const [secondaryAmount, setSecondaryAmount] = useState('');

  // AXIOS REQUEST FOR API - LIMITED USE
  // useEffect(() => {
  //   axios.get(BASE_URL)
  //     .then(response => {
  //       console.log(response.data);
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }, [])

  // console.log("**********countries", countries.data.ADA.code);

  // CONVERTS CURRENCY API OBJ OF OBJS INTO ARRAY OF OBJS
  useEffect(() => {
    function convert_to_objects(data) {
      const obj_list = [];
      for (let code in data) {
        const values = data[code];
        const obj = { "name": code, "value": values["value"] };
        obj_list.push(obj);
      }
      return obj_list;
    }

    const arrayOfObj = convert_to_objects(countries.data);

    setSecondaryCountryData(arrayOfObj);
  }, []);

  // SECONDARY CURRENCY PICKER SEARCH FUNCTION
  const filteredSecondaryData = useMemo(() => {
    if (secondaryCountryData && secondaryCountryData.length > 0) {
      return secondaryCountryData.filter((item) =>
        item.name
          .toLocaleLowerCase('en')
          .includes(secondaryQuery.toLocaleLowerCase('en'))
      );
    }
  }, [secondaryCountryData, secondaryQuery]);

  const onSecondarySearch = (text) => {
    setSecondaryQuery(text);
  }

  // SECONDARY PICKER TITLE FUNCTION
  const verifySecondary = () => {
    if (secondarySelected) {
      return `Chosen Currency: ${String(secondarySelected)}`
    } else {
      return "Choose Currency";
    }
  }

  // SECONDARY INPUT AMOUNT
  const handleSecondaryAmountChange = (text) => {
    setSecondaryAmount(text);
  };

  // const [data, setData] = useState([]);
  // const [query, setQuery] = useState('');
  // // const [selected, setSelected] = useState(undefined);

  // useEffect(() => {
  //   setData(countries);
  // }, []);

  // const filteredData = useMemo(() => {
  //   if (data && data.length > 0) {
  //     return data.filter((item) =>
  //       item.name
  //         .toLocaleLowerCase('en')
  //         .includes(query.toLocaleLowerCase('en'))
  //     );
  //   }
  // }, [data, query]);

  // const onSearch = (text) => {
  //   setQuery(text);
  // };

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

  // PRICE
  const handlePriceChange = (text) => {
    setPrice(text);
  };

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

    // this is where the conversion function can go, and can setConverted to += ###
    // the converted # must be added to the expenditure object BECAUSE this will be the accurate conversion at time of purchase

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

  // CATEGORY DELETION (Change name to expenditure deletion)
  const deleteCategory = (index) => {
    let itemsCopy = [...objects];
    itemsCopy.splice(index, 1);
    setObjects(itemsCopy);
    setSelectedItem(null);
  }

  return (
    <ScrollView style={{ backgroundColor: '#eee' }} keyboardShouldPersistTaps='handled'>
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
            title={verifySecondary(secondarySelected)}
            tintColor='grey'
            style={styles.bluebutton}
            onPress={() => {
              onOpen('country');
            }}>
          </Button>
          {/* <Text style={{ padding: 10 }}>Chosen : {JSON.stringify(selected.name)}</Text> */}
          <Picker
            id="country"
            data={filteredSecondaryData}
            inputValue={secondaryQuery}
            searchable={true}
            label="Currency"
            setSelected={(val) => setSecondarySelected(val.name)}
            onSearch={onSecondarySearch}
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


      {/* COMPLETE RENDERED EXPENSE LIST */}
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


      {/* MODAL OF EACH EXPENDITURES DATA */}
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