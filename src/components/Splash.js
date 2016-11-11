'use strict'

import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

const Splash = () => (
  <LinearGradient colors={['#5931DE', '#7430E7']} style={styles.container}>
    <Image style={styles.image} source={require('../../assets/studyhubblogo.png')} />
    <View style={styles.textContainer}>
      <Text style={styles.studyText}>Study</Text>
      <Text style={styles.hubbText}>Hubb</Text>
    </View>
    <Text style={styles.studyBuddyText}>Find Your Study Buddy</Text>
  </LinearGradient>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#20BD90',
    alignItems: 'center'
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
  }
})

export default Splash
