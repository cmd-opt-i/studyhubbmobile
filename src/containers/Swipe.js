'use strict';

//image url https://graph.facebook.com/userid/picture?type=large

import React, {Component} from 'react'
import {StyleSheet, Text, View, Image} from 'react-native';
import SwipeCards from 'react-native-swipe-cards';

import { getTheme, menu, MKButton, MKColor } from 'react-native-material-kit';

const theme = getTheme();
const PlainFab = MKButton.coloredFab()
  .withStyle({
    width: 60,
    height: 60,
    borderRadius: 100,
    position: 'relative',
    left: 110,
    top: 50,
    margin: 10
   })
  .build();


let Card = React.createClass({
  render() {
    return (
      <View>
        <View style={theme.cardStyle}>
          <Image source={{uri : this.props.image}} style={theme.cardImageStyle} />
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.nameText}>Freddie, </Text>
            <Text style={styles.ageText}>23</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Image style={styles.gradCapIcon} source={require('../../assets/gradcap.png')} />
            <Text style={{marginTop: 11, fontSize: 10}}>University of California, Los Angeles</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Image style={styles.diplomaIcon} source={require('../../assets/diploma.png')} />
            <Text style={{marginTop: 11, fontSize: 10}}>Computer Science</Text>
          </View>
          <View style={{marginTop: 20}}></View>
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
  {name: '1', image: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/1979601_773084782761077_6142668661562675962_n.jpg?oh=4fadac9658e02f254ac33f583abe4d49&oe=585830E0'},
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
      <View style={{backgroundColor: '#E9F2F6', flex: 1}}>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <Image style={styles.userIcon} source={require('../../assets/user.png')} />
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.studyText}>Studdy</Text>
            <Text style={styles.hubbText}>Hubb</Text>
          </View>
          <Image style={styles.messageBoxIcon} source={require('../../assets/speech-bubble.png')} />
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
        <View style={{flexDirection: 'row', backgroundColor: 'transparent', position: 'relative', bottom: 110}}>
          <PlainFab onPress={this.cardRemoved.bind(this, 0)}>
            <Image style={styles.cancelIcon} pointerEvents="none" source={require('../../assets/cancel-music.png')} />
          </PlainFab>
          <PlainFab>
            <Image style={styles.bookIcon} pointerEvents="none" source={require('../../assets/books.png')} />
          </PlainFab>
        </View>
      </View>
    )
  }
})

const styles = StyleSheet.create({
  card: {
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white'
  },
  thumbnail: {
    flex: 1,
    width: 300,
    height: 375,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 2,
    shadowOpacity: 1.0
  },
  text: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameText: {
    color: '#544F5D',
    fontWeight: '600',
    marginTop: 18
  },
  ageText: {
    color: '#858BA0',
    marginTop: 18
  },
  diplomaIcon: {
    position: 'relative',
    right: 8,
    marginTop: 10,
    height: 19,
    width: 19
  },
  gradCapIcon: {
    position: 'relative',
    right: 8,
    marginTop: 10,
    height: 20,
    width: 20,
    paddingBottom: 10
  },
  userIcon: {
    position: 'relative',
    top: 35,
    left: 13,
    height: 30,
    width: 30
  },
  messageBoxIcon: {
    position: 'relative',
    top: 35,
    right: -140,
    height: 30,
    width: 30
  },
  studyText: {
    position: 'relative',
    top: 35,
    left: 75,
    backgroundColor: 'transparent',
    fontSize: 28,
    color: '#F03557',
    fontFamily: 'Tabarra NarrowLight'
  },
  hubbText: {
    position: 'relative',
    top: 35,
    left: 75,
    backgroundColor: 'transparent',
    fontSize: 28,
    color: '#F03557',
    fontFamily: 'Tabarra Black'
  },
    buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  fab: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  cancelIcon: {
    height: 30,
    width: 30
  },
  bookIcon: {
    height: 35,
    width: 35
  }
})
