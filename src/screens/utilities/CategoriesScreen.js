import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Keyboard, StyleSheet, Modal, KeyboardAvoidingView } from 'react-native';
import { TextInput, ListItem, Button, select } from "@react-native-material/core";

export default function CategoriesScreen({categoryItems, setCategoryItems}) {

// Need to have categoryItems be an array of objects
// Key being id: with a unique number
// value being name: with each categoryItem as the value

  const [category, setCategory] = useState();

  console.log("CategoriesScreen:", categoryItems);

  const [modalVisible, setModalVisible] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);

  const [edit, setEdit] = useState("");

  const onSave = () => {
    if (!edit) {
      return;
    }
    const updatedItems = categoryItems.map((item) =>
      item === selectedItem ? edit : item
    );
    setCategoryItems(updatedItems);
    setSelectedItem(null);
    setEdit("");
  };

  const handleAddCategory = () => {
    Keyboard.dismiss();
    if (!category) {
      return;
    }
    setCategoryItems([...categoryItems, category])
    setCategory('');
  }

  const deleteCategory = (index) => {
    let itemsCopy = [...categoryItems];
    itemsCopy.splice(index, 1);
    setCategoryItems(itemsCopy);
    setSelectedItem(null);
  }

  return (

    <ScrollView keyboardShouldPersistTaps='handled'>
      <View>
        <TextInput
          value={category}
          onChangeText={text => setCategory(text)}
          style={styles.input}
          placeholder="Add New Category"
          variant='outlined'
          color='grey'
        // onSubmitEditing={() => { this.onSubmit(this.state.searchText) }}
        />
      </View>
      <View>
        <TouchableOpacity>
          <Button
            style={styles.bluebutton}
            onPress={() => handleAddCategory()}
            title="Add"
            tintColor='grey'
          />
        </TouchableOpacity>
      </View>
      <View>
        {
          categoryItems.map((item, index) => {
            return (
              <View key={index}>
                <View style={styles.listcontainer}>
                  <View style={{ flex: 1 }}>
                    <ListItem
                      title={item}
                      onPress={() => setSelectedItem(item)}
                    />
                  </View>
                </View>
              </View>
            )
          })
        }
      </View>
      <View style={styles.centeredView} >
        <Modal
          animationType="slide"
          transparent={true}
          visible={selectedItem !== null}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <KeyboardAvoidingView behavior="padding" style={styles.keyboardAvoidingView}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text
                  style={styles.modalText}
                >Edit Category Name</Text>
                <TextInput
                  style={styles.input}
                  variant="outlined"
                  color="grey"
                  placeholder={selectedItem}
                  value={edit}
                  onChangeText={(text) => setEdit(text)}
                />
                <Button
                  style={[styles.closesavebuttons, { marginTop: 20 }]}
                  onPress={onSave}
                  title="Save"
                  tintColor='grey'
                />
                <>
                  <View>
                    <Button
                      style={[styles.redbutton]}
                      onPress={() => deleteCategory(categoryItems.indexOf(selectedItem))}
                      title='Delete'
                      tintColor='white'
                    >
                    </Button>
                    <Button
                      style={styles.closesavebuttons}
                      onPress={() => setSelectedItem(null)}
                      title='Close'
                      tintColor='grey'
                    >
                      <Text style={styles.textStyle}>Close</Text>
                    </Button>
                  </View>
                </>

              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </View>
    </ScrollView>

  )
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  listcontainer: {
    flexDirection: 'row',
    width: window.width,
    marginHorizontal: 20,
    padding: 4,
    paddingTop: 10,
    borderColor: 'lightgrey',
    borderRadius: 10,
    backgroundColor: '#fff'
  },
  input: {
    backgroundColor: 'transparent',
    marginHorizontal: 20,
    marginVertical: 5,
    paddingTop: 15,
  },
  bluebutton: {
    backgroundColor: 'lightblue',
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 35,
  },
  redbutton: {
    backgroundColor: '#FF4560',
    marginHorizontal: 20,
    marginVertical: 30
  },
  closesavebuttons: {
    backgroundColor: 'lightblue',
    marginHorizontal: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: 320,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  modalText: {
    textAlign: 'center',
    fontSize: 20,
  },
});