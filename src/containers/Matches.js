import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, ListView, TextInput, Dimensions, TouchableOpacity } from 'react-native'

const users = [
  {
    name: 'Michelle',
    last: 'Marley',
    picture: '/Users/freddiecabrera/Desktop/studyhubbmobile/assets/girl5.jpg',
    time: '7:30 a.m.',
    message: 'New message',
    match: 'New Match'
  },
  {
    name: 'Fred',
    last: 'Jenner',
    picture: '/Users/freddiecabrera/Desktop/studyhubbmobile/assets/guy1.jpg',
    time: '7:30 a.m.'
  },
  {
    name: 'Faith',
    last: 'Marley',
    picture: '/Users/freddiecabrera/Desktop/studyhubbmobile/assets/girl4.jpg',
    time: '7:30 a.m.'
  },
  {
    name: 'Bienne',
    last: 'Ocean',
    picture: '/Users/freddiecabrera/Desktop/studyhubbmobile/assets/girl3.jpg',
    time: '7:30 a.m.'
  },
  {
    name: 'Kyle',
    last: 'Hadid',
    picture: '/Users/freddiecabrera/Desktop/studyhubbmobile/assets/guy2.jpg',
    time: '7:30 a.m.'
  },
  {
    name: 'Kanye',
    last: 'West',
    picture: 'https://pbs.twimg.com/profile_images/585565077207678977/N_eNSBXi_400x400.jpg',
    time: '7:30 a.m.'
  },
  {
    name: 'Zlatan',
    last: 'Ibrahimovic',
    picture: 'https://pbs.twimg.com/profile_images/740059179021258752/3MHiHAo__400x400.jpg',
    time: '7:30 a.m.'
  },
  {
    name: 'Elon',
    last: 'Musk',
    picture: 'https://pbs.twimg.com/profile_images/718273532438966274/j0h7TkOS_400x400.jpg',
    time: '7:30 a.m.'
  }
]

const route = {
  type: 'push',
  route: {
    key: 'messages',
    title: 'Messages'
  }
}

class Matches extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(users)
    };
  }
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.navIcons}>
          <TouchableOpacity style={styles.bookIconButton} onPress={this.props._goBack}>
            <Image source={require('../../assets/gray-book.png')} style={styles.bookIcon} />
          </TouchableOpacity>
          <Image source={require('../../assets/green-chat.png')} style={styles.chatIcon} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.searchInput} placeholder={"Study Buddies"} />
        </View>
        <Text style={{color: '#28CF9B', fontSize: 15, fontFamily: 'Tabarra Black', marginTop: 20, marginLeft: 20}}>Study Buddies</Text>
        <ListView
          style={{marginTop: 20}}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => (
            <TouchableOpacity onPress={this.props._handleNavigate.bind(null, route)} style={{height: 100, borderWidth: 1, borderColor: 'white', borderBottomColor: '#F3F3F3', backgroundColor: 'white', flexDirection: 'row', alignItems: 'center'}}>
                <Image style={styles.image} source={{uri: rowData.picture}}/>
                <Text style={{marginLeft: 10}}>{rowData.name}</Text>
                {rowData.message ? <View style={{height: 11, overflow: 'hidden', backgroundColor: '#28CF9B', margin: 5, borderWidth: 1, borderColor: '#28CF9B', borderRadius: 2, alignItems: 'center'}}><Text style={{backgroundColor: 'transparent', fontSize: 8, color: 'white'}}>{rowData.message}</Text></View> : null}
                {rowData.match ? <View style={{height: 11, overflow: 'hidden', backgroundColor: '#28CF9B', margin: 5, borderWidth: 1, borderColor: '#28CF9B', borderRadius: 2, alignItems: 'center'}}><Text style={{backgroundColor: 'transparent', fontSize: 8, color: 'white'}}>{rowData.match}</Text></View> : null}
                <Text style={{position: 'absolute', top: 5, right: 10, color: '#D7D7DD'}}>{rowData.time}</Text>
            </TouchableOpacity>
          )}
        />
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
    padding: 7
  },
  bookIconButton: {
    position: 'absolute',
    left: 28
  },
  bookIcon: {
    height: 28,
    width: 28
  },
  chatIcon: {
    height: 30,
    width: 30
  },
  inputContainer: {
    marginLeft: 12,
    backgroundColor: 'white'
  },
  searchInput: {
    height: 40,
    borderColor: '#F3F3F3',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: '#F3F3F3',
    width: 350,
    padding: 10,
    paddingLeft: 15
  },
  image: {
    height: 60,
    borderRadius: 30,
    width: 60,
    marginLeft: 10
  }
})
export default Matches
