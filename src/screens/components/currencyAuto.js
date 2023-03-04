import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';

const dummyData = [
  'apple',
  'banana',
  'cherry',
  'date',
  'elderberry',
  'fig',
  'grape',
  'honeydew',
  'kiwi',
  'lemon',
];

export default function CurrencyAuto() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = dummyData.filter((item) =>
      item.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={handleSearch}
        value={searchQuery}
        placeholder="Search for a fruit..."
      />
      <FlatList
        style={styles.list}
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  list: {
    flex: 1,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});
