'use strict'

import { combineReducers } from 'redux'
import UIReducer from './UIReducer'
import NavReducer from './NavReducer'


const reducers = combineReducers({
  UIReducer,
  NavReducer
})

export default reducers
