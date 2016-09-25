'use strict'

import React, { Component } from 'react'
import { View, Text, NavigationExperimental } from 'react-native'
const { CardStack: NavigationCardStack } = NavigationExperimental
import Splash from './Splash'
import MyProfile from '../containers/MyProfile'
import Profile from '../containers/Profile'
import Login from '../containers/Login'
import Swipe from '../containers/Swipe'
import Matches from '../containers/Matches'
import Messages from '../containers/Messages'
import Settings from '../containers/Settings'

class Root extends Component {
  constructor (props) {
    super(props)
    this._renderScene = this._renderScene.bind(this)
    this._handleBackAction = this._handleBackAction.bind(this)
  }

  _renderScene (props) {
    const { route } = props.scene
    if (route.key === 'login') return <Login _handleNavigate={this._handleNavigate.bind(this)} />
    if (route.key === 'settings') return <Settings _goback={this._handleBackAction.bind(this)} />
    if (route.key === 'swipe') return <Swipe _handleNavigate={this._handleNavigate.bind(this)} />
    if (route.key === 'myprofile') return <MyProfile _goBack={this._handleBackAction.bind(this)} _handleNavigate={this._handleNavigate.bind(this)} />
    if (route.key === 'profile') return <Profile _goBack={this._handleBackAction.bind(this)} />
    if (route.key === 'messages') return <Messages _goBack={this._handleBackAction.bind(this)} />
    if (route.key === 'matches') return <Matches _handleNavigate={this._handleNavigate.bind(this)} _goBack={this._handleBackAction.bind(this)} />
  }

  _handleBackAction () {
    if (this.props.navigation.index === 0) {
      return false
    }
    this.props.popRoute()
    return true
  }

  _handleNavigate (action) {
    switch (action && action.type) {
      case 'push':
        this.props.pushRoute(action.route)
        return true
      case 'back':
      case 'pop':
        return this._handleBackAction()
      default:
        return false
    }
  }
  render() {
      return (
        <NavigationCardStack
          navigationState={this.props.navigation}
          onNavigate={this._handleNavigate.bind(this)}
          renderScene={this._renderScene}
        />
      )
  }
}

export default Root