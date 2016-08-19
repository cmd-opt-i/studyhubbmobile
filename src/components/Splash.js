'use strict'

import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const Splash = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Study Hubb</Text>
    <Text style={styles.para}>Find your Studdy Buddy</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#20BD90',
    alignItems: 'center'
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
  }
})

export default Splash
