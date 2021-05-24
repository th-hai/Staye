import React from 'react'
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom'
import './App.css'
import MainLayout from 'components/layout/MainLayout'
import MainAdmin from 'components/layout/MainAdmin'
import FeedBack from 'containers/FeedBack/index'
import RoomList from 'containers/RoomList'
import Page404 from 'containers/Page404/index'
import AdminLayout from "components/layout/Admin";
import AuthLayout from "components/layout/Auth";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";


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
            <Route path="/" component={RoomList} />
            <Route path="/404" component={Page404} />
            <Route path="/feedback" component={FeedBack} />
          </MainLayout>
        </Route>

      </Switch>
      </BrowserRouter>
    </>
  )
}

export default App
