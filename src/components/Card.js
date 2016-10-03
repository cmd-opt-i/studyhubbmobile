import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'

const Card = props => (
  <View style={styles.card}>

    <TouchableOpacity onPress={props._handleNavigate.bind(null, props.route)}>
      <Image style={styles.thumbnail} source={{uri: props.image}} />
    </TouchableOpacity>

    <View style={{flexDirection: 'row'}}>
      <Text style={styles.nameText}>{props.info.faceBookInfo.name} </Text><Text style={styles.ageText}>| {props.info.age}</Text>
    </View>

    <View style={{flexDirection: 'row', position: 'relative', left: 10, marginTop: 10}}>
      <Image style={{height: 20, width: 20, marginRight: 10}} source={require('../../assets/earth-globe.png')} />
      <Text style={{color: '#344145'}}>Los Angeles, CA</Text>
    </View>

    <View style={{flexDirection: 'row', position: 'relative', left: 10, marginTop: 10}}>
      <Image style={{height: 20, width: 20, marginRight: 10}} source={require('../../assets/gradcap.png')} />
      <Text style={{color: '#344145'}}>Loyola Marymount University</Text>
    </View>

    <View style={{flexDirection: 'row', position: 'relative', left: 10, marginTop: 10, marginBottom: 15}}>
      <Image style={{height: 20, width: 20, marginRight: 10}} source={require('../../assets/diploma.png')} />
      <Text style={{color: '#344145'}}>{props.info.major}</Text>
    </View>

  </View>
)

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 2,
    borderColor: '#ffffff',
    borderWidth: 1,
    shadowColor: 'rgba(0, 0, 0, 0.12)',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 1,
    }
  },
  thumbnail: {
    width: 300,
    height: 300,
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRadius: 2,
    borderColor: 'white'
  },
  text: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameText: {
    color: '#344145',
    fontSize: 20,
    position: 'relative',
    left: 10,
    marginTop: 15,
    fontWeight: '300'
  },
  ageText: {
    color: '#344145',
    fontSize: 20,
    position: 'relative',
    left: 10,
    marginTop: 15,
    fontWeight: '100'
  },
  userIconButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 28,
    width: 28,
    position: 'absolute',
    left: 15,
    top: 30
  },
  userIcon: {
    height: 28,
    width: 28
  }
})

export default Card
