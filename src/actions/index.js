'use strict'

import { USER_FB_DATA, IS_FETCHING, PUSH_ROUTE, POP_ROUTE, SEARCH, SAVE_USER, RESET_ROUTE_STATE } from '../constants'

export const fetchData = (url, type) => (
   (dispatch) => {
    dispatch(dispatch, url, type)
  }
)

/* ---------- Navigation Start ---------- */
export const push = (route) => {
  return {
    type: PUSH_ROUTE,
    route
  }
}

export const pop = () => ({
  type: POP_ROUTE
})

export const popLogin = () => ({
  type: RESET_ROUTE_STATE
})

/* --------- Firsebase Start ----------- */
export const storeUserFBData = (userData) => {
  return {
    type: USER_FB_DATA,
    userData
  }
}

export const storeUser = (user) => {

}
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
