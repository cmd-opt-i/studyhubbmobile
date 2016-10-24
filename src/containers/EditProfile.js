import React,{ Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image, DeviceEventEmitter, Animated, Keyboard, AsyncStorage } from 'react-native'
import { firebaseApp } from '../../index.ios'

const route = {
  type: 'push',
  route: {
    key: 'myprofile',
    title: 'MyProfile'
  }
}
const onBoardingRoute = {
  type: 'push',
  route: {
    key: 'myprofile',
    title: 'MyProfile'
  }
}

class EditProfile extends Component {
  constructor(props) {
    super(props)

    //set the initial state first we check if the values exist in props
    //if they do then use those as state
    this.state = {
      keyboardOffset: new Animated.Value(0),
      major: this.props.faceBookInfo.major || '',
      bio: this.props.faceBookInfo.bio || '',
      gradYear: this.props.faceBookInfo.gradYear || '',
      age: this.props.faceBookInfo.age || ''
    }
  }

  getUserData (id) {
    console.log('getUserData func id:', id);
    firebaseApp.database().ref("/users/" + id)
      .ref.once('value')
      .then(snapshot => {
        this.props.storeUserFBData(snapshot.val())
      }).catch(err => console.log(err))
  }

  saveUser() {
    const { major, bio, gradYear, age } = this.state
    const { faceBookInfo, storeUserFBData } = this.props

    firebaseApp.database().ref('/users/' + faceBookInfo.id).set({
      id: faceBookInfo.id,
      name: faceBookInfo.name,
      school: faceBookInfo.school,
      age,
      email: faceBookInfo.email,
      major,
      bio,
      gradYear,
      date: faceBookInfo.date,
      location: faceBookInfo.location,
      picture: faceBookInfo.picture,
      swipes: { 1234: 'test user' },
      matches: { 1234: 'test user' }
    })

    AsyncStorage.getItem('on boarding')
      .then(data => {
        if (data) {
          AsyncStorage.removeItem('on boarding')
          .then(data => {
            this.getUserData(faceBookInfo.id)
            this.props.pop()
            this.props._handleNavigate(onBoardingRoute)
          })
          .catch(err => console.log('login', err))
        } else {
          this.getUserData(faceBookInfo.id)
          this.props.pop()
          this.props._handleNavigate(route)
        }
      })
  }

  cancelEdit () {
    AsyncStorage.getItem('on boarding')
      .then(data => {
        console.log('if onBoarding',data);
        if (data) {
        } else {
          console.log('else onBoarding', data);
          this.props.pop()
          this.props._handleNavigate(route)
        }
      })

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

  render() {
    console.log('editprofileprops', this.props)
    return(
      <View style={styles.container}>
        <View style={styles.navContainer}>
          <TouchableOpacity style={styles.cancelBtn} onPress={this.cancelEdit.bind(this)}>
            <Text>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Edit Profile</Text>
          <TouchableOpacity style={styles.doneBtn} onPress={this.saveUser.bind(this)}>
            <Text>Done</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.topInputContainer}>
          <View style={styles.inputContainer}>
            <Image style={{height: 25, width: 25, marginRight: 15, marginBottom: -3}} source={require('../../assets/diploma.png')} />
            <View style={styles.bottomBorder}>
              <TextInput placeholder={this.props.faceBookInfo.major || 'Major'} style={styles.majorInput} onChangeText={text => this.setState({ major: text })} />
            </View>
          </View>

          <View style={[styles.inputContainer, {marginTop: 20}]}>
            <Image style={{height: 25, width: 25, marginRight: 15, marginBottom: -3}} source={require('../../assets/information.png')} />
            <View style={styles.bottomBorder}>
              <TextInput placeholder={this.props.faceBookInfo.bio || 'Bio'} style={styles.majorInput} onChangeText={text => this.setState({ bio: text})}  />
            </View>
          </View>

          <View style={[styles.inputContainer, {marginTop: 20}]}>
            <Image style={{height: 25, width: 25, marginRight: 15, marginBottom: -3}} source={require('../../assets/balloons.png')} />
            <View style={styles.bottomBorder}>
              <TextInput placeholder={this.props.faceBookInfo.age || 'Age'} style={styles.majorInput} onChangeText={text => this.setState({ age: text})}  />
            </View>
          </View>

          <View style={[styles.inputContainer, {marginTop: 20}]}>
            <Image style={{height: 25, width: 25, marginRight: 15, marginBottom: -3}} source={require('../../assets/gradcap.png')} />
            <View style={styles.bottomBorder}>
              <TextInput placeholder={this.props.faceBookInfo.gradYear || 'Graduation year'} style={styles.majorInput} onChangeText={text => this.setState({ gradYear: text})}  />
            </View>
          </View>

        </View>


      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  navContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'white',
    borderBottomColor: '#F3F3F3',
    padding: 7,
    height: 60,
    justifyContent: 'center'
  },
  doneBtn: {
    position: 'absolute',
    bottom: 10,
    left: 7
  },
  cancelBtn: {
    position: 'absolute',
    bottom: 10,
    right: 7,
  },
  inputContainer: {
    flexDirection: 'row',
    marginLeft: 20
  },
  majorInput: {
    height: 30,
    width: 280,
    marginRight: -50
  },
  bottomBorder:{
    width: 280,
    borderWidth: 1,
    borderColor: 'white',
    borderBottomColor: '#D4D4D4',
    marginRight: -50
  },
  topInputContainer: {
    position: 'absolute',
    top: 100,
    borderWidth: 1,
    borderColor: 'white',
    borderBottomColor: '#F3F3F3',
    paddingBottom: 60,
    width: 400
  },
  title: {
    marginTop: 25,
  }
})

const mapStateToProps = state => ({
  faceBookInfo: state.FacebookDataReducer.faceBookInfo
})


export default connect(mapStateToProps, actions)(EditProfile)
