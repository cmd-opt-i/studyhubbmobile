'use strict'

import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, AsyncStorage } from 'react-native'
import moment from 'moment'
import FBSDK from 'react-native-fbsdk'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Spinner from 'react-native-spinkit'
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

const noSchoolRoute = {
  type: 'push',
  route: {
    key: 'noschool',
    title: 'NoSchool'
  }
}

const noLocationRoute = {
  type: 'push',
  route: {
    key: 'nolocation',
    title: 'NoLocation'
  }
}

class Login extends Component {

  faceBookLogin(handleNavigate, storeUserFBData) {
    LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_location', 'user_education_history'])
      .then(result => {
        result.isCancelled ? console.log('login cancelled') :
        AccessToken.getCurrentAccessToken().then(function(data) {
          const _responseInfoCallback = (error: ?Object, result: ?Object) => {
            if (error) return console.log(error)

            //use latest school
            const school = result.education.filter(item => item.type === 'College')
            const latestSchool = school[school.length - 1]
            result.education = latestSchool

            // If user doesn't have school in their FB profie  dont let them create a profil
            if (!result.education) {
              handleNavigate(noSchoolRoute)
              return;
            }
            // If user doesn't have location in their FB profie  dont let them create a profil
            if (!result.location) {
              handleNavigate(noLocationRoute)
              return;
            }

            firebaseApp.database().ref("/users/" + result.id)
              .ref.once('value')
              .then(snapshot => {
                if (snapshot.val()) {
                  AsyncStorage.setItem('loggedIn', result.id)
                  .catch(err => console.log('login', err))

                  storeUserFBData(snapshot.val())
                  handleNavigate(swipeRoute)
                } else {

                  let date = moment().format('MMMM Do YYYY')
                  const userProfile = {
                    id: result.id,
                    name: result.name,
                    school: { id: result.education.id, name: result.education.school.name },
                    location: result.location,
                    picture: result.picture.data.url,
                    email: result.email,
                    date
                  }

                  firebaseApp.database().ref('/users/' + result.id).set(userProfile)
                  AsyncStorage.multiSet([['loggedIn', result.id], ['on boarding', 'true']])
                  .catch(err => console.log('login', err))

                  storeUserFBData(userProfile)
                  handleNavigate(route)
                }
              })
          }
          const infoRequest = new GraphRequest('/me?fields=id,name,location,education,email,picture.width(640)', null, _responseInfoCallback)
          new GraphRequestManager().addRequest(infoRequest).start()
        })
        .catch(res => console.log('infoRequest', res))
      })
      .catch(res => console.log('login failed with error', res))
  }

  render() {
    console.log('sf', this.props);
    return (
      <View style={styles.container}>
        { !this.props.hideLoginButton
          ? <View  style={styles.container}>

              <Image style={styles.image} source={require('../../assets/studyhubblogo.png')} />

              <View style={styles.textContainer}>
                <Text style={styles.studyText}>Study</Text>
                <Text style={styles.hubbText}>Hubb</Text>
              </View>

              <Text style={styles.studyBuddyText}>Find Your Study Buddy</Text>

              <TouchableOpacity style={styles.btn} onPress={this.faceBookLogin.bind(null, this.props._handleNavigate, this.props.storeUserFBData)}>
                <Text style={styles.btnText}>Log in with Facebook</Text>
              </TouchableOpacity>
            </View>
          : <View style={styles.spinner}><Spinner isVisible={true} size={100} color={'#F4F4F4'} type={'ChasingDots'}/></View>
        }
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
  spinner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textContainer: {
    flexDirection: 'row'
  },
  studyText: {
    backgroundColor: 'transparent',
    fontSize: 28,
    color: 'white',
    // fontFamily: 'Tabarra NarrowLight'
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

const mapStateToProps = state => ({
  hideLoginButton: state.UIReducer.hideLoginButton
})

export default connect(mapStateToProps, actions)(Login)
