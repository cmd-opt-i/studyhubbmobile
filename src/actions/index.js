'use strict'

import { USER_FB_DATA, IS_FETCHING, PUSH_ROUTE, POP_ROUTE, SEARCH, SAVE_USER, RESET_ROUTE_STATE, GET_ALL_USERS } from '../constants'
import { firebaseApp } from '../../index.ios'


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

const setAllUsers = users => ({
  type: GET_ALL_USERS,
  allUsers: users
})

export const getAllUsers = id => (
  dispatch => (
    firebaseApp.database().ref("/users")
      .ref.once('value')
      .then(snapshot => {
        const allUsers = snapshot.val()
        const result = []

        for(let key in allUsers) {
          if(JSON.parse(allUsers[key].id) !== JSON.parse(id)) {
            result.push({ image: allUsers[key].faceBookInfo.picture, info: allUsers[key] })
          }
        }
        dispatch(isFetching(false))
        dispatch(setAllUsers(result))
      })
      .catch(err => console.log(err))
  )
)
