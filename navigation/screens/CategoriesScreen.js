import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Keyboard, StyleSheet, Modal, Pressable } from 'react-native';
import { TextInput, ListItem, Button } from "@react-native-material/core";
import { AppBar, HStack, IconButton } from "@react-native-material/core";


export default function CategoriesScreen({ props }) {

  const [category, setCategory] = useState();
  const [categoryItems, setCategoryItems] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  }

  const handleAddCategory = () => {
    Keyboard.dismiss();
    if (!category) {
      return;
    }
    setCategoryItems([...categoryItems, category])
    setCategory(null);
  }

  const deleteCategory = (index) => {
    let itemsCopy = [...categoryItems];
    itemsCopy.splice(index, 1);
    setCategoryItems(itemsCopy);
    setSelectedItem(null);
  }

  return (
    <ScrollView keyboardShouldPersistTaps='handled'>
      <View style={styles.input}>
        <TextInput
          value={category}
          onChangeText={text => setCategory(text)}
          style={{ backgroundColor: 'transparent', variant: 'outlined' }}
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
                  <View style={{ flex: 1}}>
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
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={selectedItem !== null}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Are you sure you want to delete?</Text>

              <>
                <View>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setSelectedItem(null)}>
                    <Text style={styles.textStyle}>Close</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonDelete]}
                    onPress={() => deleteCategory(categoryItems.indexOf(selectedItem))}>
                    <Text style={styles.textStyle}>Delete</Text>
                  </Pressable>
                </View>
              </>

            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  listcontainer: {
    flexDirection: 'row', 
    width: window.width, 
    marginTop: 10, 
    padding: 4, 
    paddingTop: 10, 
    borderColor: 'lightgrey', 
    borderRadius: 10, 
    backgroundColor: '#fff'
  },
  input: {
    backgroundColor: 'transparent',
    variant: 'filled',
    marginHorizontal: 20,
    marginVertical: 5,
    paddingTop: 15,
  },
  bluebutton: {
    backgroundColor: 'lightblue',
    color: 'grey',
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 35,
  },
  buttonFirst: {
    width: 100,
    height: 35,
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: 'lightblue'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 30,
    margin: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: 'lightblue',
  },
  buttonDelete: {
    backgroundColor: 'red',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
  },
});