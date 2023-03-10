import React, { useState, useMemo, useEffect } from 'react';
import { View, ScrollView, SafeAreaView, StyleSheet, Text, TouchableOpacity, Keyboard } from 'react-native';
import { Box, TextInput, Button } from "@react-native-material/core";
import { Picker, onOpen } from 'react-native-actions-sheet-picker';
import axios from 'axios';


import countries from './currency.json';

// const BASE_URL = "https://api.currencyapi.com/v3/latest?apikey=vLzph0kSqJvRoCI7IvIcYhBMgwgV3KkONWlMEmLi&currencies=";


export default function Play() {
  const [primaryCountryData, setPrimaryCountryData] = useState([]);
  const [primarySelected, setPrimarySelected] = useState(undefined);
  const [primaryQuery, setPrimaryQuery] = useState('');

  const [secondaryCountryData, setSecondaryCountryData] = useState([]);
  const [secondarySelected, setSecondarySelected] = useState(undefined);
  const [secondaryQuery, setSecondaryQuery] = useState('');

  const [primaryAmount, setPrimaryAmount] = useState('');
  const [secondaryAmount, setSecondaryAmount] = useState('');

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

  useEffect(() => {
    setPrimaryCountryData(countries.data);
  }, []);

  useEffect(() => {
    setSecondaryCountryData(countries.data);
  }, []);

  const filterCurrencyObj = (data) => {
    const codes = [];

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        codes.push(data[key].code);
      }
    }

    console.log("CODES", codes);
  }

  filterCurrencyObj(countries.data);


  const filteredPrimaryData = useMemo(() => {
    if (primaryCountryData && primaryCountryData.length > 0) {

      // return primaryCountryData.filter((item) =>
      //   item.name
      //     // .console.log("FILTRATION", item.name)
      //     .toLocaleLowerCase('en')
      //     .includes(primaryQuery.toLocaleLowerCase('en'))
      // );
    }
  }, [primaryCountryData, primaryQuery]);

  const filteredSecondaryData = useMemo(() => {
    if (secondaryCountryData && secondaryCountryData.length > 0) {
      return secondaryCountryData.filter((item) =>
        item.name
          .toLocaleLowerCase('en')
          .includes(secondaryQuery.toLocaleLowerCase('en'))
      );
    }
  }, [secondaryCountryData, secondaryQuery]);

  const verifyPrimary = () => {
    if (primarySelected) {
      return `${String(primarySelected)}`
    } else {
      return "Choose Currency";
    }
  }
  const verifySecondary = () => {
    if (secondarySelected) {
      return `${String(secondarySelected)}`;
    } else {
      return "Choose Currency"
    }
  }

  const onPrimarySearch = (text) => {
    setPrimaryQuery(text);
  };

  const onSecondarySearch = (text) => {
    setSecondaryQuery(text);
  }

  const handlePrimaryAmountChange = (text) => {
    setPrimaryAmount(text);
  };

  const handleSecondaryAmountChange = (text) => {
    setSecondaryAmount(text);
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
        onChangeText={handlePrimaryAmountChange}
        placeholder="Enter amount"
        color="grey"
        variant='outlined'
      />


      {/* FIRST BUTTON AND INPUT */}
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
        onChangeText={handleSecondaryAmountChange}
        placeholder="Enter amount"
        color="grey"
        variant='outlined'
      />


      {/* SUBMIT BUTTON */}
      <Button
        title="Submit"
        tintColor='grey'
        style={styles.bluebutton}
        onPress={() => {
          // handleSubmit({ type, price, currency, date, category, title });
          Keyboard.dismiss();
        }}
      />
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
