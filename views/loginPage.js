import React, {Component} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight,TouchableOpacity,  Platform } from 'react-native';

export default class Login extends Component {

  state = {
    userCode: '',       // 账号
    password: ''        // 密码
  }

  render() {

    const disabled = !this.state.userCode || !this.state.password

    return  (
      <View style={styles.container}>
        {
          Platform.OS === 'ios' && <TouchableOpacity style={styles.labelButton}>
            <Text style={styles.labelText}>登录</Text>
          </TouchableOpacity>
        }
        <View style={styles.containerInputs}>
          <View>
          <TextInput
           style={styles.input}
           autoCapitalize="none"
           autoCorrect={false}
           returnKeyType="next"
           placeholder='账号'
           underlineColorAndroid='#5083ee'
           onChangeText={this.handleChange.bind(this, 'userCode')}
           placeholderTextColor='#666'
           />
         </View>
         <View>
          <TextInput
            style={styles.input}
            returnKeyType="go"
            placeholder='密码'
            onChangeText={this.handleChange.bind(this, 'password')}
            underlineColorAndroid='#5083ee'
            placeholderTextColor='#666'
            secureTextEntry />
          </View>
        </View>
        <View style={styles.buttonView}>
          <TouchableHighlight
            style={disabled || this.props.loading ? styles.buttonDisableContainer : styles.buttonContainer}
            onPress={disabled || this.props.loading ? null : this.handleLogin.bind(this)} >
            <Text style={styles.btnText}>{this.props.loading ? '登录中...' : '登录'}</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  handleLogin() {
    this.props.onsubmit(this.state)
  }

  handleChange(field, value) {
    this.setState({
      [field]: value
    })
  }

}

const styles = StyleSheet.create({
  buttonView: {
    padding: 30
  },

  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },

  containerInputs: {
    padding: 30,
    marginTop: Platform.OS === 'ios' ? 0 : 100
  },

  input:{
    height: 40,
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 10,
  },
  
  labelText:{
    color: '#222',
    textAlign: 'center',
  },

  btnText:{
    color: '#fff',
    textAlign: 'center'
  },

  labelButton:{
    paddingTop: 20,
    backgroundColor:'#fff',
    height: 50
  },

  buttonContainer:{
    backgroundColor: '#5083ee',
    paddingVertical: 15,
    borderRadius: 25
  },

  buttonDisableContainer:{
    backgroundColor: '#97b1ea',
    paddingVertical: 15,
    borderRadius: 25
  }
});