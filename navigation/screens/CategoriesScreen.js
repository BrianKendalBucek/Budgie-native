import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { TextInput, ListItem, Button } from "@react-native-material/core";
import { AppBar, HStack, IconButton } from "@react-native-material/core";
import Category from '../Components/CategoryItem';


export default function CategoriesScreen({ props }) {
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
            // onChangeText={(textEntry) => { this.setState({ searchText: textEntry }) }}
            style={{ backgroundColor: 'transparent', variant: 'outlined' }}
            label="Add New Category"
            variant='outlined'
            color='grey'
          // onSubmitEditing={() => { this.onSubmit(this.state.searchText) }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Button
            style={{ width: 70, margin: 5, backgroundColor: "lightblue" }}
            title="Add"
          // onPress={
          //   () => this.onSubmit(this.state.searchText)
          // }
          >
            <IconButton
              icon={props => <MaterialCommunityIcons name="logout" {...props} />}
              {...props}
            />
          </Button>
        </View>
      </View>
      <View>
        <Category />
      </View>


    </ScrollView>
  )
}