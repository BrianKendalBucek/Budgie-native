import React, { useState, useMemo, useEffect } from 'react';
import { View, ScrollView, SafeAreaView, StyleSheet, Text, TouchableOpacity, Keyboard } from 'react-native';
import { Box, TextInput, Button } from "@react-native-material/core";
import { Picker, onOpen } from 'react-native-actions-sheet-picker';
// import axios from 'axios';
// import countries from 'countries-list';
import currencyApi from '../utilities/currency.json'
import countriesList from '../utilities/countries-list.json'

// PSEUDO CODE
// 
// countries-list: {
// "continents": {
// "AF": "Africa", 
// "AN": "Antarctica"
// }, 
// "countries": {
// "AD": {
// "capital": "Andorra la Vella", 
// "continent": "EU", 
// "currency": "EUR", 
// "emoji": "", 
// "emojiU": "U+1F1E6 U+1F1E9", 
// "languages": [array], 
// "name": "Andorra", 
// "native": "Andorra", 
// "phone": 376
// }, 
// "AE": {
// ...
// }} }
// 
// currency api
// {
// "meta": {
//   "last_updated_at": "2023-03-09T23:59:59Z"
//   },
//   "data": {
//   "ADA": {
//   "code": "ADA",
//   "value": 3.22705
//   },
//   "AED": {
//   "code": "AED",
//   "value": 3.673107
//   },...
//   }
//   }
// 
// 
// THIS OBJECT IS ONLY TO CREATE HARD CODED ARRAY OF OBJS FOR THE PICKER
// 
// ONCE SELECTED, NEEDS TO GET CURRENCY VALUE FROM API
// 
// const hardPickerData = () => {
  // 
// }
// 
// 



// import countries from './currency.json';

// const BASE_URL = "https://api.currencyapi.com/v3/latest?apikey=vLzph0kSqJvRoCI7IvIcYhBMgwgV3KkONWlMEmLi&currencies=";


export default function Play() {

  function processCurrencyData(currencyApi, countriesList) {
    const matchingCountries = [];

    for (const code in currencyApi.data) {
      for (let countryCode in countriesList.countries) {
        const country = countriesList.countries[countryCode];
        if (country.currency === code) {

          const matchingCountry = {
            emoji: country.emoji,
            name: country.name,
            currency: country.currency
          };

          matchingCountries.push(matchingCountry);
        }
      }
      // Access the value for this currency
      // const value = currencyApi.data[code].value;
      // console.log(value)
      // Do something with the value...
    }
    console.log(matchingCountries)
    return matchingCountries;
  }
  
processCurrencyData(currencyApi, countriesList);
  // const [primaryCountryData, setPrimaryCountryData] = useState([]);
  // const [primarySelected, setPrimarySelected] = useState(undefined);
  // const [primaryQuery, setPrimaryQuery] = useState('');

  // const [secondaryCountryData, setSecondaryCountryData] = useState([]);
  // const [secondarySelected, setSecondarySelected] = useState(undefined);
  // const [secondaryQuery, setSecondaryQuery] = useState('');

  // PLAY WITH THIS FUNCTION TO MODIFY THE CURRENCY-LIST HOW YOU NEED IT FOR PICKER
  // useEffect(() => {
  //     function convert_to_objects(data) {
  //       const obj_list = [];
  //       for (let code in data) {
  //         const values = data[code];
  //         const obj = { "name": code, "value": values["value"] };
  //         obj_list.push(obj);
  //       }
  //       return obj_list;
  //     }

  //     const arrayOfObj = convert_to_objects(countries);

  //     setPrimaryCountryData(arrayOfObj);
  //     setSecondaryCountryData(arrayOfObj);
  //   }, []);

  //   console.log(primaryCountryData)


  // const [primaryAmount, setPrimaryAmount] = useState('');
  // const [secondaryAmount, setSecondaryAmount] = useState('');

  // // useEffect(() => {
  // //   axios.get(BASE_URL)
  // //     .then(response => {
  // //       console.log(response.data);
  // //     })
  // //     .catch(error => {
  // //       console.error(error);
  // //     });
  // // }, [])

  // // console.log("**********countries", countries.data.ADA.code);




  // const filteredPrimaryData = useMemo(() => {
  //   if (primaryCountryData && primaryCountryData.length > 0) {
  //     return primaryCountryData.filter((item) =>
  //       item.name
  //         .toLocaleLowerCase('en')
  //         .includes(primaryQuery.toLocaleLowerCase('en'))
  //     );
  //   }
  // }, [primaryCountryData, primaryQuery]);

  // const filteredSecondaryData = useMemo(() => {
  //   if (secondaryCountryData && secondaryCountryData.length > 0) {
  //     return secondaryCountryData.filter((item) =>
  //       item.name
  //         .toLocaleLowerCase('en')
  //         .includes(secondaryQuery.toLocaleLowerCase('en'))
  //     );
  //   }
  // }, [secondaryCountryData, secondaryQuery]);

  // const verifyPrimary = () => {
  //   if (primarySelected) {
  //     return `Chosen Currency: ${String(primarySelected)}`
  //   } else {
  //     return "Choose Currency";
  //   }
  // }
  // const verifySecondary = () => {
  //   if (secondarySelected) {
  //     return `Chosen Currency: ${String(secondarySelected)}`;
  //   } else {
  //     return "Choose Currency"
  //   }
  // }

  // const onPrimarySearch = (text) => {
  //   setPrimaryQuery(text);
  // };

  // const onSecondarySearch = (text) => {
  //   setSecondaryQuery(text);
  // }

  // const handlePrimaryAmountChange = (text) => {
  //   setPrimaryAmount(text);
  // };

  // const handleSecondaryAmountChange = (text) => {
  //   setSecondaryAmount(text);
  // }


  // return (
  //   <SafeAreaView style={styles.pickerContainer}>

  //     {/* RESULTS BOX
  //     <View style={styles.boxposition}>
  //       <Box style={styles.box} />
  //     </View> */}

  //     {/* FIRST BUTTON AND INPUT */}
  //     <Button
  //       title={verifyPrimary(primarySelected)}
  //       tintColor='grey'
  //       style={styles.topBlueButton}
  //       onPress={() => {
  //         onOpen('country');
  //       }}
  //     />
  //     <Picker
  //       id="country"
  //       data={filteredPrimaryData}
  //       inputValue={primaryQuery}
  //       searchable={true}
  //       label="Select Primary Currency"
  //       setSelected={(val) => setPrimarySelected(val.name)}
  //       onSearch={onPrimarySearch}
  //     />
  //     <TextInput
  //       style={styles.input}
  //       value={primaryAmount}
  //       onChangeText={handlePrimaryAmountChange}
  //       placeholder="Enter amount"
  //       color="grey"
  //       variant='outlined'
  //     />


  //     {/* FIRST BUTTON AND INPUT */}
  //     <Button
  //       title={verifySecondary(secondarySelected)}
  //       tintColor='grey'
  //       style={styles.bluebutton}
  //       onPress={() => {
  //         onOpen('city');
  //       }}
  //     />
  //     <Picker
  //       id="city"
  //       data={filteredSecondaryData}
  //       inputValue={secondaryQuery}
  //       searchable={true}
  //       label="Select Secondary Currency"
  //       setSelected={(val) => setSecondarySelected(val.name)}
  //       onSearch={onSecondarySearch}
  //     />
  //     <TextInput
  //       style={styles.input}
  //       value={secondaryAmount}
  //       onChangeText={handleSecondaryAmountChange}
  //       placeholder="Enter amount"
  //       color="grey"
  //       variant='outlined'
  //     />


  //     {/* SUBMIT BUTTON */}
  //     <Button
  //       title="Submit"
  //       tintColor='grey'
  //       style={styles.bluebutton}
  //       onPress={() => {
  //         // handleSubmit({ type, price, currency, date, category, title });
  //         Keyboard.dismiss();
  //       }}
  //     />
  //   </SafeAreaView>
  // );
}

// const styles = StyleSheet.create({
//   pickerContainer: {
//     backgroundColor: '#eee',
//     // flex: 1,
//     // alignItems: 'center',
//     // marginHorizontal: 20
//   },
//   pickerButton: {
//     backgroundColor: '#8B93A5',
//     padding: 10,
//     borderRadius: 6,
//     marginTop: 50,
//   },
//   input: {
//     backgroundColor: 'transparent',
//     variant: 'filled',
//     marginHorizontal: 20,
//     marginBottom: 20,
//   },
//   topBlueButton: {
//     marginTop: 30,
//     backgroundColor: 'lightblue',
//     color: 'grey',
//     marginHorizontal: 20,
//   },
//   bluebutton: {
//     backgroundColor: 'lightblue',
//     color: 'grey',
//     marginHorizontal: 20,
//   },
//   box: {
//     height: 50,
//     width: 200,
//     backgroundColor: 'lightgrey',
//     borderRadius: 10,
//   },
//   boxposition: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 50,
//     marginBottom: 30,
//   }
// });
