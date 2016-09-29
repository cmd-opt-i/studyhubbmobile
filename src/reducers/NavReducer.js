'use strict'

import { PUSH_ROUTE, POP_ROUTE } from '../constants'
import { NavigationExperimental } from 'react-native'
const { StateUtils } = NavigationExperimental

const initialState = {
  index: 0,
  key: 'root',
  routes: [{
   key: 'initRoute',
   title: 'InitRoute'
  }]
}

function NavReducer (state = initialState, action) {
  switch (action.type) {

    case PUSH_ROUTE:
      if (state.routes[state.index].key === (action.route && action.route.key)) return state
    return StateUtils.push(state, action.route)

    case POP_ROUTE:
      if (state.index === 0 || state.routes.length === 1) return state
      return StateUtils.pop(state)

   default:
     return state

  }
}

export default NavReducer
