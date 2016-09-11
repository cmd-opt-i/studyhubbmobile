'use strict'

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
