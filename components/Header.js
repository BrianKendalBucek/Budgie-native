import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AppBar, HStack, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";



const Header = (props) => {

  return (
    <AppBar
      style={styles.header}
      title="Budgie"
      leading={props => (
        <IconButton icon={props => <Icon name="menu" {...props} />} {...props} />
      )}
      trailing={props => (
        <HStack>
          <IconButton
            icon={props => <Icon name="magnify" {...props} />}
            {...props}
          />
          <IconButton
            icon={props => <Icon name="dots-vertical" {...props} />}
            {...props}
          />
        </HStack>
      )}
    />
  )
}

const styles = StyleSheet.create({
  header: {
    height: 100,
    paddingTop: 40
  }
})

export default Header;