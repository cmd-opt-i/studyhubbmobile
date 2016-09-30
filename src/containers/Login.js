'use strict'

import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, AsyncStorage } from 'react-native'
import FBSDK from 'react-native-fbsdk'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { firebaseApp } from '../../index.ios'

const {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager
} = require('react-native-fbsdk')

const route = {
  type: 'push',
  route: {
    key: 'editprofile',
    title: 'EditProfile'
  }
}

const swipeRoute = {
  type: 'push',
  route: {
    key: 'swipe',
    title: 'Swipe'
  }
}

const loginRoute = {
  type: 'pop',
  route: {
    key: 'login',
    title: 'Login'
  }
}


class Login extends Component {

  faceBookLogin(handleNavigate, storeUserFBData) {
    LoginManager.logInWithReadPermissions(['public_profile', 'email'])
      .then(result => {
        result.isCancelled ? console.log('login cancelled') :
        AccessToken.getCurrentAccessToken().then(function(data) {

          const _responseInfoCallback = (error: ?Object, result: ?Object) => {
            if (error) return console.log(error)

            firebaseApp.database().ref("/users/" + result.id)
              .ref.once('value')
              .then(snapshot => {

                if (snapshot.val()) {
                  AsyncStorage.setItem('loggedIn', 'true')
                  .catch(err => console.log('login', err))

                  storeUserFBData(result)
                  handleNavigate(loginRoute)
                  handleNavigate(swipeRoute)
                  return;
                }

                firebaseApp.database().ref('/users/' + result.id).set({
                    name: result.name,
                    fbData: result
                })

                AsyncStorage.setItem('loggedIn', 'true')
                .catch(err => console.log('login', err))

                storeUserFBData(result)
                handleNavigate(loginRoute)
                handleNavigate(route)
              })
          }
          const infoRequest = new GraphRequest('/me?fields=id,name,email,picture', null, _responseInfoCallback)
          new GraphRequestManager().addRequest(infoRequest).start()
        })
        .catch(res => console.log('infoRequest', res))
      })
      .catch(res => console.log(res))
  }

  render() {
    console.log('hit');
    return (
      <View  style={styles.container}>
        <Image style={styles.image} source={require('../../assets/studyhubblogo.png')} />

        <View style={styles.textContainer}>
          <Text style={styles.studyText}>Study</Text>
          <Text style={styles.hubbText}>Hubb</Text>
        </View>

        <Text style={styles.studyBuddyText}>Find Your Study Buddy</Text>

        <TouchableOpacity style={styles.btn} onPress={this.faceBookLogin.bind(null, this.props._handleNavigate ,this.props.storeUserFBData)}>
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
