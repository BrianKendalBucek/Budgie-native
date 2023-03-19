import React, { useState, useMemo, useEffect } from 'react';
import { View, ScrollView, SafeAreaView, StyleSheet, Text, TouchableOpacity, Keyboard } from 'react-native';
import { Box, TextInput, Button } from "@react-native-material/core";
import { Picker, onOpen } from 'react-native-actions-sheet-picker';
import axios from 'axios';


import countries from './currency.json';

// const BASE_URL = "https://api.currencyapi.com/v3/latest?apikey=vLzph0kSqJvRoCI7IvIcYhBMgwgV3KkONWlMEmLi&currencies=";


export default function Play() {

  // PRIMARY PICKER STATES
  const [primaryCountryData, setPrimaryCountryData] = useState([]);
  const [primarySelected, setPrimarySelected] = useState(undefined);
  const [primaryQuery, setPrimaryQuery] = useState('');

  // SECONDARY PICKER STATES
  const [secondaryCountryData, setSecondaryCountryData] = useState([]);
  const [secondarySelected, setSecondarySelected] = useState(undefined);
  const [secondaryQuery, setSecondaryQuery] = useState('');

  // HANDLE PRIMARY/SECONDARY AMOUNT CHANGE
  const [primaryAmount, setPrimaryAmount] = useState('');
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

    setPrimaryCountryData(arrayOfObj);
    setSecondaryCountryData(arrayOfObj);
  }, []);

  // PRIMARY CURRENCY PICKER SEARCH FUNCTION
  const filteredPrimaryData = useMemo(() => {
    if (primaryCountryData && primaryCountryData.length > 0) {
      return primaryCountryData.filter((item) =>
        item.name
          .toLocaleLowerCase('en')
          .includes(primaryQuery.toLocaleLowerCase('en'))
      );
    }
  }, [primaryCountryData, primaryQuery]);

  const onPrimarySearch = (text) => {
    setPrimaryQuery(text);
  };

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

  // PRIMARY PICKER TITLE FUNCTION
  const verifyPrimary = () => {
    if (primarySelected) {
      return `Chosen Currency: ${String(primarySelected)}`
    } else {
      return "Choose Currency";
    }
  }

  // SECONDARY PICKER TITLE FUNCTION
  const verifySecondary = () => {
    if (secondarySelected) {
      return `Chosen Currency: ${String(secondarySelected)}`;
    } else {
      return "Choose Currency"
    }
  }

  // PRIMARY INPUT AMOUNT
  const handlePrimaryAmountChange = (text) => {
    setPrimaryAmount(text);
  };
  // SECONDARY INPUT AMOUNT
  const handleSecondaryAmountChange = (text) => {
    setSecondaryAmount(text);
  }

  // CONVERSION BETWEEN CURRENCIES
  const firstValue = primarySelected ? countries.data[primarySelected].value : 0;
  const secondValue = secondarySelected ? countries.data[secondarySelected].value : 0;
  const firstInput = primaryAmount ? primaryAmount : 0;
  const secondInput = secondaryAmount ? secondaryAmount : 0;
  const usdOfFirstInput = primarySelected && primaryAmount ? firstInput / firstValue : 1;
  const usdOfSecondInput = secondarySelected && secondaryAmount ? secondInput / secondValue : 1;
  const resultFirstSecond = firstInput ? usdOfFirstInput * secondValue : 0;
  const resultSecondFirst = secondInput ? usdOfSecondInput * firstValue : 0;

  const handlePrimaryInputFocus = () => {
    setSecondaryAmount(0);
  }

  const handleSecondaryInputFocus = () => {
    setPrimaryAmount(0);
  }

  return (
    <SafeAreaView style={styles.pickerContainer}>

      {/* RESULTS BOX
      <View style={styles.boxposition}>
        <Box style={styles.box} />
      </View> */}

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
        setSelected={(val) => setPrimarySelected(val.name)}
        onSearch={onPrimarySearch}
      />
      <TextInput
        style={styles.input}
        value={primaryAmount}
        onFocus={handlePrimaryInputFocus}
        onChangeText={handlePrimaryAmountChange}
        placeholder={resultSecondFirst ? String(resultSecondFirst) : "Enter amount"}
        color="grey"
        variant='outlined'
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
        setSelected={(val) => setSecondarySelected(val.name)}
        onSearch={onSecondarySearch}
      />
      <TextInput
        style={styles.input}
        value={secondaryAmount}
        onFocus={handleSecondaryInputFocus}
        onChangeText={handleSecondaryAmountChange}
        placeholder={resultFirstSecond ? String(resultFirstSecond) : "Enter amount"}
        color="grey"
        variant='outlined'
      />


      {/* SUBMIT BUTTON *
      {/* <Button
        title="Submit"
        tintColor='grey'
        style={styles.bluebutton}
        onPress={() => {
          // handleSubmit({ type, price, currency, date, category, title });
          Keyboard.dismiss();
        }}
      /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pickerContainer: {
    backgroundColor: '#eee',
    // flex: 1,
    // alignItems: 'center',
    // marginHorizontal: 20
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
