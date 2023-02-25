import React, {useState} from 'react';
import { ScrollView, View, Text, TouchableOpacity, Keyboard, StyleSheet, Modal, KeyboardAvoidingView } from 'react-native';
import { TextInput, ListItem, Button, select } from "@react-native-material/core";

export default function UserScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>This will be the user account settings page</Text>
    </View>
  );
}