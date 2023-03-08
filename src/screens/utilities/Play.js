import React, { useState, useMemo, useEffect } from 'react';

import { StyleSheet, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Picker, onOpen } from 'react-native-actions-sheet-picker';

/*
 **Example data:
 */
import countries from './countries.json';

export default function App() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(undefined);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setData(countries);
  }, []);

  /*
   **Example filter function
   * @param {string} filter
   */
  const filteredData = useMemo(() => {
    if (data && data.length > 0) {
      return data.filter((item) =>
        item.name
          .toLocaleLowerCase('en')
          .includes(query.toLocaleLowerCase('en'))
      );
    }
  }, [data, query]);

  /*
   **Input search
   *@param {string} text
   */
  const onSearch = (text) => {
    setQuery(text);
  };

  return (
    <SafeAreaView style={styles.pickerContainer}>
      <TouchableOpacity
        style={styles.pickerButton}
        onPress={() => {
          onOpen('country');
        }}
      >
        <Text>Choose Category</Text>
      </TouchableOpacity>
      <Text style={{ padding: 10 }}>Chosen : {JSON.stringify(selected)}</Text>
      <Picker
        id="country"
        data={filteredData}
        inputValue={query}
        searchable={true}
        label="Select Category"
        setSelected={setSelected}
        onSearch={onSearch}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pickerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  pickerButton: {
    backgroundColor: '#8B93A5',
    padding: 10,
    borderRadius: 6,
    marginTop: 50,
  },
});
