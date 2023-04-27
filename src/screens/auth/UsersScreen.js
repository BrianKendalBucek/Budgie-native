import React, { useState, useMemo, useEffect } from "react";
import { ListItem, TextInput, Switch, Button } from "@react-native-material/core";
import { ScrollView, View, Text, SafeAreaView, TouchableOpacity, Keyboard, StyleSheet, Modal, KeyboardAvoidingView } from 'react-native';
import { Picker, onOpen } from 'react-native-actions-sheet-picker';
import pickerData from '../utilities/picker-object.json'


// import countries from './countries2.json';
// import countries from '../utilities/currency.json'

export default function User({ budget, setBudget, primaryDefault, setPrimaryDefault, secondaryDefault, setSecondaryDefault }) {

  // STATES FOR PRIMARY CURRENCY SEARCH AND SELECTION SHEET MODAL
  const [primaryPickerData, setPrimaryPickerData] = useState([]);
  const [primaryQuery, setPrimaryQuery] = useState('');

  // STATES FOR SECONDARY CURRENCY SEARCH AND SELECTION SHEET MODAL
  const [secondaryPickerData, setSecondaryPickerData] = useState([]);
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
    if (primaryDefault) {
      return `${String(primaryDefault.currency)}`
    } else {
      return "Select";
    }
  }

  // SECONDARY PICKER TITLE FUNCTION
  const verifySecondary = () => {
    if (secondaryDefault) {
      return `${String(secondaryDefault.currency)}`;
    } else {
      return "Select"
    }
  }

  // HANDLER FOR BUDGET
  const handleBudgetChange = (text) => {
    setBudget(text);
  };


  return (
    <ScrollView style={styles.scrollViewBackground}>

      {/* PRIMARY CURRENCY PICKER */}
      <View style={styles.primaryPickerView}>
        <View style={styles.currencyText}>
          <Text style={styles.currencyFont}>Primary Currency</Text>
        </View>
        <Button
          title={verifyPrimary(primaryDefault)}
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
          setSelected={(val) => setPrimaryDefault(val)}
          onSearch={onPrimarySearch}
        />
      </View>

      {/* SECONDARY CURRENCY PICKER */}
      <View style={styles.secondaryPickerView}>
        <View style={styles.currencyText}>
          <Text style={styles.currencyFont}>Secondary Currency</Text>
        </View>
        <Button
          title={verifySecondary(secondaryDefault)}
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
        setSelected={(val) => setSecondaryDefault(val)}
        onSearch={onSecondarySearch}
      />

          {/* PRIMARY BUDGET SETTER */}
          <View style={styles.primaryBudgetView}>
        <Text
          style={styles.primaryBudgetText}
        >Primary Budget</Text>
        <View>
        <Button
          style={styles.bluebutton}
          title="Set"
          tintColor='grey'
        />
        <TextInput
          style={styles.primaryBudgetInput}
          variant='outlined'
          placeholder='Amount'
          placeholderTextColor="grey"
          color='grey'
          keyboardType="numeric"
          onChangeText={handleBudgetChange}
        />
        </View>
      </View>

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
    marginBottom:10,
  },
  primaryBudgetText: {
    fontSize: 17,
    marginTop: 10,
    marginLeft: 15,
  },
  primaryBudgetInput: {
    width: 111,
    // height: 1,
    paddingRight: 10,
    borderColor: 'lightgrey',
  },
  primaryPickerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  secondaryPickerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bluebutton: {
    backgroundColor: 'lightblue',
    color: 'grey',
    width: 100,
    height: 33,
    marginTop: 10,
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