'use strict'

import { USER_FB_DATA, IS_FETCHING, PUSH_ROUTE, POP_ROUTE, SEARCH } from '../constants'
//import Firebase constant

const dispatcher = (dispatch, url, type) => {
  dispatch({ type: IS_FETCHING, bool: true })
  fetch(url)
    .then(response => {
      const data = response
      dispatch({ type: IS_FETCHING, bool: false })
      dispatch({ type, data })
    })
    .catch(err => console.warn(err))
}

export const fetchData = (url, type) => (
  function (dispatch) {
    dispatch(dispatch, url, type)
  }
)

/* ---------- Navigation Start ---------- */
export function push (route) {
  return {
    type: PUSH_ROUTE,
    route
  }
}

export function pop () {
  return {
    type: POP_ROUTE
  }
}

//export function to get Users
export function getPotentialMatchs() {
  return {
    type: SEARCH,
    
}
//export function to get Groups
//export function to get messages
//export function to write to messages
