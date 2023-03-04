import * as React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppBar, HStack, IconButton } from "@react-native-material/core";
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { TextInput, ListItem, Button, select } from "@react-native-material/core";
import { ROUTES } from '../constants';
import { UsersScreen, ConverterScreen } from '../screens';


function TopBar() {

  return (
    <>
      <AppBar
        style={styles.header}
        title="Budgie"
        tintColor='grey'

        leading={props => (
            <Image
              style={{ width: 30, height: 30 }}
              source={require('../../assets/budgie-icon.png')}
            />
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "lightblue",
    tintColor: "grey",
    height: 60,
    paddingTop: 15,
    paddingLeft: 5,
  }
})

export default TopBar;