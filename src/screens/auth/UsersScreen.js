import React, { useState, useMemo, useEffect } from "react";
import { ListItem, TextInput, Switch, Button } from "@react-native-material/core";
import { ScrollView, View, Text, SafeAreaView, TouchableOpacity, Keyboard, StyleSheet, Modal, KeyboardAvoidingView } from 'react-native';
import { Picker, onOpen } from 'react-native-actions-sheet-picker';

// import countries from './countries2.json';
import countries from '../utilities/currency.json'

export default function User() {

  // STATES FOR PRIMARY CURRENCY SEARCH AND SELECTION SHEET MODAL
  const [primaryCountryData, setPrimaryCountryData] = useState([]);
  const [primarySelected, setPrimarySelected] = useState(undefined);
  const [primaryQuery, setPrimaryQuery] = useState('');

  // STATES FOR SECONDARY CURRENCY SEARCH AND SELECTION SHEET MODAL
  const [secondaryCountryData, setSecondaryCountryData] = useState([]);
  const [secondarySelected, setSecondarySelected] = useState(undefined);
  const [secondaryQuery, setSecondaryQuery] = useState('');

  // STATES FOR NOTIFICATION SWITCH
  const [enabledNotifications, setEnabledNotifications] = useState(true);

  // SETSTATE FOR PRIMARY CURRENCY PICKER
  useEffect(() => {
    setPrimaryCountryData(countries);
  }, []);

  // SETSTATE FOR SECONDARY CURRENCY PICKER
  useEffect(() => {
    setSecondaryCountryData(countries);
  }, []);

  // const onChangePrimary = async (text = '') => {
  //   setPrimary(text)
  // }

  // const onChangeSecondary = async (text = '') => {
  //   setSecondary(text)
  // }

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

  // SEARCH FUNCTION USING QUERY FOR PRIMARY CURRENCY PICKER 
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

  // SEARCH FUNCTION USING QUERY FOR SECONDARY CURRENCY PICKER
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
      return `${String(primarySelected)}`
    } else {
      return "Select";
    }
  }

  // SECONDARY PICKER TITLE FUNCTION
  const verifySecondary = () => {
    if (secondarySelected) {
      return `${String(secondarySelected)}`;
    } else {
      return "Select"
    }
  }


  return (
    <ScrollView style={styles.scrollViewBackground}>

      {/* PRIMARY BUDGET SETTER */}
      <View style={styles.primaryBudgetView}>
        <Text
          style={styles.primaryBudgetText}
        >Primary Budget</Text>
        <TextInput
          style={styles.primaryBudgetInput}
          variant='outlined'
          placeholder='Enter here'
          placeholderTextColor="grey"
          color='grey'
        // onChangeText={onChangeSecondary}
        />
      </View>

      {/* PRIMARY CURRENCY PICKER */}
      <View style={styles.primaryPickerView}>
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

      {/* SECONDARY CURRENCY PICKER */}
      <View style={styles.secondaryPickerView}>
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

      {/* USERNAME */}
      <ListItem
        title="Username"
        secondaryText="Briankendalbucek"
      />

      {/* FIRST NAME */}
      <ListItem
        title="First name"
        secondaryText="Brian"
      />

      {/* LAST NAME */}
      <ListItem
        title="Last name"
        secondaryText="Bucek"
      />

      {/* CHANGE PASSWORD */}
      <ListItem
        title="Change password"
      />

      {/* NOTIFICATIONS SWITCH */}
      <ListItem
        title="Notifications"
        trailing={
          <Switch
            style={styles.switch}
            value={enabledNotifications}
            onValueChange={() => setEnabledNotifications(!enabledNotifications)} />
        }
        onPress={() => setEnabledNotifications(!enabledNotifications)}
      />

      {/* LOGOUT */}
      <ListItem
        title="Logout"
      />

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollViewBackground: {
    backgroundColor: '#eee',
  },
  primaryBudgetView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  primaryBudgetText: {
    fontSize: 16,
    marginTop: 18,
    marginLeft: 15,
  },
  primaryBudgetInput: {
    width: 220,
    paddingRight: 20,
    borderColor: 'lightgrey',
  },
  primaryPickerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  secondaryPickerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  bluebutton: {
    backgroundColor: 'lightblue',
    color: 'grey',
    width: 100,
    marginVertical: 5,
    marginRight: 20
  },
  currencyText: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 16
  },
  currencyFont: {
    fontSize: 16
  },
  switch: {
    marginRight: 30
  },
})