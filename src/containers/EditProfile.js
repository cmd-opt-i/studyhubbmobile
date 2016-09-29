import React,{ Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'

const route = {
  type: 'pop',
  route: {
    key: 'myprofile',
    title: 'MyProfile'
  }
}

class EditProfile extends Component {
  render() {
    return(
      <View style={styles.container}>
        <View style={styles.navContainer}>
          <TouchableOpacity style={styles.cancelBtn} onPress={this.props._handleNavigate.bind(null, route)}>
            <Text>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.doneBtn} onPress={this.props._handleNavigate.bind(null, route)}>
            <Text>Done</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.topInputContainer}>
          <View style={styles.inputContainer}>
            <TextInput style={styles.majorInput}  />
          </View>
          <View style={styles.inputContainer}>
            <TextInput />
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
    flexDirection: 'row'
  },
  majorInput: {
    height: 15,
    borderWidth: 1,
    borderColor: 'black',
    borderBottomColor: 'black',
    width: 200,
    marginLeft: 50
  },
  topInputContainer: {
    position: 'absolute',
    top: 400
  }
})

export default EditProfile
