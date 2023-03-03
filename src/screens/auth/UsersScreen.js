import React, { useState } from "react";
import { ListItem, TextInput, Switch } from "@react-native-material/core";
import { ScrollView, View, Text, TouchableOpacity, Keyboard, StyleSheet, Modal, KeyboardAvoidingView } from 'react-native';

export default function User({ navigation }) {

  const [primary, setPrimary] = useState('');
  const [secondary, setSecondary] = useState('');
  const [enabled, setEnabled] = useState(true);

  const onChangeText = async (text = '') => {
    setPrimary(text)
  }

  return (
    <View>
      <ListItem
        title="Username"
        secondaryText="Briankendalbucek"
      />
      <ListItem
        title="First name"
        secondaryText="Brian"
      />
      <ListItem
        title="Last name"
        secondaryText="Bucek"
      />
      <ListItem
        title="Change password"
      />
      <TextInput
        style={styles.input}
        variant='outlined'
        placeholder='Primary Currency: Canadian'
        placeholderTextColor="grey"
        color='grey'
        // value={currency}
        onChangeText={onChangeText}
      />
      <TextInput
        style={styles.input}
        variant='outlined'
        placeholder='Secondary Currency: Costa Rican'
        placeholderTextColor="grey"
        color='grey'
        // value={currency}
        onChangeText={onChangeText}
      />
      <ListItem
        title="Notifications"
        trailing={
          <Switch value={enabled} onValueChange={() => setEnabled(!enabled)} />
        }
        onPress={() => setEnabled(!enabled)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'transparent',
    variant: 'filled',
    marginHorizontal: 20,
    marginVertical: 5
  },
})