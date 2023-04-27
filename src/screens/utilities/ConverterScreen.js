import React, { useState, useMemo, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Keyboard, Text } from 'react-native';
import { TextInput, Button } from "@react-native-material/core";
import { Picker, onOpen } from 'react-native-actions-sheet-picker';
import pickerData from '../utilities/picker-object.json'
// import axios from 'axios';
import currencyApi from '../utilities/currency.json'


export default function Converter() {
  
  // API DATA STATE
  const [countries, setCountries] = useState([]);
  
  // SELECTED-CURRENCY-TO-API-VALUE MATCHING STATES
  const [primaryApiMatch, setPrimaryApiMatch] = useState(undefined);
  const [secondaryApiMatch, setSecondaryApiMatch] = useState(undefined);
  
  // PRIMARY PICKER STATES
  const [primaryPickerData, setPrimaryPickerData] = useState([]);
  const [primarySelected, setPrimarySelected] = useState(undefined);
  const [primaryQuery, setPrimaryQuery] = useState('');
  
  // SECONDARY PICKER STATES
  const [secondaryPickerData, setSecondaryPickerData] = useState([]);
  const [secondarySelected, setSecondarySelected] = useState(undefined);
  const [secondaryQuery, setSecondaryQuery] = useState('');
  
  // HANDLE PRIMARY/SECONDARY AMOUNT CHANGE
  const [primaryAmount, setPrimaryAmount] = useState('');
  const [secondaryAmount, setSecondaryAmount] = useState('');
  
  // CONVERSION RESULT STATES
  const [resultOne, setResultOne] = useState('');
  const [resultTwo, setResultTwo] = useState('');
  
  // SETTING PICKER DATA
  useEffect(() => {
    setPrimaryPickerData(pickerData);
    setSecondaryPickerData(pickerData);
  }, [])
  
  
  // PICKER SEARCH FUNCTION
  const filteredPrimaryData = useMemo(() => {
    if (primaryPickerData && primaryPickerData.length > 0) {
      return primaryPickerData.filter((item) =>
      item.name
      .toLocaleLowerCase('en')
      .includes(primaryQuery.toLocaleLowerCase('en'))
      );
    }
  }, [primaryPickerData, primaryQuery]);
  
  const onPrimarySearch = (text) => {
    setPrimaryQuery(text);
  };
  
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
      
      
      // PICKER TITLE FUNCTION
      const verifyPrimary = () => {
        if (primarySelected) {
          return `Chosen Currency: ${String(primarySelected.currency)}`
        } else {
          return "Choose Currency";
        }
      }
      
      const verifySecondary = () => {
        if (secondarySelected) {
          return `Chosen Currency: ${String(secondarySelected.currency)}`;
        } else {
          return "Choose Currency"
        }
      }
      
      
      // INPUT AMOUNT SETTERS
      const handlePrimaryAmountChange = (text) => {
        setPrimaryAmount(text);
      };

      const handleSecondaryAmountChange = (text) => {
        setSecondaryAmount(text);
      }
      
      
      // MATCHING SELECTED CURRENCY WITH API CURRENCY FOR VALUE
      const primaryCurrencyValueMatch = () => {
        if (primarySelected) {
          for (let code in countries.data) {
            if (countries.data[code].code === primarySelected.currency) {
              return setPrimaryApiMatch(countries.data[code].value);
            }
          }
        }
      }
      
      const secondaryCurrencyValueMatch = () => {
        if (secondarySelected) {
          for (let code in countries.data) {
            if (countries.data[code].code === secondarySelected.currency) {
              return setSecondaryApiMatch(countries.data[code].value);
            }
          }
        }
      }
      
      
      // EMPTIES AMOUNT STATE OF OPPOSING INPUT
      const handlePrimaryInputFocus = () => {
        setSecondaryAmount(null);
      }
      
      const handleSecondaryInputFocus = () => {
        setPrimaryAmount(null);
      }
      
      const handleSubmit = () => {
        // const BASE_URL = "https://api.currencyapi.com/v3/latest?apikey=vLzph0kSqJvRoCI7IvIcYhBMgwgV3KkONWlMEmLi&currencies=";
        
        // axios.get(BASE_URL)
        //   .then((res) => setCountries(res.data))
        //   .catch(error => {
        //       console.error(error);
        //     });
          setCountries(currencyApi);
          
          const firstValue = primarySelected ? primaryApiMatch : 0;
          const secondValue = secondarySelected ? secondaryApiMatch : 0;
          const firstInput = primaryAmount ? primaryAmount : 0;
          const secondInput = secondaryAmount ? secondaryAmount : 0;
          const usdOfFirstInput = primarySelected && primaryAmount ? firstInput / firstValue : 1;
          const usdOfSecondInput = secondarySelected && secondaryAmount ? secondInput / secondValue : 1;
          const resultFirstSecond = firstInput ? usdOfFirstInput * secondValue : 0;
          const resultSecondFirst = secondInput ? usdOfSecondInput * firstValue : 0;
          
          if (primarySelected) {
            primaryCurrencyValueMatch();
            const firstConvert = () => {
              const resultOneDec = resultFirstSecond.toFixed(2);
              return setResultOne(resultOneDec);
            }
            firstConvert();
          }

    if (secondarySelected) {
      secondaryCurrencyValueMatch();
      const secondConvert = () => {
        const resultTwoDec = resultSecondFirst.toFixed(2);
        return setResultTwo(resultTwoDec);
      }
      secondConvert()
    }
  }

  return (
    <SafeAreaView style={styles.pickerContainer}>

      <Text style={styles.pageTitle}>Currency Converter</Text>


      {/* FIRST BUTTON AND INPUT */}
      <Button
        title={verifyPrimary(primarySelected)}
        tintColor='grey'
        style={styles.topBlueButton}
        onPress={() => {
          onOpen('country');
        }}
      />
      <Picker
        id="country"
        data={filteredPrimaryData}
        inputValue={primaryQuery}
        searchable={true}
        label="Select Primary Currency"
        setSelected={(val) => setPrimarySelected(val)}
        onSearch={onPrimarySearch}
      />
      <TextInput
        style={styles.input}
        value={primaryAmount}
        onFocus={handlePrimaryInputFocus}
        onChangeText={handlePrimaryAmountChange}
        placeholder={resultTwo ? resultTwo : "Enter amount"}
        color="grey"
        variant='outlined'
        keyboardType='numeric'
      />


      {/* SECOND BUTTON AND INPUT */}
      <Button
        title={verifySecondary(secondarySelected)}
        tintColor='grey'
        style={styles.bluebutton}
        onPress={() => {
          onOpen('city');
        }}
      />
      <Picker
        id="city"
        data={filteredSecondaryData}
        inputValue={secondaryQuery}
        searchable={true}
        label="Select Secondary Currency"
        setSelected={(val) => setSecondarySelected(val)}
        onSearch={onSecondarySearch}
      />
      <TextInput
        style={styles.input}
        value={secondaryAmount}
        keyboardType='numeric'
        onFocus={handleSecondaryInputFocus}
        onChangeText={handleSecondaryAmountChange}
        placeholder={resultOne ? resultOne : "Enter amount"}
        color="grey"
        variant='outlined'
      />


      {/* SUBMIT BUTTON */}
      <Button
        title="Submit"
        tintColor='grey'
        style={styles.bluebutton}
        onPress={() => {
          handleSubmit();
          Keyboard.dismiss();
        }}
      />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  pageTitle: {
    color: 'grey',
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 20,
  },
  pickerContainer: {
    backgroundColor: '#eee',
  },
  pickerButton: {
    backgroundColor: '#8B93A5',
    padding: 10,
    borderRadius: 6,
    marginTop: 50,
  },
  input: {
    backgroundColor: 'transparent',
    variant: 'filled',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  topBlueButton: {
    marginTop: 30,
    backgroundColor: 'lightblue',
    color: 'grey',
    marginHorizontal: 20,
  },
  bluebutton: {
    backgroundColor: 'lightblue',
    color: 'grey',
    marginHorizontal: 20,
  },
  box: {
    height: 50,
    width: 200,
    backgroundColor: 'lightgrey',
    borderRadius: 10,
  },
  boxposition: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 30,
  }
});
