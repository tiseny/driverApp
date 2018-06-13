import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage
} from 'react-native';


//格式化时间
const formatDate = () => {
  let y = new Date().getFullYear() + '-'
  let m = new Date().getMonth() + 1 > 9 ? new Date().getMonth() + 1 + '-' : '0' + (new Date().getMonth() + 1) + '-'
  let d = new Date().getDate() > 9 ? new Date().getDate() + ' ' : '0' + new Date().getDate() + ' '
  let h = new Date().getHours() > 9 ? new Date().getHours() + ':' : '0' + new Date().getHours() + ':'
  let min = new Date().getMinutes() > 9 ? new Date().getMinutes() + ':' : '0' + new Date().getMinutes() + ':'
  let s = new Date().getSeconds() > 9 ? new Date().getSeconds() : '0' + new Date().getSeconds()
  let _date = y + m + d + h + min + s

  return _date
}

export default class LocationPage extends Component {
  // 定时器
  timer = null;
  // 存储 position
  position = {};

  componentDidMount() {
    this.timer = setInterval(() => {
      // 时间戳
      this.p_key = new Date().getTime()

      navigator.geolocation.getCurrentPosition(
        (initialPosition) => {
          const Longitude = Math.abs(initialPosition.coords.longitude)
          const Latitude = initialPosition.coords.latitude
          const location = Latitude + ',' + Longitude
          // 
          this.position = {
            ...this.position,
            Longitude,
            Latitude
          }
          this.encodeAddress(location)
        },
        (error) => alert(error.message),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );
    }, 10000)
  }

  encodeAddress(location) {
    let url = 'https://api.map.baidu.com/geocoder/v2/?output=json&ak=Y1R5guY8Y2GNRdDpLz7SUeM3QgADAXec'

    fetch(`${url}&location=${location}`, {
      method: 'GET',
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
    .then(json =>{
      if (json.status == 0) {
        this.position = {
          ...this.position,
          Address: `${json.result.formatted_address}${json.result.sematic_description}`,
          CreateDate: formatDate()
        }
        // 等待 获取司机信息
        this.fetchOrder().then(() => {
          this.savePosition()
        })
      } 
    })
  }

  savePosition() {
    AsyncStorage.getItem('userInfo').then(value => {
      const user = JSON.parse(value)
      fetch('http://wlTestApi.wlwulian.com/api/Location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-token-sign': user.Token
        },
        body: JSON.stringify([this.position])
      })
      .then(response => {
        if (response.ok) {
          return response.json()
        } 
      })
      .then(json => {
        if (json && !json.IsSuccess) {
          AsyncStorage.getItem('position').then(value => {
            let pos = []
            if (value) {
              pos = JSON.parse(value)
            }
            pos.push(this.position)
            // 如果上传失败。则存入storage
            AsyncStorage.setItem('position', JSON.stringify(pos))
          })
          if (json.Code == '000002') {
            this.props.checkLogin('')
          }
        } 
      })
    })
  }

  fetchOrder() {
    return new Promise((resolve,reject) => {
      AsyncStorage.getItem('userInfo').then(value => {
        const user = JSON.parse(value)
        fetch('http://wlTestApi.wlwulian.com/api/OrderTruck/GetByType?type=RECEIVED', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'api-token-sign': user.Token
          }
        })
        .then(response => {
          if (response.ok) {
            return response.json()
          } 
        })
        .then(json => {
          if (!json.IsSuccess && json.Code == '000002') {
            this.props.checkLogin('')
          } else {
            resolve()
            this.position = {
              ...this.position,
              OrderNo: json.Data.map(item => item.OrderNo).join(','),
              DriverId: user.UserId
            }
          }
        })
      })
    })
  }

  render() {
    return (
      <View style={styles.ViewStyle}>
        <Text>
          <Text style={styles.title}>Initial position: </Text>
        </Text>
        <Text>
          <Text style={styles.title}>Current position: </Text>
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  ViewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

AppRegistry.registerComponent('driverApp', () => LocationPage);
