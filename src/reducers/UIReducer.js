'use strict'
import { IS_FETCHING, HIDE_LOGIN } from '../constants'

const initState = {
  hideLoginButton: true
}

const UIReducer = (state = {}, action) => {
  switch (action.type) {
    case IS_FETCHING:
      return { ...state, fetching: action.fetching }
    case HIDE_LOGIN:
      return { ...state, hideLoginButton: action.show }
  }
  return state
}

export default UIReducer
