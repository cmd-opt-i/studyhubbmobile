'use strict'

import { combineReducers } from 'redux'
import UIReducer from './UIReducer'
import NavReducer from './NavReducer'
import FirebaseReducer from './firebaseReducer'
import FacebookDataReducer from './FacebookDataReducer'
import CardReducer from './CardReducer'


const reducers = combineReducers({
  UIReducer,
  NavReducer,
  FirebaseReducer,
  FacebookDataReducer,
  CardReducer
})

export default reducers
