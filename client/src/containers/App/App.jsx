import React from 'react'
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom'
import MainLayout from 'components/layout/MainLayout'
import RoomList from 'containers/RoomList'
import 'App.css'
import SignIn from '../SignIn';
import Register from '../Register';
import HomeContainers from 'containers/HomeContainers'

const App = () => {
  return (
    <>
      <BrowserRouter>
      <Switch>

        <Route path="/">
        <MainLayout>
          <Switch>
            <Route path="/" exact component={HomeContainers} />
            <Route path="/roomlist" component={RoomList} />
            <Route path="/login" component={SignIn} />
            <Route path="/register" component={Register}/>
          </Switch>
        </MainLayout>
      </Route>

      </Switch>
      </BrowserRouter>
    </>
  )
}

export default App;
