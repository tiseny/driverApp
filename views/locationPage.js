import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Navigator,
} from 'react-native';

var Dimensions = require('Dimensions');
var {screenWidth,screenHeight} = Dimensions.get('window');

export default class LocationPage extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <View style={styles.ViewStyle}>
        <TouchableOpacity>
          <Text style={styles.textStyle}>第一个页面</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  ViewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  textStyle: {
    textAlign: 'center',
    color: '#333333',
    marginTop:100,
  }
});

AppRegistry.registerComponent('driverApp', () => LocationPage);
