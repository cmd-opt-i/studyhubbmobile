'use strict'

import { USER_FB_DATA } from '../constants'

const FacebookDataReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_FB_DATA:
    console.log('hit with data: ', action.userData);
      return { ...state, faceBookInfo: action.userData }
  }
  return state
}

export default FacebookDataReducer
