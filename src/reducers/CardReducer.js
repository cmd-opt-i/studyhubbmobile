'user strict'

import { GET_CURRENT_CARD } from '../constants'

const CardReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CURRENT_CARD:
      return { ...state, currentCard: action.currentCard}
  }
  return state
}

export default CardReducer
