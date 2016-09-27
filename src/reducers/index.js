'use strict'

import { combineReducers } from 'redux'
import UIReducer from './UIReducer'
import NavReducer from './NavReducer'
import FirebaseReducer from './FirebaseReducer'


const reducers = combineReducers({
  UIReducer,
  NavReducer,
  FirebaseReducer
})

export default reducers
