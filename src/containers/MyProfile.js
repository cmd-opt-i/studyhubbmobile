'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'

const route = {
  type: 'push',
  route: {
    key: 'settings',
    title: 'Settings'
  }
}

const editProfileRoute = {
  type: 'push',
  route: {
    key: 'editprofile',
    title: 'EditProfile'
  }
}

class MyProfile extends Component {
  render() {
    const { faceBookInfo } = this.props
    const profilePic = faceBookInfo.faceBookInfo.picture.data.url
    return (
      <View style={styles.container}>
        <View style={styles.navIconsContainer}>
          <Image style={styles.userIcon} source={require('../../assets/green-user.png')} />
          <TouchableOpacity onPress={this.props._goBack} style={{position: 'absolute', right: -160}}>
            <Image style={styles.bookIcon} source={require('../../assets/hard-cover-book.png')} />
          </TouchableOpacity>
        </View>

        <View style={styles.profilePicContainer}>
          <Image style={styles.profilePic} source={{uri: profilePic}} />
          <TouchableOpacity style={styles.editButton} onPress={this.props._handleNavigate.bind(null, editProfileRoute)}>
            <Image style={styles.editButtonIcon} source={require('../../assets/pencil.png')} />
          </TouchableOpacity>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{faceBookInfo.name.split(' ')[0]} </Text>
            <Text style={styles.age}>| 22</Text>
          </View>
        </View>

        <Text style={{fontSize: 13, backgroundColor: 'transparent', color: '#344145', marginTop: -10, position: 'absolute', left: 38}}>Info</Text>
        <View style={styles.infoContainer}>
          <View style={{flexDirection: 'row', position: 'relative', left: 10, marginTop: 10}}>
            <Image style={{height: 15, width: 15, marginRight: 10}} source={require('../../assets/earth-globe.png')} />
            <Text style={{color: '#344145', fontSize: 10, fontWeight: '300'}}>San Diego, CA</Text>
          </View>

          <View style={{flexDirection: 'row', position: 'relative', left: 10, marginTop: 10}}>
            <Image style={{height: 15, width: 15, marginRight: 10}} source={require('../../assets/gradcap.png')} />
            <Text style={{color: '#344145', fontSize: 10, fontWeight: '300'}}>University of San Diego</Text>
          </View>

          <View style={{flexDirection: 'row', position: 'relative', left: 10, marginTop: 10, marginBottom: 15}}>
            <Image style={{height: 15, width: 15, marginRight: 10}} source={require('../../assets/diploma.png')} />
            <Text style={{color: '#344145', fontSize: 10, fontWeight: '300'}}>{faceBookInfo.major}</Text>
          </View>

          <Text style={{fontSize: 13, backgroundColor: 'transparent', color: '#344145', marginBottom: -7}}>About</Text>
          <View style={styles.aboutContainer}>
            <Text style={{ fontSize: 10, color: '#344145', fontWeight: '300' }}>{faceBookInfo.bio}</Text>
          </View>

          <TouchableOpacity style={styles.settingsBtn} onPress={this.props._handleNavigate.bind(null, route)}>
            <Text style={styles.settingsBtnText}>SETTINGS</Text>
          </TouchableOpacity>
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
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 30
  },
  userIcon: {
    height: 28,
    width: 28,
  },
  bookIcon: {
    height: 26,
    width: 26
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
  editButton: {
    height: 50,
    width: 50,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    borderColor: '#28CF9B',
    margin: 10,
    backgroundColor: '#28CF9B',
    shadowColor: 'rgba(0, 0, 0, 0.20)',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    position: 'relative',
    right: -90,
    top: -65
  },
  editButtonIcon: {
    height: 20,
    width: 20
  },
  nameContainer: {
    flexDirection: 'row',
    marginTop: -40
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
  settingsBtn: {
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
  settingsBtnText: {
    backgroundColor: 'transparent',
    color: 'white'
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

const mapStateToProps = state => ({
  faceBookInfo: state.FacebookDataReducer.faceBookInfo
})

export default connect(mapStateToProps, null)(MyProfile)
