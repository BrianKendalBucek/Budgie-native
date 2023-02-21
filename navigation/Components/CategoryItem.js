import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, ListItem, Button } from "@react-native-material/core";

const Category = (props) => {
console.log("**********", props)
  return (
    // <ListItem title="Groceries" />
    <View style={{ flexDirection: 'row', width: window.width, margin: 5, padding: 4, paddingTop: 10, borderColor: 'lightgrey', borderRadius: 10, backgroundColor: '#fff' }}>
      <View style={{ flex: 1 }}>
        <ListItem
          title={props.text}
        />
      </View>
      <View>
      
      </View>
      <View />
    </View>
  )
}

export default Category;