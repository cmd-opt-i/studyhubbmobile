'use strict'

import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store'
import { View, Text } from 'react-native'

const Root = React.createClass({
  render() {
    return (
      <View>
        <Text>Study Hubb</Text>
      </View>
    )
  }
})

export default Root
