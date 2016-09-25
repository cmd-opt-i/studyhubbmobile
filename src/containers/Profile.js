'use strict'

import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'

class Profile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.navIconsContainer}>
          <TouchableOpacity onPress={this.props._goBack}>
            <Image style={styles.closeIcon} source={require('../../assets/back.png')} />
          </TouchableOpacity>
        </View>
        <View style={styles.profilePicContainer}>
          <Image style={styles.profilePic} source={require('../../assets/girl2.jpg')} />
          <View style={styles.nameContainer}>
            <Text style={styles.name}>Marila </Text>
            <Text style={styles.age}>| 23</Text>
          </View>
        </View>
        <Text style={{fontSize: 13, backgroundColor: 'transparent', color: '#344145', marginTop: -10, position: 'absolute', left: 38}}>Info</Text>
        <View style={styles.infoContainer}>
          <View style={{flexDirection: 'row', position: 'relative', left: 10, marginTop: 10}}>
            <Image style={{height: 15, width: 15, marginRight: 10}} source={require('../../assets/earth-globe.png')} />
            <Text style={{color: '#344145', fontSize: 10, fontWeight: '300'}}>Los Angeles, CA</Text>
          </View>
          <View style={{flexDirection: 'row', position: 'relative', left: 10, marginTop: 10}}>
            <Image style={{height: 15, width: 15, marginRight: 10}} source={require('../../assets/gradcap.png')} />
            <Text style={{color: '#344145', fontSize: 10, fontWeight: '300'}}>Loyola Marymount University</Text>
          </View>
          <View style={{flexDirection: 'row', position: 'relative', left: 10, marginTop: 10, marginBottom: 15}}>
            <Image style={{height: 15, width: 15, marginRight: 10}} source={require('../../assets/diploma.png')} />
            <Text style={{color: '#344145', fontSize: 10, fontWeight: '300'}}>Business Management</Text>
          </View>
          <Text style={{fontSize: 13, backgroundColor: 'transparent', color: '#344145', marginBottom: -7}}>About</Text>
          <View style={styles.aboutContainer}>
            <Text style={{ fontSize: 10, color: '#344145', fontWeight: '300' }}>
              Looking to meet some cool people to study with! Tri Delta.
            </Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7F7',
    alignItems: 'center'
  },
  navIconsContainer: {
    flexDirection: 'row',
    marginTop: 30
  },
  closeIcon: {
    marginTop: 10,
    marginLeft: -170,
    height: 25,
    width: 25,
  },
  profilePicContainer: {
    marginTop: 40,
    alignItems: 'center',
    marginBottom: 20
  },
  profilePic: {
    height: 200,
    width: 200,
    borderRadius: 100,
  },
  nameContainer: {
    flexDirection: 'row',
    marginTop: 23
  },
  name: {
    fontSize: 20,
    fontWeight: '300',
    color: '#344145',
    fontFamily: 'Tabarra Black'
  },
  age: {
    fontSize: 20,
    fontWeight: '300',
    color: '#344145'
  },
  infoContainer: {
    marginTop: 10,
    height: 85,
    width: 300,
    backgroundColor: '#ffffff',
    borderRadius: 2,
    borderColor: '#ffffff',
    borderWidth: 1,
    shadowColor: 'rgba(0, 0, 0, 0.12)',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 2,
    },
  },
  aboutContainer: {
    marginTop: 10,
    height: 90,
    width: 300,
    backgroundColor: '#ffffff',
    borderRadius: 2,
    borderColor: '#ffffff',
    borderWidth: 1,
    shadowColor: 'rgba(0, 0, 0, 0.12)',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 2,
    },
    padding: 15
  }
})

export default Profile
