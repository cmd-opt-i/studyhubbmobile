'use strict';
//image url https://graph.facebook.com/774635482/picture?width=300&height=300

import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import SwipeCards from 'react-native-swipe-cards'
import LinearGradient from 'react-native-linear-gradient'
import Spinner from 'react-native-spinkit'
import Card from '../components/Card'
import { firebaseApp } from '../../index.ios'

const myProfileRoute = {
  type: 'push',
  route: {
    key: 'myprofile',
    title: 'MyProfile'
  }
}

const matchesRoute = {
  type: 'push',
  route: {
    key: 'matches',
    title: 'Matches'
  }
}

const route = {
  type: 'push',
  route: {
    key: 'profile',
    title: 'Profile'
  }
}

const Cards = [
  {image: '/Users/freddiecabrera/Desktop/studyhubbmobile/assets/girl2.jpg'},
  {image: '/Users/freddiecabrera/Desktop/studyhubbmobile/assets/girl2.jpg', info: {data: 'data'}},
]

class Swipe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: Cards
    }
  }

  componentWillMount() {
    this.props.isFetching(true)
    this.props.getAllUsers(this.props.faceBookInfo.id)
  }

  handleYup (card) {
    console.log("yup:", card)
  }

  handleNope (card) {
    console.log("nope:", card)
  }

  render() {
    console.log('props from swipe', this.props);
    return (
      <LinearGradient colors={['white', '#F4F7F7']} style={{flex: 1}}>

        <View style={{flexDirection: 'row', marginTop: 28, justifyContent: 'center'}}>
          <Text style={{backgroundColor: 'transparent', color: '#28CF9B', fontFamily: 'Tabarra Black', fontSize: 25}} >Study</Text><Text style={{backgroundColor: 'transparent', color: '#28CF9B', fontFamily: 'Tabarra Black', fontSize: 25}} >Hubb</Text>
        </View>

        <TouchableOpacity style={styles.userIconButton} onPress={this.props._handleNavigate.bind(null, myProfileRoute)}>
          <Image style={styles.userIcon} source={require('../../assets/user.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', height: 28, width: 28, position: 'absolute', right: 15, top: 30 }} onPress={this.props._handleNavigate.bind(null, matchesRoute)}>
          <Image style={{height: 28, width: 28}} source={require('../../assets/chat.png')} />
        </TouchableOpacity>
        {this.props.fetching ? <View style={styles.spinner}><Spinner isVisible={true} size={100} color={'#21CE99'} type={'ChasingDots'}/></View>
        : <SwipeCards
          cards={this.props.allUsers}
          loop={true}
          renderCard={(cardData) => <Card _handleNavigate={this.props._handleNavigate} route={route} {...cardData} />}
          showYup={true}
          showNope={true}
          handleYup={this.handleYup}
          handleNope={this.handleNope}
        />}

      </LinearGradient>
    )
  }
}

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
  spinner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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

const mapStateToProps = state => ({
  faceBookInfo: state.FacebookDataReducer.faceBookInfo,
  allUsers: state.FirebaseReducer.allUsers,
  fetching: state.UIReducer.fetching
})

export default connect(mapStateToProps, actions)(Swipe)
