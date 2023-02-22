import React, { useState } from "react";
import { View, Text, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import {
  Box,
  Container,
  Tab,
  Tabs,
  TextInput,
  Button,
  Autocomplete,
} from "@react-native-material/core";

export default function ConverterScreen() {
  const [currency, setCurrency] = useState("");

  const onChangeText = async (text = "") => {
    setCategory(text);
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={{
        padding: 30,
      }}
    >
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          height: 50,
          width: 200,
          backgroundColor: "lightgrey",
          borderRadius: 10,
          paddingTop: 22,
          marginLeft: 80,
        }}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <TextInput
          variant="outlined"
          placeholder="Primary Currency"
          placeholderTextColor="grey"
          color="grey"
          value={currency}
          onChangeText={onChangeText}
          style={{
            marginHorizontal: 12,
            paddingHorizontal: 8,
            paddingBottom: 20,
            paddingTop: 30,
          }}
        />
      </SafeAreaView>
      <SafeAreaView style={{ flex: 1 }}>
        <TextInput
          variant="outlined"
          placeholder="Secondary Currency"
          placeholderTextColor="grey"
          color="grey"
          value={currency}
          onChangeText={onChangeText}
          style={{
            marginHorizontal: 12,
            paddingHorizontal: 8,
          }}
        />
        <TextInput
          // onChangeText={(textEntry) => { this.setState({ searchText: textEntry }) }}
          style={{
            backgroundColor: "transparent",
            variant: "filled",
            margin: 20,
          }}
          label="Price of item"
          color="grey"
          variant="outlined"
          // onSubmitEditing={() => { this.onSubmit(this.state.searchText) }}
        />
        <Button
          title="Convert"
          tintColor="grey"
          style={{
            
            // This seems to be the problem nice for me running in Expo.
            // Will look more into it in the morning.

            // alignItems: "left",
            width: 110,
            marginLeft: 20,
            backgroundColor: "lightblue",
            color: "grey",
          }}
        />
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: "#fff"
  },
  mainContainer: {
    padding: 20,
  }
})
