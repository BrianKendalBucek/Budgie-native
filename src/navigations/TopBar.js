import * as React from 'react';
import { AppBar } from "@react-native-material/core";
import { StyleSheet, Image } from 'react-native';


function TopBar() {

  return (
    <>
      <AppBar
        style={styles.header}
        title="Budget Abroad"
        tintColor='grey'

        leading={props => (
          <Image
            style={styles.logo}
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
    height: 80,
    paddingTop: 30,
    paddingLeft: 5,
  },
  logo: {
    width: 30,
    height: 30,
  }
})

export default TopBar;