import React, { lazy } from 'react'
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom'
import MainLayout from 'components/layout/MainLayout'
import RoomList from 'containers/RoomList'
import 'App.css'
import SignIn from 'containers/SignIn';
import Register from 'containers/Register';
import HomeContainers from 'containers/HomeContainers'
import AccessibleNavigationAnnouncer from 'components/AccessibleNavigationAnnouncer'

const Layout = lazy(() => import('components/layout/Layout'))
const Login = lazy(() => import('pages/Login'))
const CreateAccount = lazy(() => import('pages/CreateAccount'))
const ForgotPassword = lazy(() => import('pages/ForgotPassword'))

const App = () => {
  return (
    <>
      <BrowserRouter>
      <AccessibleNavigationAnnouncer />
      <Switch>
        
        {/* <Route path="/login" component={Login} />  */}
        <Route path="/create-account" component={CreateAccount} />
        <Route path="/forgot-password" component={ForgotPassword} />
        {/* Place new routes over this */}
        <Route path="/admin" component={Layout} />
        {/* If you have an index page, you can remothis Redirect */}
        {/* <Redirect exact from="/" to="/login" /> */}

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
