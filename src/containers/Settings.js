import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ListView, ScrollView, Switch} from 'react-native'

const someData = [1,2,3,4,5,6,7,7,8,8,9,9]

class Settings extends Component {
  constructor (props) {
    super(props)

    this.state = {
      trueSwitchIsOn: true,
      falseSwitchIsOn: false,
    }

  }

  render () {
    return (
        <View style={styles.container}>
          <View style={styles.settingsHeader}>
            <Text>Settings</Text>
          </View>
          <TouchableOpacity onPress={this.props._goback} style={styles.doneTextContainer}>
            <Text style={styles.doneText}>Done</Text>
          </TouchableOpacity>
          <ScrollView>
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
          </ScrollView>
          <View style={styles.btnContianer}>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnText}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, { backgroundColor: '#E92E49', borderColor:'red' }]}>
              <Text style={styles.btnText}>Delete Account</Text>
            </TouchableOpacity>
          </View>
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

export default Settings
