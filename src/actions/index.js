'use strict'

import { USER_FB_DATA, IS_FETCHING, PUSH_ROUTE, POP_ROUTE, SEARCH, SAVE_USER, RESET_ROUTE_STATE, GET_ALL_USERS, UNSHIFT, GET_CURRENT_CARD } from '../constants'
import { firebaseApp } from '../../index.ios'


/* ---------- Navigation Start ---------- */
export const push = (route) => {
  return {
    type: PUSH_ROUTE,
    route
  }
}

export const isFetching = fetching => ({
    type: IS_FETCHING,
    fetching
})

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

export const setAllUsers = (users, callUnshift) => {

  if (callUnshift) {
    console.log('second');
    return function (dispatch) {
      dispatch({ type: GET_ALL_USERS, allUsers: users})
      dispatch({ type: UNSHIFT, unShift: false })
    }
  } else {
    console.log('first');
    return {
      type: GET_ALL_USERS,
      allUsers: users
    }
  }
}

export const getAllUsers = id => (
  dispatch => (
    firebaseApp.database().ref("/users")
      .ref.once('value')
      .then(snapshot => {
        const allUsers = snapshot.val()
        const result = []
        for(let key in allUsers) {
          if(JSON.parse(allUsers[key].faceBookInfo.id) !== JSON.parse(id)) {
            result.push({ image: allUsers[key].faceBookInfo.picture, info: allUsers[key] })
          }
        }

        dispatch(isFetching(false))
        dispatch(setAllUsers(result, false))
      })
      .catch(err => console.log(err))
  )
)

export const checkForMatchesUnShift = unShift => ({
  type: UNSHIFT,
  unShift
})

//---------------

export const getCurrentCard = card => ({
  type: GET_CURRENT_CARD,
  currentCard: card
})
