import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import { ListItem, Input } from 'react-native-elements';
import { contains } from 'lodash';

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

export default function CategoryAuto() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = text => {
    const formattedQuery = text.toLowerCase();
    const filteredData = dummyData.filter(item => {
      return item.toLowerCase().includes(formattedQuery);
    });
    setResults(filteredData);
  };

  const renderItem = ({ item }) => (
    <ListItem
      title={item}
      onPress={() => {
        setSearch(item);
        setResults([]);
      }}
      leftIcon={<Icon name="search" size={20} />}
    />
  );

  return (
    <View>
      <Input
        placeholder="Search"
        value={search}
        onChangeText={text => {
          setSearch(text);
          handleSearch(text);
        }}
        leftIcon={<Icon name="search" size={20} />}
      />
      <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={item => item}
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
