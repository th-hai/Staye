import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import MainLayout from './app/components/Layout/MainLayout'

const App = ({ loading }) => {
  return (
    <>
      <Switch>
        <Route path="/" component={MainLayout}>
        </Route>
        <MainLayout>

        </MainLayout>
      </Switch>
    </>
  )
}

export default connect(state => ({
  loading: state.common.loading
}))(App)
