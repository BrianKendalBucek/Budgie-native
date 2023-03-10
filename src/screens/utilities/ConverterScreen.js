import React, { useState, useMemo, useEffect } from 'react';
import { View, ScrollView, SafeAreaView, StyleSheet, Text, TouchableOpacity, Keyboard } from 'react-native';
import { Box, TextInput, Button } from "@react-native-material/core";
import { Picker, onOpen } from 'react-native-actions-sheet-picker';


import countries from './countries.json';

export default function ConverterScreen() {
  const [primaryCountryData, setPrimaryCountryData] = useState([]);
  const [primarySelected, setPrimarySelected] = useState(undefined);
  const [primaryQuery, setPrimaryQuery] = useState('');

  const [secondaryCountryData, setSecondaryCountryData] = useState([]);
  const [secondarySelected, setSecondarySelected] = useState(undefined);
  const [secondaryQuery, setSecondaryQuery] = useState('');

  const [price, setPrice] = useState('');

  useEffect(() => {
    setPrimaryCountryData(countries);
  }, []);

  useEffect(() => {
    setSecondaryCountryData(countries);
  }, []);

  const filteredPrimaryData = useMemo(() => {
    if (primaryCountryData && primaryCountryData.length > 0) {
      return primaryCountryData.filter((item) =>
        item.name
          .toLocaleLowerCase('en')
          .includes(primaryQuery.toLocaleLowerCase('en'))
      );
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
      return `From: ${String(primarySelected)}`
    } else {
      return "From";
    }
  }
  const verifySecondary = () => {
    if (secondarySelected) {
      return `To: ${String(secondarySelected)}`;
    } else {
      return "To"
    }
  }

  const onPrimarySearch = (text) => {
    setPrimaryQuery(text);
  };

  const onSecondarySearch = (text) => {
    setSecondaryQuery(text);
  }

  const handlePriceChange = (text) => {
    setPrice(text);
  };

  return (
    <SafeAreaView style={styles.pickerContainer}>
      <View style={styles.boxposition}>
        <Box style={styles.box} />
      </View>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={handlePriceChange}
        placeholder="Amount to convert"
        color="grey"
        variant='outlined'
      />


      <Button
        title={verifyPrimary(primarySelected)}
        tintColor='grey'
        style={styles.bluebutton}
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
  )
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
    marginTop: 40
  },
  bluebutton: {
    backgroundColor: 'lightblue',
    color: 'grey',
    marginHorizontal: 20,
    marginTop: 20,
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
    marginBottom: 10,
  }
})