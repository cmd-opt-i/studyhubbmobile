import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'
import reduxThunk from 'redux-thunk'

const createStoreWithMW = applyMiddleware(reduxThunk)(createStore)
export const store = createStoreWithMW(reducers)
