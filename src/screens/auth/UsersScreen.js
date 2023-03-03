import React, { useState } from "react";
import { ListItem, TextInput, Switch } from "@react-native-material/core";
import { ScrollView, View, Text, TouchableOpacity, Keyboard, StyleSheet, Modal, KeyboardAvoidingView } from 'react-native';

export default function User({ navigation }) {

  const [primary, setPrimary] = useState('');
  const [secondary, setSecondary] = useState('');
  const [enabled, setEnabled] = useState(true);
  const [enabledDark, setEnabledDark] = useState(true);


  const onChangePrimary = async (text = '') => {
    setPrimary(text)
  }

  const onChangeSecondary = async (text = '') => {
    setSecondary(text)
  }

  return (
    <ScrollView>
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
        onChangeText={onChangePrimary}
      />
      <TextInput
        style={styles.input}
        variant='outlined'
        placeholder='Secondary Currency: Costa Rican'
        placeholderTextColor="grey"
        color='grey'
        onChangeText={onChangeSecondary}
      />
      <ListItem
        title="Notifications"
        trailing={
          <Switch value={enabled} onValueChange={() => setEnabled(!enabled)} />
        }
        onPress={() => setEnabled(!enabled)}
      />
            <ListItem
        title="Dark mode"
        trailing={
          <Switch value={enabledDark} onValueChange={() => setEnabledDark(!enabledDark)} />
        }
        onPress={() => setEnabledDark(!enabledDark)}
      />
    </ScrollView>
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