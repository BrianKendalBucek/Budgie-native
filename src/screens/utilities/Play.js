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
}
