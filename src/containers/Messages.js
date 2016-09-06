import React, { Component } from 'react'
import { View, TouchableOpacity, Image, Text, StyleSheet, TextInput, DeviceEventEmitter, Animated } from 'react-native'

class Messages extends Component {

  constructor (props) {
    super(props)

    this.state = {
      keyboardOffset: new Animated.Value(0)
    }

  }

  keyboardWillShow(e) {
    Animated.spring(this.state.keyboardOffset, {
      toValue: e.endCoordinates.height,
      friction: 6
    }).start();
  }

  keyboardWillHide(e) {
    Animated.spring(this.state.keyboardOffset, {
      toValue: 0,
      friction: 6
    }).start();
  }

  componentWillMount () {
    keyboardWillShowSubscription = DeviceEventEmitter
      .addListener('keyboardWillShow', (e) => this.keyboardWillShow(e));

    keyboardWillHideSubscription = DeviceEventEmitter
      .addListener('keyboardWillHide', (e) => this.keyboardWillHide(e));
  }

  componentWillUnmount() {
    keyboardWillShowSubscription.remove();
    keyboardWillHideSubscription.remove();
  }

  messageBox (message) {
    if (message.sender === 'sender') {
      return (
        <View style={styles.sentMessageBox}>
          <Text>{message.text}</Text>
        </View>
      )
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.navIcons}>
          <TouchableOpacity style={styles.backArrowContainer}>
            <Image source={require('../../assets/back.png')} style={styles.backArrow} />
          </TouchableOpacity>
          <Image source={require('../../assets/online-circle.png')} style={styles.onlineCircle} />
          <Text style={styles.nameText}>Kendall</Text>
          <Image style={styles.profilePic} source={{uri: 'https://pbs.twimg.com/media/CZBWabqUQAA6vFt.jpg'}}/>
        </View>
        <Animated.View style={[styles.chatInputContainer, { bottom: this.state.keyboardOffset }]}>
          <TextInput style={styles.chatInput} placeholder={'Your Message'} />
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navIcons: {
    flexDirection: 'row',
    marginTop: 28,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'white',
    borderBottomColor: '#F3F3F3',
    padding: 7,
    height: 60,
    alignItems: 'center'
  },
  backArrowContainer: {
    position: 'absolute',
    top: 10,
    left: 28,
  },
  backArrow: {
    height: 20,
    width: 20
  },
  nameText: {
    fontSize: 20,
    marginTop: -20
  },
  profilePic: {
    height: 50,
    width: 50,
    borderRadius: 25,
    position: 'absolute',
    right: 80,
    top: -6
  },
  onlineCircle: {
    height: 10,
    width: 10,
    marginRight: 5,
    marginTop: -20
  },
  sentMessageBox: {
    backgroundColor: 'red',
    height: 80,
    width: 100
  },
  chatInputContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center'
  },
  chatInput: {
    height: 40,
    backgroundColor: '#F3F3F3',
    padding: 10
  }
})

export default Messages
