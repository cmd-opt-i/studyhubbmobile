'use strict'

import { SEARCH } from '../constants'

const FirebaseReducer = (state = {}, action) => {
  switch (action.type) {
    case SEARCH:
      return { ...state, FirebaseMessages: action.data }
  }
  return state
}

export default FirebaseReducer
