import React, { Component } from 'react'
import { View, TouchableOpacity, Image, Text, StyleSheet, TextInput, DeviceEventEmitter, Animated, Keyboard, ListView, ScrollView } from 'react-native'
const _ = require('lodash')
import moment from 'moment'
import { firebaseApp } from '../../index.ios'
import { connect } from 'react-redux'
import * as actions from "../actions/index"

class Messages extends Component {

  constructor (props) {
    super(props)
    this._messages = []
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      keyboardOffset: new Animated.Value(0),
      messages: this._messages,
      message: '',
      messageID: '',
      dataSource: ds.cloneWithRows([''])
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

  componentDidMount () {
    this.getMessages()
  }

  getMessages () {
    const { faceBookInfo, currentStudyBuddy } = this.props
    const messages = faceBookInfo.messages
    const theirID = currentStudyBuddy.id
    const myID = faceBookInfo.id
    let messageID;

    //loop throught messages and return the ones === to myID and their id
    const match1 = `${myID}_${theirID}`
    const match2 = `${theirID}_${myID}`

    _.forEach(messages, id => {
      id === match1 || id === match2 ? messageID = id : null
    })

    this.setState({
      messageID
    })

    //get all messages
    firebaseApp.database().ref(`/conversations/${messageID}`)
      .ref.on('child_added', child => {
        this.handleReceive({
          sender: child.val().sender,
          date: child.val().date,
          text: child.val().text
        })
      })

  }

  componentWillUnmount() {
    keyboardWillShowSubscription.remove();
    keyboardWillHideSubscription.remove();
    firebaseApp.database().ref(`/conversations/${this.state.messageID}`)
    .ref.off('child_added')
  }

  setMessages(messages) {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this._messages = messages;

    this.setState({
      messages: messages,
      dataSource: ds.cloneWithRows(messages)
    });
  }

  handleReceive(message = {}) {
      this.setMessages(this._messages.concat(message));
  }

  handleSend(message = {}) {
    const index = this.state.messages.length - 1
    if (this.state.message === '') {
    } else {
      firebaseApp.database().ref(`/conversations/${this.state.messageID}`).update({
        [index]: {
          sender: this.props.faceBookInfo.id,
          text: this.state.message,
          date: moment().format("dddd,MMMM Do YYYY,h:mm:ss a")
        }
      })
      this.setState({ message: ''})
    }
  }

  messageBox (message) {

    if (message.sender === this.props.faceBookInfo.id && message.sender) {
      return (
        <View style={styles.sentMessageBox}>
          <Text style={styles.sentText}>{message.text}</Text>
        </View>
      )
    } else if (message.sender) {
        return (
            <View style={styles.receivedMessageBox}>
              <Text style={styles.recivedText}>{message.text}</Text>
            </View>
        )
    }
    return <View></View>
  }

  render () {
    const { currentStudyBuddy } = this.props
    const { messages } = this.state
    console.log('currentStudyBuddy in messages', currentStudyBuddy);
    console.log('state', this.state);
    return (
      <View style={styles.container}>
        <Animated.View style={{ flex: 1, bottom: this.state.keyboardOffset }}>
          <View style={styles.navIcons}>
            <TouchableOpacity style={styles.backArrowContainer} onPress={this.props._goBack}>
              <Image source={require('../../assets/back.png')} style={styles.backArrow} />
            </TouchableOpacity>
            <Image source={require('../../assets/online-circle.png')} style={styles.onlineCircle} />
            <Text style={styles.nameText}>{currentStudyBuddy.name.split(' ')[0]}</Text>
            <Image style={styles.profilePic} source={{uri: currentStudyBuddy.picture}}/>
          </View>
          <ListView
            style={{marginBottom: 55}}
            dataSource={this.state.dataSource}
            renderRow={message => (
              this.messageBox(message)
            )}
          />
        </Animated.View>
        <Animated.View style={[styles.chatInputContainer, { bottom: this.state.keyboardOffset, flexDirection: 'row' }]}>
            <TextInput
            onChangeText={text => this.setState({ message: text})}
            value={this.state.message}
            style={styles.chatInput}
            placeholder={'Your Message'}
            />
            <TouchableOpacity style={styles.sendBtn} onPress={this.handleSend.bind(this)}>
              <Text style={{color: 'white'}}>Send</Text>
            </TouchableOpacity>
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
    width: 300,
    backgroundColor: '#F3F3F3',
    padding: 10
  },
  sendBtn: {
    height: 55,
    width: 75,
    backgroundColor: '#21CE99',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const mapStateToProps = state => ({
  currentStudyBuddy: state.CardReducer.currentStudyBuddy,
  faceBookInfo: state.FacebookDataReducer.faceBookInfo
})

export default connect(mapStateToProps, null)(Messages)
