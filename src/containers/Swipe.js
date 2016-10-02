'use strict';

//our colors: ['#1A354A', '#226065', '#277D7B']

//image url https://graph.facebook.com/774635482/picture?width=300&height=300

import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import SwipeCards from 'react-native-swipe-cards';
import LinearGradient from 'react-native-linear-gradient'

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

let Card = React.createClass({
  render() {
    return (
      <View style={styles.card}>

        <TouchableOpacity onPress={this.props._handleNavigate.bind(null, route)}>
          <Image style={styles.thumbnail} source={{uri: this.props.image}} />
        </TouchableOpacity>

        <View style={{flexDirection: 'row'}}>
          <Text style={styles.nameText}>Marila </Text><Text style={styles.ageText}>| 23</Text>
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
          <Text style={{color: '#344145'}}>Business Management</Text>
        </View>

      </View>
    )
  }
})

let NoMoreCards = React.createClass({
  render() {
    return (
      <View style={styles.noMoreCards}>
        <Text>No more cards</Text>
      </View>
    )
  }
})

const Cards = [
  {name: '1', image: '/Users/freddiecabrera/Desktop/studyhubbmobile/assets/girl2.jpg'},
  {name: '2', image: '/Users/freddiecabrera/Desktop/studyhubbmobile/assets/girl2.jpg'},
  {name: '3', image: 'https://pbs.twimg.com/media/CZBWabqUQAA6vFt.jpg'},
  {name: '4', image: 'https://scontent-lax3-1.cdninstagram.com/t51.2885-19/s320x320/12479298_145676829148050_1371843354_a.jpg'},
  {name: '5', image: 'http://imd.ulximg.com/image/300x300/artist/1392853723_dd7bf404602d4647b315404d9a76a123.jpg/d6a6a346065c968a46c283c8add1f979/1392853723_frank_ocean_86.jpg'},
  {name: '6', image: 'https://pbs.twimg.com/profile_images/585565077207678977/N_eNSBXi_400x400.jpg'},
  {name: '7', image: 'https://pbs.twimg.com/profile_images/740059179021258752/3MHiHAo__400x400.jpg'},
  {name: '8', image: 'https://media.giphy.com/media/hEwST9KM0UGti/giphy.gif'},
  {name: '9', image: 'https://pbs.twimg.com/profile_images/718273532438966274/j0h7TkOS_400x400.jpg'},
]

const Cards2 = [
  {name: '10', image: 'https://media.giphy.com/media/12b3E4U9aSndxC/giphy.gif'},
  {name: '11', image: 'https://media4.giphy.com/media/6csVEPEmHWhWg/200.gif'},
  {name: '12', image: 'https://media4.giphy.com/media/AA69fOAMCPa4o/200.gif'},
  {name: '13', image: 'https://media.giphy.com/media/OVHFny0I7njuU/giphy.gif'},
]

const Swipe = React.createClass({
  getInitialState() {
    return {
      cards: Cards,
      outOfCards: false
    }
  },
  handleYup (card) {
    console.log("yup")
  },
  handleNope (card) {
    console.log("nope")
  },
  cardRemoved (index) {
    console.log(`The index is ${index}`);

    let CARD_REFRESH_LIMIT = 3

    if (this.state.cards.length - index <= CARD_REFRESH_LIMIT + 1) {
      console.log(`There are only ${this.state.cards.length - index - 1} cards left.`);

      if (!this.state.outOfCards) {
        console.log(`Adding ${Cards2.length} more cards`)

        this.setState({
          cards: this.state.cards.concat(Cards2),
          outOfCards: true
        })
      }

    }
  },
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

        <SwipeCards
          cards={this.state.cards}
          loop={false}
          renderCard={(cardData) => <Card _handleNavigate={this.props._handleNavigate} {...cardData} />}
          renderNoMoreCards={() => <NoMoreCards />}
          showYup={true}
          showNope={true}

          handleYup={this.handleYup}
          handleNope={this.handleNope}
          cardRemoved={this.cardRemoved}
        />

      </LinearGradient>
    )
  }
})

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

const mapStateToProps = state => ({
  faceBookInfo: state.FacebookDataReducer.faceBookInfo
})

export default connect(mapStateToProps, actions)(Swipe)
