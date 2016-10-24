'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, StyleSheet, ListView, ScrollView, Switch, AsyncStorage, Alert, Linking } from 'react-native'
import * as actions from '../actions'
import { firebaseApp } from '../../index.ios'

const route = {
  type: 'push',
  route: {
    key: 'login',
    title: 'Login'
  }
}

class Settings extends Component {
  constructor (props) {
    super(props)

    this.state = {
      trueSwitchIsOn: true,
      falseSwitchIsOn: false,
    }

  }

  signOut() {
    AsyncStorage.removeItem('loggedIn')
    .catch(err => console.log('login', err))
    this.props.hideLogin(false)
    this.props.popLogin()
  }

  deleteProfile() {
    const { allUsers, faceBookInfo } = this.props
    const ID = faceBookInfo.id
    firebaseApp.database().ref(`/users/${ID}`).remove()
  }

  askAreTheySureDel() {
    const alertMessage = 'Are you sure you want to delete your profile? All of your data will be deleted.'
    Alert.alert('Delete?', alertMessage, [
              { text: 'Cancel', onPress: () => console.log('Canceled!') },
              { text: 'Delete', onPress: () => this.deleteProfile() },
            ])
  }

  render () {
    console.log('settings', this.props);
    return (
        <View style={styles.container}>
          <View style={styles.settingsHeader}>
            <Text>Settings</Text>
          </View>
          <TouchableOpacity onPress={this.props._goback} style={styles.doneTextContainer}>
            <Text style={styles.doneText}>Done</Text>
          </TouchableOpacity>
          {/*<ScrollView>
            <Text style={styles.notifications}>Notifications</Text>
            <View style={styles.notificationOptions}>
              <Text style={styles.notificationText}>Messages</Text>
              <Switch
                tintColor='#28CF9B'
                onTintColor='#28CF9B'
                style={styles.notificationSwitch}
                onValueChange={(value) => this.setState({trueSwitchIsOn: value})}
                value={this.state.trueSwitchIsOn}
              />
            </View>
            <View style={{width: 20, borderColor: 'gray', height: 1}} />
            <View style={[styles.notificationOptions, { marginTop: 0}]}>
              <Text style={styles.notificationText}>Matches</Text>
              <Switch
                tintColor='#28CF9B'
                onTintColor='#28CF9B'
                style={styles.notificationSwitch}
                onValueChange={(value) => this.setState({trueSwitchIsOn: value})}
                value={this.state.trueSwitchIsOn}
              />
            </View>
          </ScrollView>*/}
          <View style={styles.btnContianer}>
            <TouchableOpacity onPress={this.signOut.bind(this)} style={styles.btn}>
              <Text style={styles.btnText}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.askAreTheySureDel.bind(this)} style={[styles.btn, { backgroundColor: '#E92E49', borderColor:'red' }]}>
              <Text style={styles.btnText}>Delete Account</Text>
            </TouchableOpacity>
          </View>
          <Text style={{color: 'blue', marginLeft: 40}}
                onPress={() => Linking.openURL('http://www.studyhubb.com/privacy-policy/')}>
            Privacy Policy
          </Text>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  settingsHeader: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 1,
    borderColor: 'transparent',
    borderBottomColor: '#F3F3F3',
    backgroundColor: 'white',
    borderWidth: 1
  },
  doneTextContainer: {
    position: 'absolute',
    top: 28,
    right: 10
  },
  doneText: {
    color: '#E92E49',
    backgroundColor: 'transparent'
  },
  notifications: {
    color: 'gray',
    fontSize: 18,
    marginLeft: 10,
    marginTop: 18
  },
  notificationOptions: {
    marginTop: 10,
    height: 60,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  notificationText: {
    position: 'absolute',
    left: 10,
    bottom: 20,
    fontSize: 15,
    color: 'gray'
  },
  notificationSwitch: {
    position: 'absolute',
    right: 10,
    bottom: 13
  },
  btnContianer: {
    marginTop: 90,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn: {
    marginTop: 10,
    height: 50,
    width: 300,
    backgroundColor: '#28CF9B',
    borderRadius: 2,
    borderColor: '#28CF9B',
    borderWidth: 1,
    shadowColor: 'rgba(0, 0, 0, 0.12)',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 3,
      width: 3,
    },
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    color: 'white'
  }
})

const mapStateToProps = state => ({
  navigation: state.NavReducer,
  allUsers: state.FirebaseReducer.allUsers,
  faceBookInfo: state.FacebookDataReducer.faceBookInfo
})

export default connect(mapStateToProps, actions)(Settings)
