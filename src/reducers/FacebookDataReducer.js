'use strict'

import USER_FB_DATA from '../constants'

const FacebookDataReducer = (state = {}, action) {
  switch (action.type) {
    case USER_FB_DATA:
      return { ...state, faceBookInfo: action.data }
  }
  return state
}

export default FacebookDataReducer
