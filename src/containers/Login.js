'use strict'

import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, AsyncStorage } from 'react-native'
import FBSDK from 'react-native-fbsdk'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { firebaseApp } from '../../index.ios.js'

const {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager
} = require('react-native-fbsdk')

const profileRoute = {
  type: 'push',
  route: {
    key: 'myprofile',
    title: 'MyProfile'
  }
}

class Login extends Component {

  faceBookLogin(handleNavigate) {
    LoginManager.logInWithReadPermissions(['public_profile', 'email'])
      .then(result => {
        result.isCancelled ? console.warn('login cancelled') :
        AccessToken.getCurrentAccessToken().then(function(data) {

          const _responseInfoCallback = (error: ?Object, result: ?Object) => {
            if (error) {
              console.warn(JSON.stringify(error, null, 2));
            }

            console.warn('DATA', JSON.stringify(result, null, 2));
            //this.props.storeUserFBData(data)
            firebaseApp.database().ref('/users/' + result.id).set({
                name: result.name,
                fbData: result,
              });

              AsyncStorage.setItem('loggedIn', 'true')
              .then(data => console.warn('login data', data))
              .catch(err => console.warn('login', err))

            handleNavigate(profileRoute)
          }
          const infoRequest = new GraphRequest('/me?fields=id,name,email,picture', null, _responseInfoCallback)
          new GraphRequestManager().addRequest(infoRequest).start()
        })
        .catch(res => console.warn('infoRequest', res))
      })
      .catch(res => console.warn(res))
  }

  render() {
    return (
      <View  style={styles.container}>
        <Image style={styles.image} source={require('../../assets/studyhubblogo.png')} />

        <View style={styles.textContainer}>
          <Text style={styles.studyText}>Study</Text>
          <Text style={styles.hubbText}>Hubb</Text>
        </View>

        <Text style={styles.studyBuddyText}>Find Your Study Buddy</Text>

        <TouchableOpacity style={styles.btn} onPress={this.faceBookLogin.bind(null, this.props._handleNavigate.bind(null, profileRoute))}>
          <Text style={styles.btnText}>Log in with Facebook</Text>
        </TouchableOpacity>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#28CF9B'
  },
  image: {
    marginTop: 150,
    width: 100,
    height: 150
  },
  textContainer: {
    flexDirection: 'row'
  },
  studyText: {
    backgroundColor: 'transparent',
    fontSize: 28,
    color: 'white',
    fontFamily: 'Tabarra NarrowLight'
  },
  hubbText: {
    backgroundColor: 'transparent',
    fontSize: 28,
    color: 'white',
    fontFamily: 'Tabarra Black'
  },
  studyBuddyText: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 11
  },
  btn: {
    marginTop: 140,
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

export default connect(null, actions)(Login)
