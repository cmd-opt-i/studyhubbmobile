'use strict'
import { IS_FETCHING } from '../constants'

const UIReducer = (state = {}, action) => {
  switch (action.type) {
    case IS_FETCHING:
      return { ...state, fetching: action.fetching }
  }
  return state
}

export default UIReducer
