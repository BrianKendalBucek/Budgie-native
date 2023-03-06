import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import { ListItem, Input } from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { contains } from 'lodash';

const data = [
  'Apple',
  'Banana',
  'Cherry',
  'Grape',
  'Lemon',
  'Orange',
  'Peach',
  'Pear',
  'Pineapple',
  'Strawberry',
];

export default function CategoryAuto() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = text => {
    const formattedQuery = text.toLowerCase();
    const filteredData = data.filter(item => {
      return item.toLowerCase().includes(formattedQuery);
    });
    setResults(filteredData);
  };
  const renderItem = ({ item }) => (
    <ListItem
      title={item}
      // style={{backgroundColor: 'red'}}
      onPress={() => {
        setSearch(item);
        setResults([]);
      }}
      leftIcon={<MaterialIcons name="search" size={20} />}
      // titleStyle={{ color: 'black' }}
      containerStyle={styles.container}
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
        leftIcon={<MaterialIcons name="search" size={20} />}
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
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: 20,
    backgroundColor: 'red',
    color: 'purple'
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
