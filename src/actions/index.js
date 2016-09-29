'use strict'

import { USER_FB_DATA, IS_FETCHING, PUSH_ROUTE, POP_ROUTE, SEARCH } from '../constants'

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
   (dispatch) => {
    dispatch(dispatch, url, type)
  }
)

/* ---------- Navigation Start ---------- */
export const push = (route) => ({
  type: PUSH_ROUTE,
  route
})

export const pop = () => ({
  type: POP_ROUTE
})

/* --------- Firsebase Start ----------- */
export const storeUserFBData = (userData) => ({
  type: USER_FB_DATA,
  userData
})
// export function getPotentialMatchs(school) {
//   return function(dispatch){
//     firebaseDB.ref('conversation', function(data) {
//       dispatch({type: SEARCH, payload: data})
//     }, function(err) {
//       console.error(err)
//     })
//
//
//
// }
/* --------- Firsebase End ----------- */
