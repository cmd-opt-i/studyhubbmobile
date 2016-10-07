'use strict';
//image url https://graph.facebook.com/774635482/picture?width=300&height=300

import React, { Component } from 'react'
import { connect } from 'react-redux'
const _ = require('lodash')
import * as actions from '../actions'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import SwipeCards from '../components/SwipeCards'
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

class Swipe extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.isFetching(true)
    this.props.getAllUsers(this.props.faceBookInfo.id)
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps);
    nextProps.allUsers ? this.unshiftSwipes(nextProps.faceBookInfo.newSwipes, nextProps.allUsers) : null
  }
    unshiftSwipes(swipes, allUsers) {
      const { setAllUsers, unShift, faceBookInfo } = this.props
      const myID = faceBookInfo.faceBookInfo.id
      const swipesToBeUnShifted = []
      const result = []

      if (unShift) {
        allUsers.forEach(user => {
          let ID = user.info.faceBookInfo.id
          if (swipes[ID]) {
            swipesToBeUnShifted.push(user)
          } else {
            result.push(user)
          }
        })

        swipesToBeUnShifted.forEach(user => {
          const theirID = user.info.faceBookInfo.id
          firebaseApp.database().ref(`/users/${myID}/newSwipes/${theirID}`).remove()
            .then(() => console.log('successfully removed'))
            .catch(err => console.log('err', err))
          result.unshift(user)
        })
        setAllUsers(result, true)
      } else {
        console.log('eat ass');
      }

    }


  checkForMatch(card) {
    const myID = this.props.faceBookInfo.id
    const theirID = card.info.faceBookInfo.id
    const myData = this.props.faceBookInfo

    if (card.info.swipes[myID]) {
      //add their info to my shit
      firebaseApp.database().ref(`/users/${myID}/matches/${theirID}`).update({
          status: 'new',
          picture: card.image,
          name: card.info.faceBookInfo.name
          //this is where we send the push notification
          // or do a cool modal or somethin
      })
      //add my info to their shit
      firebaseApp.database().ref(`/users/${theirID}/matches/${myID}`).update({
          status: 'new',
          picture: myData.faceBookInfo.picture.data.url,
          name: myData.faceBookInfo.name
      })

      //remove their id from my swipes
      firebaseApp.database().ref(`/users/${myID}/swipes/${theirID}`).remove()
        .then(() => console.log('successfully removed'))
        .catch(err => console.log('err', err))
        const newSwipes = {}
        for(let key in myData.swipes) {
          myData.swipes.theirID ? null : newSwipes[key] = myData.swipes[key]
        }

      //remove my id from their swipes
      firebaseApp.database().ref(`/users/${theirID}/swipes/${myID}`).remove()
        .then(() => console.log('successfully removed'))
        .catch(err => console.log('err', err))

      //create message id/object
      const messageID = `${theirID}_${myID}`
      firebaseApp.database().ref(`/messages/${messageID}`).update({
        test: 'test'
      })

      //store message id in my object
      firebaseApp.database().ref(`/users/${myID}/messages`).update({
        [messageID]: messageID
      })

      //store message id in their object
      firebaseApp.database().ref(`/users/${theirID}/messages`).update({
        [messageID]: messageID
      })

      firebaseApp.database().ref(`/users/${myID}`)
        .ref.once('value')
        .then(snapshot => {
          this.props.storeUserFBData(snapshot.val())
        })
    } else {
      firebaseApp.database().ref(`/users/matches/${theirID}`)
        .ref.once('value')
        .then(snapshot => {
          if(snapshot.val()) {
            console.log('already matched');
          } else {
            //stre their id in myswipes
            firebaseApp.database().ref(`/users/${myID}/swipes`).update({
              [theirID]: theirID
            })
          }
        })
    }
  }

  handleYup (card) {
    this.checkForMatch(card)
  }

  handleNope (card) {
    const theirID = card.info.faceBookInfo.id
    const myID = this.props.faceBookInfo.id

    firebaseApp.database().ref(`/users/${theirID}/swipes/${myID}`).remove()
    //check if my id is in their swipes
    //if it is remove that shit
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
          props={this.props}
          checkForMatch={this.checkForMatch}
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
  fetching: state.UIReducer.fetching,
  unShift: state.FacebookDataReducer.unShift
})

export default connect(mapStateToProps, actions)(Swipe)
