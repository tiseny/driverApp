import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Navigator
} from 'react-native';

var Dimensions = require('Dimensions');
var {screenWidth,screenHeight} = Dimensions.get('window');

export default class OtherPage extends Component {
  constructor(props){
    super(props);
  }

  jumpSecondView () {
    /*this.props.navigator.push({
      component:HPTB_secondView,
      params:{}
    })*/
  }

  render() {
    return (
      <View style={styles.ViewStyle}>
        <TouchableOpacity>
          <Text style={styles.textStyle}>更多功能</Text>
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
  },
});

AppRegistry.registerComponent('driverApp', () => OtherPage);
