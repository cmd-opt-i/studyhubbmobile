'use strict'

import { combineReducers } from 'redux'
import UIReducer from './UIReducer'
import NavReducer from './NavReducer'
import FirebaseReducer from './FirebaseReducer'
import FacebookDataReducer from './FacebookDataReducer'


const reducers = combineReducers({
  UIReducer,
  NavReducer,
  FirebaseReducer,
  FacebookDataReducer
})

export default reducers
