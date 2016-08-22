'use strict'

import { USER_FB_DATA, IS_FETCHING } from '../constants'

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
