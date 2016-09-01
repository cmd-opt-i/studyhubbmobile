'use strict';

//our colors: ['#1A354A', '#226065', '#277D7B']

//image url https://graph.facebook.com/774635482/picture?width=300&height=300

import React, {Component} from 'react'
import {StyleSheet, Text, View, Image} from 'react-native';
import SwipeCards from 'react-native-swipe-cards';
import LinearGradient from 'react-native-linear-gradient'

let Card = React.createClass({
  render() {
    return (
      <View style={styles.card}>
        <Image style={styles.thumbnail} source={{uri: this.props.image}} />
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.nameText}>Ryan </Text><Text style={styles.ageText}>| 24</Text>
        </View>
        <View style={{flexDirection: 'row', position: 'relative', left: 10, marginTop: 10}}>
          <Image style={{height: 20, width: 20, marginRight: 10}} source={require('../../assets/earth-globe.png')} />
          <Text style={{color: '#344145'}}>Los Angeles, CA</Text>
        </View>
        <View style={{flexDirection: 'row', position: 'relative', left: 10, marginTop: 10}}>
          <Image style={{height: 20, width: 20, marginRight: 10}} source={require('../../assets/gradcap.png')} />
          <Text style={{color: '#344145'}}>University of California, Los Angeles</Text>
        </View>
        <View style={{flexDirection: 'row', position: 'relative', left: 10, marginTop: 10, marginBottom: 15}}>
          <Image style={{height: 20, width: 20, marginRight: 10}} source={require('../../assets/diploma.png')} />
          <Text style={{color: '#344145'}}>Computer Science</Text>
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
  {name: '1', image: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAhRAAAAJDhlOTkyMzlhLTAxMGEtNGU1Mi1hNThlLTQ4MjIzMDA1ZmJiYw.jpg'},
  {name: '2', image: 'https://media.giphy.com/media/irTuv1L1T34TC/giphy.gif'},
  {name: '3', image: 'https://media.giphy.com/media/LkLL0HJerdXMI/giphy.gif'},
  {name: '4', image: 'https://media.giphy.com/media/fFBmUMzFL5zRS/giphy.gif'},
  {name: '5', image: 'https://media.giphy.com/media/oDLDbBgf0dkis/giphy.gif'},
  {name: '6', image: 'https://media.giphy.com/media/7r4g8V2UkBUcw/giphy.gif'},
  {name: '7', image: 'https://media.giphy.com/media/K6Q7ZCdLy8pCE/giphy.gif'},
  {name: '8', image: 'https://media.giphy.com/media/hEwST9KM0UGti/giphy.gif'},
  {name: '9', image: 'https://media.giphy.com/media/3oEduJbDtIuA2VrtS0/giphy.gif'},
]

const Cards2 = [
  {name: '10', image: 'https://media.giphy.com/media/12b3E4U9aSndxC/giphy.gif'},
  {name: '11', image: 'https://media4.giphy.com/media/6csVEPEmHWhWg/200.gif'},
  {name: '12', image: 'https://media4.giphy.com/media/AA69fOAMCPa4o/200.gif'},
  {name: '13', image: 'https://media.giphy.com/media/OVHFny0I7njuU/giphy.gif'},
]

export default React.createClass({
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
    return (
      <LinearGradient colors={['white', '#F4F7F7']} style={{flex: 1}}>
        <View style={{flexDirection: 'row', marginTop: 28}}>
          <Image style={{height: 23, width: 23, position: 'absolute', left: 25, top: 10 }} source={require('../../assets/user.png')} />
          <View style={{flexDirection: 'row', position: 'absolute', left: 145, top: 10}}>
            <Text style={{backgroundColor: 'transparent', color: '#28CF9B', fontFamily: 'Tabarra Black', fontSize: 18}} >Study</Text><Text style={{backgroundColor: 'transparent', color: '#28CF9B', fontFamily: 'Tabarra Black', fontSize: 18}} >Hubb</Text>
          </View>
          <Image style={{height: 23, width: 23, position: 'absolute', right: 25, top: 10}} source={require('../../assets/chat.png')} />
        </View>
        <SwipeCards
          cards={this.state.cards}
          loop={false}

          renderCard={(cardData) => <Card {...cardData} />}
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
    flex: 1,
    width: 300,
    height: 300
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
  }
})
