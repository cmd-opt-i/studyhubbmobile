'use strict'

import { PUSH_ROUTE, POP_ROUTE, RESET_ROUTE_STATE } from '../constants'
import { NavigationExperimental } from 'react-native'
const { StateUtils } = NavigationExperimental

const initialState = {
  index: 0,
  key: 'root',
  routes: [{
   key: 'login',
   title: 'Login'
  }]
}

function NavReducer (state = initialState, action) {
  switch (action.type) {

    case PUSH_ROUTE:
    console.log('hit route');
      if (state.routes[state.index].key === (action.route && action.route.key)) return state
    return StateUtils.push(state, action.route)

    case POP_ROUTE:
      if (state.index === 0 || state.routes.length === 1) return state
      return StateUtils.pop(state)

    case RESET_ROUTE_STATE:
      return initialState
   default:
     return state

  }
}

export default NavReducer
