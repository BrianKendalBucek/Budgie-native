import React, { useState, useMemo, useEffect } from 'react';
import { ScrollView, View, SafeAreaView, StyleSheet, Text, Keyboard, Alert, Modal } from 'react-native';
import { TextInput, Button, ListItem } from "@react-native-material/core";
import { Flex } from 'react-native-flex-layout';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker, onOpen } from 'react-native-actions-sheet-picker';
import pickerData from '../utilities/picker-object.json'
// import axios from 'axios';
import { SelectList } from 'react-native-dropdown-select-list'
import moment from 'moment';
import currencyApi from './currency.json';


export default function ExpendituresScreen({
  categoryItems,
  cashChart,
  setCashChart,
  budget,
  primaryDefault,
  secondaryDefault,
  expenseChart,
  setExpenseChart,
  primaryChart,
  setPrimaryChart,
}) {

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
  // 
  // const primaryAccount = () => {
  // 
  // if ()
  // 
  // }

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


  // API DATA STATE
  const [countries, setCountries] = useState([]);

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
  const [usd, setUsd] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');

  // MODAL
  const [modalVisible, setModalVisible] = useState(false);

  // MODAL AND DELETION
  const [selectedItem, setSelectedItem] = useState(null);

  // DATE PICKER
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  // SECONDARY CURRENCY PICKER STATES
  const [secondaryPickerData, setSecondaryPickerData] = useState([]);
  // const [secondarySelected, setSecondarySelected] = useState(undefined);
  // CURRENCY AND SETCURRENCY IN PLACE OF THESE
  const [secondaryQuery, setSecondaryQuery] = useState('');

  // SETTING CURRENCY PICKER DATA
  useEffect(() => {
    setSecondaryPickerData(pickerData);
  }, [])

  // DATE PICKER HANDELING
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


  // HANDLE SECONDARY AMOUNT CHANGE
  // const [secondaryAmount, setSecondaryAmount] = useState('');


  // SECONDARY CURRENCY PICKER SEARCH FUNCTION
  const filteredSecondaryData = useMemo(() => {
    if (secondaryPickerData && secondaryPickerData.length > 0) {
      return secondaryPickerData.filter((item) =>
        item.name
          .toLocaleLowerCase('en')
          .includes(secondaryQuery.toLocaleLowerCase('en'))
      );
    }
  }, [secondaryPickerData, secondaryQuery]);

  const onSecondarySearch = (text) => {
    setSecondaryQuery(text);
  }

  // SECONDARY CURRENCY PICKER TITLE FUNCTION
  const verifySecondary = () => {
    if (currency) {
      return `Chosen Currency: ${String(currency)}`
    } else {
      return "Choose Currency";
    }
  }

  // SECONDARY CURRENCY INPUT AMOUNT
  // const handleSecondaryAmountChange = (text) => {
  //   setSecondaryAmount(text);
  // };
  // ********************************


  // PAYMENT TYPE
  const [cashButton, setCashButton] = useState(false);
  const [creditButton, setCreditButton] = useState(false);
  const [debitButton, setDebitButton] = useState(false);
  const [atmButton, setAtmButton] = useState(false);

  const handleTypeChange = (text) => {
    setType('');
    setType(text);
    if (text === 'Cash') {
      setCreditButton(false);
      setDebitButton(false);
      setAtmButton(false);
      setCashButton(true);
    }
    if (text === 'Credit') {
      setCashButton(false);
      setDebitButton(false);
      setAtmButton(false);
      setCreditButton(true);
    }
    if (text === 'Debit') {
      setCashButton(false);
      setCreditButton(false);
      setAtmButton(false);
      setDebitButton(true);
    }
    if (text === 'ATM') {
      setCashButton(false);
      setCreditButton(false);
      setDebitButton(false);
      setAtmButton(true);
    }
  };

  // PRICE
  const handlePriceChange = (text) => {
    setPrice(text);
    const secondValue = currency ? currencyApi.data[currency].value : 0;
    const secondInput = text;
    const usdOfSecondInput = currency && text ? secondInput / secondValue : 1;
    setUsd(usdOfSecondInput);
  };
  // TITLE
  const handleTitleChange = (text) => {
    setTitle(text);
  };

  // MAKE SURE TO CHECK THAT CASH EXPENSE IS IN SECONDARY CURRENCY
  function chartCalc(objects) {
    let atm = 0;
    let cash = 0;
    let credit = 0;
    let debit = 0;

    for (let i = 0; i < objects.length; i++) {
      if (objects[i].type === "ATM") {
        atm += objects[i].usd;
      }
      if (objects[i].type === "Cash") {
        cash += objects[i].usd;
      }
      if (objects[i].type === "Debit") {
        debit += objects[i].usd;
      }
      if (objects[i].type === "Credit") {
        credit += objects[i].usd;
      }
    }

    // let cashPercent = ((atm - cash) / atm) * 100;
    let expensePercent = ((budget - (credit + debit + cash)) / budget) * 100;
    let primaryPercent = ((budget - (credit + debit + atm)) / budget) * 100;

    setExpenseChart(expensePercent),
    setPrimaryChart(primaryPercent);

    return;
      // setCashChart(cashPercent),
  }

  // FINAL SUBMIT
  const handleSubmit = ({ type, price, usd, currency, date, category, title }) => {

    if (!type || !price || !currency || !date || !category || !title) {
      alert("Please fill in all the required fields.");
      return;
    }
    // HERE MUST BE ACTUAL CONVERSION TO USD AT TIME OF SUBMIT
    // const BASE_URL = "https://api.currencyapi.com/v3/latest?apikey=vLzph0kSqJvRoCI7IvIcYhBMgwgV3KkONWlMEmLi&currencies=";

    // axios.get(BASE_URL)
    //   .then((res) => setCountries(res.data))
    //   .catch(error => {
    //       console.error(error);
    //     });
    setCountries(currencyApi);

    const newObject = { key: Date.now(), type, price, usd, currency, date, category, title };
    setObjects([...objects, newObject]);
    setType('');
    setPrice('');
    setUsd('');
    setCurrency('');
    setDate('');
    setCategory('');
    setTitle('');
    setCashButton(false);
    setCreditButton(false);
    setDebitButton(false);
    setAtmButton(false);

    chartCalc([...objects, newObject]);
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

      <Text style={styles.pageTitle}>Expenditure Creator</Text>

      <View>


        {/* PAYMENT TYPE BUTTONS */}
        <View style={styles.buttonboxtop}>
          <Button title="Cash" tintColor='grey' style={cashButton ? styles.selectedbutton : styles.bluebutton}
            onPress={() => {
              handleTypeChange('Cash');
            }
            } />
          <Button title="ATM" tintColor='grey' style={atmButton ? styles.selectedbutton : styles.bluebutton}
            onPress={() => {
              handleTypeChange('ATM');
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
            title={verifySecondary()}
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
            setSelected={(val) => setCurrency(val.currency)}
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
            placeholder="Amount"
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
              handleSubmit({ type, price, usd, currency, date, category, title });
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
  pageTitle: {
    color: 'grey',
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 20,
  },
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