'use strict'

import { USER_FB_DATA, UNSHIFT } from '../constants'

const initialState = {
  unShift: true
}

const FacebookDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_FB_DATA:
      return { ...state, faceBookInfo: action.userData }
    case UNSHIFT:
      return { ...state, unShift: action.unShift }
  }
  return state
}

export default FacebookDataReducer
