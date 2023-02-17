import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, HStack } from 'react-native';
import { AppBar, IconButton, FAB } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
// import IconBar from "../assets/iconBar.png"; 
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';




const Footer = (props) => {

  return (
    <AppBar
      // styles={styles.footer}
      
      variant="bottom"
      leading={<MaterialCommunityIcons name='chart-box' style={{ color: 'red', fontSize: 50 }} />}
      // trailing={
      //   <HStack>
      //     {/* <IconButton icon={<FontAwesome5 name='shapes' style={{ color: 'red', fontSize: 45 }}/>}/> */}

      //   </HStack>
      // }
      // trailing={<MaterialCommunityIcons name='wallet' style={{ color: 'red', fontSize: 50 }} />}
      style={{ height: 100, position: "absolute", start: 0, end: 0, bottom: 0 }}
    />
        
        )
      }
      // <FontAwesome5 name='shapes' style={{ color: 'red', fontSize: 45 }}/>
      
// const styles = StyleSheet.create({
//   footer: {
//     // height: 400,
//     // paddingBottom: 40
//     // marginBottom: 100,
//     position: 'absolute',
//     start: 0,
//     end: 0,
//     bottom: 0
  
//   }
// })

export default Footer;