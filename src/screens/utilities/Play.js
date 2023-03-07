import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
// import RNPickerDialog from './picker/new';
import RNPickerDialog from 'rn-modal-picker';

export default class Play extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: 1,
          name: 'Afghanistan',
        },
        {
          id: 2,
          name: 'Bahrain',
        },
        {
          id: 3,
          name: 'Canada',
        },
        {
          id: 4,
          name: 'Denmark',
        },
        {
          id: 5,
          name: 'Egypt',
        },
        {
          id: 6,
          name: 'France',
        },
        {
          id: 7,
          name: 'Greece',
        },
        {
          id: 8,
          name: 'Hong Kong',
        },
        {
          id: 9,
          name: 'India',
        },
        {
          id: 10,
          name: 'Japan',
        },
        {
          id: 11,
          name: 'Kenya',
        },
        {
          id: 12,
          name: 'Liberia',
        },
        {
          id: 13,
          name: 'Malaysia',
        },
        {
          id: 14,
          name: 'Nepal',
        },
        {
          id: 15,
          name: 'Oman',
        },
        {
          id: 16,
          name: 'Poland',
        },
      ],
      placeHolderText: 'Please Select Country',
      selectedText: '',
      defaultValue: true,
      select: '',
      value: '',
    };
  }

  selectedValue(index, item) {
    this.setState({selectedText: item.name});
  }

  render() {
    return (
      <View style={Styles.container}>
        <RNPickerDialog
          data={this.state.data}
          pickerTitle={'Sort by'}
          // labelText={'testss'}
          showSearchBar={true}
          showPickerTitle={true}
          listTextStyle={Styles.listTextStyle}
          pickerStyle={Styles.pickerStyle}
          selectedText={this.state.selectedText}
          placeHolderText={this.state.placeHolderText}
          searchBarPlaceHolder={'Search.....'}
          searchBarPlaceHolderColor={'#9d9d9d'}
          selectedTextStyle={Styles.selectedTextStyle}
          placeHolderTextColor={'gray'}
          dropDownIconStyle={Styles.dropDownIconStyle}
          searchBarStyle={Styles.searchBarStyle}
          //dropDownIcon={require('../assets/pin.png')}
          selectedValue={(index, item) => this.selectedValue(index, item)}
        />
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedTextStyle: {
    height: 50,
    borderColor: 'gray',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    width: '100%',
    color: 'black',
    fontSize: 20,
    paddingLeft: 10,
    marginTop: -2,
  },
  selectedTextStyle1: {
    height: 50,
    borderColor: 'gray',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    width: '100%',
    color: 'black',
    fontSize: 20,
    paddingLeft: 10,
    marginTop: 15,
  },
  listTextStyle: {
    color: '#000',
    marginVertical: 10,
    flex: 0.9,
    marginLeft: 20,
    marginHorizontal: 10,
    textAlign: 'left',
  },
  searchBarStyle: {
    marginBottom: 10,
    flexDirection: 'row',
    height: 40,
    shadowRadius: 1,
    shadowOpacity: 1.0,
    borderWidth: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    borderColor: '#303030',
    shadowColor: '#303030',
    borderRadius: 5,
    elevation: 1,
    marginHorizontal: 10,
  },
  placeHolderTextStyle: {
    color: 'red',
    padding: 10,
    textAlign: 'left',
    width: '99%',
    flexDirection: 'row',
  },
  dropDownIconStyle: {
    width: 10,
    height: 10,
    left: -40,
    // marginTop: 20,
  },
  dropDownIconStyle1: {
    width: 10,
    height: 10,
    left: -40,
    marginTop: 15,
  },
  pickerStyle: {
    shadowRadius: 0.5,
    shadowOpacity: 0.5,
    borderWidth: 0.5,
    shadowOffset: {
      width: 0.5,
      height: 0.5,
    },
    height: 60,
    borderColor: '#303030',
    shadowColor: '#303030',
    borderRadius: 2,
    elevation: 0.5,
  },
  pickerStyle1: {
    height: 60,
    borderBottomColor: 'dodgerblue',
    borderBottomWidth: 2,
  },
});