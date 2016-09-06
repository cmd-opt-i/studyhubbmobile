'use strict'

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { store } from './store'
import { View, Text } from 'react-native'
import Splash from './components/Splash'
import Profile from './containers/Profile'
import Login from './containers/Login'
import Swipe from './containers/Swipe'
import Matches from './containers/Matches'
import Messages from './containers/Messages'

class Root extends Component {
  constructor() {
    super()

    this.state = {
      splash: true
    }
  }

  startApp = () => {
    this.setState({ splash: true })
  }

  componentWillMount() {
    setTimeout(this.startApp, 5000)
  }

  renderRoot(ComponentToRender) {
    return (
      <Provider store={store}>
        <ComponentToRender />
      </Provider>
    )
  }

  render() {
      const { splash } = this.state
      return splash ? this.renderRoot(Messages) : this.renderRoot(Login)
  }
}

export default Root
