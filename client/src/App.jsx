import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button } from 'antd'
import './App.css'
import MainLayout from './app/components/Layout/MainLayout'
import FeedBack from './app/containers/FeedBack/index'
import RoomList from './app/containers/RoomList'



const App = () => {
  return (
    <>
      <Switch>
        <Route path="/">
          <MainLayout>
            <Route path="/" component={RoomList} />
            <Route path="/Feedback" component={FeedBack} />
          </MainLayout>
        </Route>
      </Switch>
    </>
  )
}

export default App
