'use strict'

import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'

const NoSchool = props => (
  <View style={styles.container}>
  <Image style={styles.image} source={require('../../assets/sh404.png')}/>
    <View style={styles.textContainer}>
      <Text style={styles.green}>OH NO!</Text>
        <Text style={styles.gray}>WE DIDN'T SEE A</Text>
        <Text style={styles.green}>COLLEGE</Text>
        <Text style={styles.gray}> IN YOUR FB PROFILE</Text>
    </View>
    <View style={{marginTop: 520}}>
      <TouchableOpacity onPress={props._goBack.bind(this)} style={styles.btn}>
        <Text style={{color: '#21CE99'}}>Back to login</Text>
      </TouchableOpacity>
      <Text style={[{ fontSize: 10, marginTop: 10, color: 'gray'}]}>Please login to Facebook and add a college.</Text>
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center'
  },
  image: {
    height: 350,
    width: 200,
    position: 'absolute',
    bottom: 200
  },
  textContainer: {
    position: 'absolute',
    top: 100,
    left: 200
  },
  green: {
    fontFamily: 'Tabarra Black',
    color: '#21CE99',
    backgroundColor: 'transparent'
  },
  gray: {
    backgroundColor: 'transparent',
    color: '#C8CCCF',
    fontFamily: 'Tabarra NarrowLight'
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    height: 40,
    width: 200,
    borderWidth: 1,
    borderColor: '#21CE99',
    borderRadius: 5
  }
})

export default NoSchool
