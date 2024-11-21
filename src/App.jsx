import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Router from './routes'
import { Provider } from "react-redux"
import store from "./redux/store"

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Router />
      </Provider>
    </NavigationContainer>
  )
}

export default App