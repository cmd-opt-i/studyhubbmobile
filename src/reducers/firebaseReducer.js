'use strict'

import { SEARCH, GET_ALL_USERS } from '../constants'

const FirebaseReducer = (state = {}, action) => {
  switch (action.type) {
    case SEARCH:
      return { ...state, FirebaseMessages: action.data }
    case GET_ALL_USERS:
      return { ...state, allUsers: action.allUsers}
  }
  return state
}

export default FirebaseReducer
