import React, { useState, useMemo, useEffect } from "react";
import { ListItem, TextInput, Switch, Button } from "@react-native-material/core";
import { ScrollView, View, Text, SafeAreaView, TouchableOpacity, Keyboard, StyleSheet, Modal, KeyboardAvoidingView } from 'react-native';
import { Picker, onOpen } from 'react-native-actions-sheet-picker';
import pickerData from '../utilities/picker-object.json'


// import countries from './countries2.json';
import countries from '../utilities/currency.json'

export default function User() {

  // STATES FOR PRIMARY CURRENCY SEARCH AND SELECTION SHEET MODAL
  const [primaryPickerData, setPrimaryPickerData] = useState([]);
  const [primarySelected, setPrimarySelected] = useState(undefined);
  const [primaryQuery, setPrimaryQuery] = useState('');

  // STATES FOR SECONDARY CURRENCY SEARCH AND SELECTION SHEET MODAL
  const [secondaryPickerData, setSecondaryPickerData] = useState([]);
  const [secondarySelected, setSecondarySelected] = useState(undefined);
  const [secondaryQuery, setSecondaryQuery] = useState('');

  // STATES FOR NOTIFICATION SWITCH
  const [enabledNotifications, setEnabledNotifications] = useState(true);

  // SETTING PICKER DATA
  useEffect(() => {
    setPrimaryPickerData(pickerData);
    setSecondaryPickerData(pickerData);
  }, []);


  // const onChangePrimary = async (text = '') => {
  //   setPrimary(text)
  // }

  // const onChangeSecondary = async (text = '') => {
  //   setSecondary(text)
  // }

  // SEARCH FUNCTION USING QUERY FOR PRIMARY CURRENCY PICKER 
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

  // SEARCH FUNCTION USING QUERY FOR SECONDARY CURRENCY PICKER
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

  // PRIMARY PICKER TITLE FUNCTION
  const verifyPrimary = () => {
    if (primarySelected) {
      return `${String(primarySelected.currency)}`
    } else {
      return "Select";
    }
  }

  // SECONDARY PICKER TITLE FUNCTION
  const verifySecondary = () => {
    if (secondarySelected) {
      return `${String(secondarySelected.currency)}`;
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
          setSelected={(val) => setPrimarySelected(val)}
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
        setSelected={(val) => setSecondarySelected(val)}
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