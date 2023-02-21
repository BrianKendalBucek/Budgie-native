import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Keyboard, StyleSheet } from 'react-native';
import { TextInput, ListItem, Button } from "@react-native-material/core";
import { AppBar, HStack, IconButton } from "@react-native-material/core";


export default function CategoriesScreen({ props }) {

  const [category, setCategory] = useState();
  const [categoryItems, setCategoryItems] = useState([]);

  const handleAddCategory = () => {
    Keyboard.dismiss();
    setCategoryItems([...categoryItems, category])
    setCategory(null);
  }

  const deleteCategory = (index) => {
    let itemsCopy = [...categoryItems];
    itemsCopy.splice(index, 1);
    setCategoryItems(itemsCopy);
  }

  return (
    <ScrollView
    // style={{
    //   flex: 1,
    //   alignItems: 'center',
    //   justifyContent: 'center'
    // }}
    >
      <View style={{ flexDirection: 'row', width: window.width, margin: 10, padding: 4, paddingTop: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 0, borderColor: 'lightgrey', borderRadius: 10, backgroundColor: '#fff' }}>
        <View style={{ flex: 4 }}>
          <TextInput
            value={category}
            onChangeText={text => setCategory(text)}
            style={{ backgroundColor: 'transparent', variant: 'outlined' }}
            label="Add New Category"
            variant='outlined'
            color='grey'
          // onSubmitEditing={() => { this.onSubmit(this.state.searchText) }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity>
            <Button
              onPress={() => handleAddCategory()}
              style={{ width: 70, margin: 5, backgroundColor: "lightblue" }}
              title="Add"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        {
          categoryItems.map((item, index) => {
            return (
              <>
                <View style={{ flexDirection: 'row', width: window.width, margin: 5, padding: 4, paddingTop: 10, borderColor: 'lightgrey', borderRadius: 10, backgroundColor: '#fff' }}>
                  <View style={{ flex: 1 }}>
                    <ListItem
                      title={item}
                    />
                  </View>
                  <View>
                    <Button
                      style={styles.button}
                      title="Delete"
                      onPress={() => deleteCategory(index)}
                    />
                  </View>
                  <View />
                </View>
              </>
            )
          })
        }
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 35,
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: 'lightblue'
  }
});