import React,{ Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image, DeviceEventEmitter, Animated, Keyboard } from 'react-native'
import { firebaseApp } from '../../index.ios'

const route = {
  type: 'pop',
  route: {
    key: 'myprofile',
    title: 'MyProfile'
  }
}

class EditProfile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      keyboardOffset: new Animated.Value(0),
    }
  }

  saveUser() {
    const { major, bio, gradYear, age } = this.state
    console.log('from saveuser', this.props);
    const { faceBookInfo } = this.props
    firebaseApp.database().ref('/users/' + faceBookInfo.id).set({
      name: faceBookInfo.name,
      age,
      email: faceBookInfo.email,
      major,
      bio,
      gradYear,
      faceBookInfo
    })
    this.props.handleNavigate(route)
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

    console.log('componentWillMount', this.props);

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
          <TouchableOpacity style={styles.cancelBtn} onPress={this.props._handleNavigate.bind(null, route)}>
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
              <TextInput placeholder='Major' style={styles.majorInput} onChangeText={text => this.setState({ major: text })} />
            </View>
          </View>

          <View style={[styles.inputContainer, {marginTop: 20}]}>
            <Image style={{height: 25, width: 25, marginRight: 15, marginBottom: -3}} source={require('../../assets/information.png')} />
            <View style={styles.bottomBorder}>
              <TextInput placeholder='Bio' style={styles.majorInput} onChangeText={text => this.setState({ bio: text})}  />
            </View>
          </View>

          <View style={[styles.inputContainer, {marginTop: 20}]}>
            <Image style={{height: 25, width: 25, marginRight: 15, marginBottom: -3}} source={require('../../assets/balloons.png')} />
            <View style={styles.bottomBorder}>
              <TextInput placeholder='Age' style={styles.majorInput} onChangeText={text => this.setState({ age: text})}  />
            </View>
          </View>

          <View style={[styles.inputContainer, {marginTop: 20}]}>
            <Image style={{height: 25, width: 25, marginRight: 15, marginBottom: -3}} source={require('../../assets/gradcap.png')} />
            <View style={styles.bottomBorder}>
              <TextInput placeholder='Graduation year' style={styles.majorInput} onChangeText={text => this.setState({ gradYear: text})}  />
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
});


export default connect(mapStateToProps, actions)(EditProfile)
