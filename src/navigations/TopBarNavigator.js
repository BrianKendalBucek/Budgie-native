import * as React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppBar, HStack, IconButton } from "@react-native-material/core";
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { TextInput, ListItem, Button, select } from "@react-native-material/core";
import { ROUTES } from '../constants';
import { UsersScreen, ConverterScreen } from '../screens';


function TopBarNavigator({ navigation }) {

  return (
    <>
      <AppBar
        style={styles.header}
        title="Budgie"
        tintColor='grey'

        leading={props => (
          // <>
          //   <Button
          //     onPress={() => navigation.navigate(ROUTES.USER)}
          //     label='User'
          //   >User</Button>
            <Image
              style={{ width: 40, height: 40 }}
              source={require('../../assets/budgie-icon.png')}
            // onPress={() => navigation.navigate(ROUTES.USER)}
            />
        )}
        trailing={props => (
          <HStack>
            <IconButton
              icon={props => <MaterialCommunityIcons name="logout" {...props} />}
              {...props}
            />
          </HStack>
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "lightblue",
    tintColor: "grey",
    height: 90,
    paddingTop: 40
  }
})

export default TopBarNavigator;