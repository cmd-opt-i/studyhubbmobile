'use strict'

import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import FBSDK from 'react-native-fbsdk'

const {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager
} = require('react-native-fbsdk');

const permissions = ['public_profile', 'email']
class Login extends Component {

  faceBookLogin() {
    LoginManager.logInWithReadPermissions(permissions)
      .then(function (result) {
        if (result.isCancelled) {
          console.warn('login cancelled');
        } else {
          AccessToken.getCurrentAccessToken()
          .then(function(data) {
            console.warn('result', result);
            console.warn('data from token', JSON.stringify(data, null, 2))
            const _responseInfoCallback = (error: ?Object, result: ?Object) => {
              console.warn('responseCallback called');
              if (error) {
                console.warn(JSON.stringify(error, null, 2));
              } else {
                console.warn('DATA', JSON.stringify(result, null, 2));
              }
            }
            const infoRequest = new GraphRequest(
              '/me?fields=id,name,email,picture',
              null,
              _responseInfoCallback,
            );
            new GraphRequestManager().addRequest(infoRequest).start();
          })
          .catch(res => console.warn(res))
        }
      })
      .catch(res => console.warn(res))
  }

  render() {
    return (
      <View  style={styles.container}>
        <Text style={styles.title}>Study Hubb</Text>
        <Text style={styles.para}>Find your Studdy Buddy</Text>
        <TouchableOpacity style={styles.btn} onPress={this.faceBookLogin}>
          <Text style={styles.btnText}>Log in with Facebook</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

// green: #22CF9A
// purple: #5931DE
// pinkish: #F50057 #ff1744
// blue: #1D57EE
// white:  #FEFFFF


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#1D57EE'
  },
  title: {
    marginTop: 180,
    fontSize: 40,
    color: '#FEFFFF',
    backgroundColor: 'transparent'
  },
  para: {
    color: '#FEFFFF',
    backgroundColor: 'transparent',
    fontSize: 15
  },
  btn: {
    marginTop: 200,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height: 40,
    width: 200,
    borderWidth: 1,
    borderColor: '#FEFFFF',
    borderRadius: 5
  },
  btnText: {
    color: '#FEFFFF',
    textAlign: 'center'
  }
})


export default Login
