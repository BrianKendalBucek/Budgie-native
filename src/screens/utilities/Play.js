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

export default function Play() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  // const [primary, setPrimary] = useState("");
  // const [secondary, setSecondary] = useState("");
  // const [menuCurr, setMenuCurr] = useState([]);
  // const [input, setInput] = useState(0);
  // const [results, setResults] = useState("");
  // const [error, setError] = useState({ active: false, msg: "" });

  // const reset = () => {
  //   setError(() => ({ active: false, msg: "" }));
  // };

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3002/api/currency", { withCredentials: true })
  //     .then((res) => setMenuCurr(res.data))
  //     .catch((err) => console.log(err));
  // }, []);

  // const calculate = () => {
  //   if (primary && secondary && input) {
  //     const primaryRate = menuCurr.find((x) => x.id === primary.id).rate_to_usd;
  //     const secondaryRate = menuCurr.find(
  //       (x) => x.id === secondary.id
  //     ).rate_to_usd;
  //     const calcRate = secondaryRate * (1 / primaryRate);

  //     return setResults(
  //       (input * calcRate).toFixed(2) + " " + secondary.code.toUpperCase()
  //     );
  //   } else {
  //     setError(() => ({ active: true, msg: "Required" }));
  //     return;
  //   }
  // };

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
