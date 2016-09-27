import React, { Component } from 'react'
import { View, TouchableOpacity, Image, Text, StyleSheet, TextInput, DeviceEventEmitter, Animated, Keyboard, ListView } from 'react-native'
import * as actions from "../actions/index"

const messages = [
  {
    sender: 'me',
    message: 'Hey how are you doing? Where would you like to study?'
  },
  {
    sender: 'them',
    message: 'I am doing great, thanks for asking. We can go to Starbucks?'
  },
  {
    sender: 'me',
    message: 'Cool, I will see you there.'
  },
  {
    sender: 'them',
    message: 'Can\'t wait!'
  },
]

class Messages extends Component {

  constructor (props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      keyboardOffset: new Animated.Value(0),
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
    keyboardWillShowSubscription = Keyboard
      .addListener('keyboardWillShow', (e) => this.keyboardWillShow(e));

    keyboardWillHideSubscription = Keyboard
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
          <Text style={styles.entText}>{message.text}</Text>
        </View>
      )
    }

    return (
        <View style={styles.receivedMessageBox}>
          <Text style={styles.recivedText}>{message.text}</Text>
        </View>
    )

  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.navIcons}>
          <TouchableOpacity style={styles.backArrowContainer} onPress={this.props._goBack}>
            <Image source={require('../../assets/back.png')} style={styles.backArrow} />
          </TouchableOpacity>
          <Image source={require('../../assets/online-circle.png')} style={styles.onlineCircle} />
          <Text style={styles.nameText}>Michelle</Text>
          <Image style={styles.profilePic} source={require('../../assets/girl5.jpg')}/>
        </View>
        <View style={styles.sentMessageBox}>
          <Text style={styles.sentText}>Hey how are you doing? Where would you like to study?</Text>
        </View>
        <View style={styles.receivedMessageBox}>
          <Text style={styles.recivedText}>I am doing great, thanks for asking. We can go to Starbucks?</Text>
        </View>
        <View style={styles.sentMessageBox}>
          <Text style={styles.sentText}>Cool, I will see you there.</Text>
        </View>
        <Animated.View style={[styles.chatInputContainer, { bottom: this.state.keyboardOffset }]}>
          <TextInput
            style={styles.chatInput}
            placeholder={'Your Message'}
          />
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
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
    backgroundColor: '#28CF9B',
    overflow: 'hidden',
    width: 200,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderWidth: 1,
    borderRadius: 1.5,
    borderColor: '#28CF9B'
  },
  sentText: {
    color: 'white',
    backgroundColor: 'transparent'
  },
  receivedMessageBox: {
    backgroundColor: '#F3F3F3',
    overflow: 'hidden',
    width: 200,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginLeft: 165,
    borderWidth: 1,
    borderRadius: 1.5,
    borderColor: '#F3F3F3'
  },
  recivedText: {
    color: '#203D4B',
    backgroundColor: 'transparent'
  },
  chatInputContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center'
  },
  chatInput: {
    height: 55,
    backgroundColor: '#F3F3F3',
    padding: 10
  }
})

export default Messages
