'use strict'

import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyDWDKRGa7XOWC2cldQfDSjlWvcmSMjvMrQ",
  authDomain: "study-hubb.firebaseapp.com",
  databaseURL: "https://study-hubb.firebaseio.com",
  storageBucket: "study-hubb.appspot.com",
  messagingSenderId: "102354110046"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

import React from 'react'
import { Provider } from 'react-redux'
import configureStore from './src/store'
import NavRootContainer from './src/containers/NavRootContainer'
import { AppRegistry } from 'react-native'

const store = configureStore()

const App = () => (
  <Provider store={store}>
    <NavRootContainer />
  </Provider>
)

AppRegistry.registerComponent('studyhubbmobile', () => App)
