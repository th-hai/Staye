import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import Login from './Component/Login/index'

import './App.css'

const App = ({ loading }) => {
  return (
    <>
      <Switch>
      <Route exact path="/login.html" component={Login}>
              </Route>
       
      </Switch>
    </>
  )
}

export default connect(state => ({
  loading: state.common.loading
}))(App)
