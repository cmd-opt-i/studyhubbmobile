import { createStore, compose, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import reducers from './reducers'

const store = createStore(reducers, compose(applyMiddleware(reduxThunk)))

export default store
