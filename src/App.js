import React from 'react'
import configureStore from './store'
import NavRootContainer from './containers/NavRootContainer'
import { Provider } from 'react-redux'
const store = configureStore()

const App = () => (
  <Provider store={store}>
    <NavRootContainer />
  </Provider>
)

export default App
