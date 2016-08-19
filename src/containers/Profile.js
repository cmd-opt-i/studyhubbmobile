'use strict'

import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

class Profile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#20BD90',
    alignItems: 'center'
  },
  title: {
    marginTop: 180,
    fontSize: 40,
    backgroundColor: 'transparent'
  }
})

export default Profile
