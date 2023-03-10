import React, { useState, useMemo, useEffect } from "react";
import { ListItem, TextInput, Switch, Button } from "@react-native-material/core";
import { ScrollView, View, Text, SafeAreaView, TouchableOpacity, Keyboard, StyleSheet, Modal, KeyboardAvoidingView } from 'react-native';
import { Picker, onOpen } from 'react-native-actions-sheet-picker';


import countries from './countries2.json';

export default function User() {
  const [primaryCountryData, setPrimaryCountryData] = useState([]);
  const [primarySelected, setPrimarySelected] = useState(undefined);
  const [primaryQuery, setPrimaryQuery] = useState('');

  const [secondaryCountryData, setSecondaryCountryData] = useState([]);
  const [secondarySelected, setSecondarySelected] = useState(undefined);
  const [secondaryQuery, setSecondaryQuery] = useState('');

  const [enabled, setEnabled] = useState(true);
  const [enabledDark, setEnabledDark] = useState(true);

  useEffect(() => {
    setPrimaryCountryData(countries);
  }, []);

  useEffect(() => {
    setSecondaryCountryData(countries);
  }, []);

  // const onChangePrimary = async (text = '') => {
  //   setPrimary(text)
  // }

  // const onChangeSecondary = async (text = '') => {
  //   setSecondary(text)
  // }

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
      return `${String(primarySelected)}`
    } else {
      return "Select";
    }
  }
  const verifySecondary = () => {
    if (secondarySelected) {
      return `${String(secondarySelected)}`;
    } else {
      return "Select"
    }
  }

  const onPrimarySearch = (text) => {
    setPrimaryQuery(text);
  };

  const onSecondarySearch = (text) => {
    setSecondaryQuery(text);
  }

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
        <Text
          style={{ fontSize: 16, marginTop: 18, marginLeft: 15 }}
        >Primary Budget</Text>
        <TextInput
          style={{ width: 220, paddingRight: 20, borderColor: 'lightgrey' }}
          variant='outlined'
          placeholder='Enter here'
          placeholderTextColor="grey"
          color='grey'
        // onChangeText={onChangeSecondary}
        />
      </View>


      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={styles.currencyText}>
          <Text style={styles.currencyFont}>Primary Currency</Text>
        </View>
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
      </View>


      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={styles.currencyText}>
          <Text style={styles.currencyFont}>Secondary Currency</Text>
        </View>
        <Button
          title={verifySecondary(secondarySelected)}
          tintColor='grey'
          style={styles.bluebutton}
          onPress={() => {
            onOpen('city');
          }}
        />
      </View>
      <Picker
        id="city"
        data={filteredSecondaryData}
        inputValue={secondaryQuery}
        searchable={true}
        label="Select Secondary Currency"
        setSelected={(val) => setSecondarySelected(val.name)}
        onSearch={onSecondarySearch}
      />


      <ListItem
        title="Username"
        secondaryText="Briankendalbucek"
      />


      <ListItem
        title="First name"
        secondaryText="Brian"
      />


      <ListItem
        title="Last name"
        secondaryText="Bucek"
      />


      <ListItem
        title="Change password"
      />

      <ListItem
        title="Notifications"
        trailing={
          <Switch style={styles.switch} value={enabled} onValueChange={() => setEnabled(!enabled)} />
        }
        onPress={() => setEnabled(!enabled)}
      />

      <ListItem
        title="Dark mode"
        trailing={
          <Switch style={styles.switch} value={enabledDark} onValueChange={() => setEnabledDark(!enabledDark)} />
        }
        onPress={() => setEnabledDark(!enabledDark)}
      />


      <ListItem
        title="Logout"
      />


    </ScrollView>
  )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'transparent',
    variant: 'filled',
    marginHorizontal: 20,
    marginVertical: 5
  },
  bluebutton: {
    marginVertical: 10,
    backgroundColor: 'lightblue',
    color: 'grey',
    width: 200,
    marginRight: 20
    // marginHorizontal: 20,
    // marginTop: 40,
  },
  currencyText: {
    justifyContent: 'center',
    alignItems: 'center',
    // fontSize: 20,
    paddingLeft: 16
  },
  currencyFont: {
    fontSize: 16
  },
  switch: {
    marginRight: 30
  }
})