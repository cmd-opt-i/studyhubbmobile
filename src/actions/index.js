'use strict'

import { USER_FB_DATA, IS_FETCHING, PUSH_ROUTE, POP_ROUTE, SEARCH } from '../constants'
import firebaseDB from "../firebase"

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

/* --------- Firsebase actions ----------- */
export function getPotentialMatchs(school) {
  return function(dispatch){
    firebaseDB.ref('conversation', function(data) {
      dispatch({type: SEARCH, payload: data})
    }, function(err) {
      console.error(err)
    })



}
//export function to get Groups
//export function to get messages
//export function to write to messages
