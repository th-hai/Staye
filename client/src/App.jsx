import React from 'react'
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom'
import './App.css'
import MainLayout from 'components/layout/MainLayout'
import MainAdmin from 'components/layout/MainAdmin'
import FeedBack from 'containers/FeedBack/index'
import RoomList from 'containers/RoomList'
import Register from 'containers/Register'
import Page404 from 'containers/Page404/index'
import Dashboard from 'containers/Dashboard'

const App = () => {
  return (
    <>
      <BrowserRouter>
      <Switch>
        
        <Route path="/admin">
          <Dashboard/>
        </Route>

        <Route path="/">
          <MainLayout>
            <Route path="/" component={RoomList} />
            <Route path="/404" component={Page404} />
            <Route path="/feedback" component={FeedBack} />
            <Route path="/register" component={Register} />
          </MainLayout>
        </Route>

      </Switch>
      </BrowserRouter>
    </>
  )
}

export default App
