import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator'
import LocationPage from './views/locationPage'
import OtherPage from './views/otherPage'

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedTab:'HomeView'
    }
  }

  render() {
    return (
      <TabNavigator>
        <TabNavigator.Item
          title='定位'
          onPress={()=>{this.setState({selectedTab:'LocationPage'})}}
          selected={this.state.selectedTab === 'LocationPage'}
          titleStyle={styles.textStyle}
          selectedTitleStyle={styles.selectedTextStyle}
          renderIcon={() => {return <Image style={styles.tabIcon} source={require('images/home.png')}/> }}
          renderSelectedIcon={() => { return <Image style={styles.tabIcon} source={require('images/home_active.png')}/> }}
        >
          <LocationPage navigator={this.props.navigator} />
        </TabNavigator.Item>
        <TabNavigator.Item
          title='更多'
          onPress={()=>{this.setState({selectedTab:'OtherPage'})}}
          selected={this.state.selectedTab === 'OtherPage'}
          titleStyle={styles.textStyle}
          selectedTitleStyle={styles.selectedTextStyle}
          renderIcon={() => {return <Image style={styles.tabIcon} source={require('images/more.png')}/> }}
          renderSelectedIcon={() => { return <Image style={styles.tabIcon} source={require('images/more_active.png')}/> }}
        >
          <OtherPage navigator={this.props.navigator} />
        </TabNavigator.Item>
      </TabNavigator>
    );
  }
}

const styles = StyleSheet.create({
  selectedTextStyle:{
    color:'red',
  },
  textStyle:{
    color:'green'
  },
  tabIcon:{
    width:25,
    height:25,
  },
})

AppRegistry.registerComponent('driverApp', () => App)