'use strict'

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { store } from './store'
import { View, Text } from 'react-native'
import Splash from './components/Splash'
import Profile from './containers/Profile'

class Root extends Component {
  constructor() {
    super()

    this.state = {
      splash: false
    }
  }

  startApp = () => {
    console.warn('hit')
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
      return splash ? this.renderRoot(Profile) : this.renderRoot(Splash)
  }
}

export default Root
