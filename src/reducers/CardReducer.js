'user strict'

import { GET_CURRENT_CARD, CURRENT_STUDY_BUDDY } from '../constants'

const CardReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CURRENT_CARD:
      return { ...state, currentCard: action.currentCard }
    case CURRENT_STUDY_BUDDY:
      return { ...state, currentStudyBuddy: action.currentStudyBuddy }
  }
  return state
}

export default CardReducer
