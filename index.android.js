import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
  AsyncStorage
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator'
import LocationPage from './views/locationPage'
import MorePage from './views/morePage'
import LoginPage from './views/loginPage'

import Toast from 'react-native-simple-toast';


const HOME_TAB = require('./images/home.png');
const MORE_TAB = require('./images/more.png');

const HOME_TAB_1 = require('./images/home_active.png');
const MORE_TAB_1 = require('./images/more_active.png');

export default class App extends Component {

  state = {
    token: '',
    loading: false,
    selectedTab:'LocationPage'
  }

  componentWillMount() {
    AsyncStorage.getItem('token', (err,value) => {
      if (!err) {
        this.setState({
          token: value
        })
      }
    })
  }

  render() {
    return this.state.token ? (
      <TabNavigator>
        <TabNavigator.Item
          title='定位'
          onPress={()=>{this.setState({selectedTab:'LocationPage'})}}
          selected={this.state.selectedTab === 'LocationPage'}
          titleStyle={styles.textStyle}
          selectedTitleStyle={styles.selectedTextStyle}
          renderIcon={() => {return <Image style={styles.tabIcon} source={HOME_TAB}/> }}
          renderSelectedIcon={() => { return <Image style={styles.tabIcon} source={HOME_TAB_1}/> }}
        > 
          <Navigator
            initialRoute={{name: '定位', component: LocationPage}}
            renderScene={(route, navigator) =>{
              let Component = route.component;
              return <Component {...route.passProps} navigator={navigator} checkLogin={this.handleCheckLogin.bind(this)} ref={instance => {this.location = instance}}/>
            }}
          />
        </TabNavigator.Item>
        <TabNavigator.Item
          title='更多'
          onPress={()=>{this.setState({selectedTab:'MorePage'})}}
          selected={this.state.selectedTab === 'MorePage'}
          titleStyle={styles.textStyle}
          selectedTitleStyle={styles.selectedTextStyle}
          renderIcon={() => {return <Image style={styles.tabIcon} source={MORE_TAB}/> }}
          renderSelectedIcon={() => { return <Image style={styles.tabIcon} source={MORE_TAB_1}/> }}
        >
          <Navigator
            initialRoute={{name: '更多', component: MorePage}}
            renderScene={(route, navigator) =>{
              let Component = route.component;
              return <Component {...route.passProps} navigator={navigator} checkLogin={this.handleCheckLogin.bind(this)}/>
            }}
          />
        </TabNavigator.Item>
      </TabNavigator>
    ) : <LoginPage onsubmit={this.handleSubmit.bind(this)} loading={this.state.loading}/>
  }

  handleSubmit(data) {
    this.setState({
      loading: true
    })

    this.fetchLogin(data)
  }

  handleCheckLogin(token) {
    if (!token) {
      Toast.show('登录已经失效');
      // 清除定位
      clearInterval(this.location.timer)

      setTimeout(() => {
        this.setState({
          token
        })
      }, 1500)
    }
  }

  fetchLogin(data) {
    fetch(`http://wlTestApi.wlwulian.com/api/Passport?userCode=${data.userCode}&password=${data.password}&loginType=1`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json()
      } 
    })
    .then(json =>　{
      this.setState({
        loading: false
      })
      if (json.IsSuccess == true) {
        this.setState({
          token: json.Data.Token
        })
        Toast.showWithGravity('登录成功',Toast.SHORT, Toast.CENTER);
        // 登录成功
        AsyncStorage.setItem('Token', json.Data.Token)
        // 用户信息
        AsyncStorage.setItem('userInfo', JSON.stringify(json.Data))
      } else {
        Toast.showWithGravity(json.Msg || '服务异常',Toast.LONG, Toast.CENTER);
      }
    }).catch(err => {
      this.setState({
        loading: false
      })
      Toast.showWithGravity('网络异常',Toast.LONG, Toast.CENTER);
    });
  }
}

const styles = StyleSheet.create({
  selectedTextStyle:{
    color:'#5083ee'
  },
  textStyle:{
    color:'#8a8a8a'
  },
  tabIcon:{
    width:25,
    height:25,
  },
})

AppRegistry.registerComponent('driverApp', () => App)