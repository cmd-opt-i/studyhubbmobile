'use strict'

import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'


class Profile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.navIconsContainer}>
          <TouchableOpacity>
            <Image style={styles.closeIcon} source={require('../../assets/multiply.png')} />
          </TouchableOpacity>
        </View>
        <View style={styles.profilePicContainer}>
          <Image style={styles.profilePic} source={{ uri: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAhRAAAAJDhlOTkyMzlhLTAxMGEtNGU1Mi1hNThlLTQ4MjIzMDA1ZmJiYw.jpg' }} />
          <View style={styles.nameContainer}>
            <Text style={styles.name}>Ryan </Text>
            <Text style={styles.age}>| 24</Text>
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
            <Text style={{color: '#344145', fontSize: 10, fontWeight: '300'}}>University of California, Los Angeles</Text>
          </View>
          <View style={{flexDirection: 'row', position: 'relative', left: 10, marginTop: 10, marginBottom: 15}}>
            <Image style={{height: 15, width: 15, marginRight: 10}} source={require('../../assets/diploma.png')} />
            <Text style={{color: '#344145', fontSize: 10, fontWeight: '300'}}>Computer Science</Text>
          </View>
          <Text style={{fontSize: 13, backgroundColor: 'transparent', color: '#344145', marginBottom: -7}}>About</Text>
          <View style={styles.aboutContainer}>
            <Text style={{ fontSize: 10, color: '#344145', fontWeight: '300' }}>
              Lorem ipsum dolor sit amet, elit soluta signiferumque eu mea, cu vim
              luptatum maluisset? Mea an noster impedit, veniam eloquentiam concludaturque
              quo ea, no has nobis nostrud? Sea illum ceteros te? Ad animal salutatus per.
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
    marginTop: 20,
    marginLeft: -150,
    height: 28,
    width: 28,
  },
  profilePicContainer: {
    marginTop: 20,
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
