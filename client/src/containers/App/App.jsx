import React from 'react'
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom'
import MainLayout from 'components/layout/MainLayout'
import MainAdmin from 'components/layout/MainAdmin'
import RoomList from 'containers/RoomList'
import AdminLayout from "components/layout/Admin";
import AuthLayout from "components/layout/Auth";
import '../../../src/App.css'
import SignIn from '../SignIn';
import Register from '../Register';
import HomeContainers from 'containers/HomeContainers'

const App = () => {
  return (
    <>
      <BrowserRouter>
      <Switch>
        
        <Route path="/admin">
          <MainAdmin>
            <Switch>
              <Route path="/" render={(props) => <AdminLayout {...props} />} />
              <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
            </Switch> 
          </MainAdmin>
        </Route>

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
