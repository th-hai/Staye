import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { makeSelectRole, makeSelectUser } from './selectors';
import { useInjectReducer } from 'utils/injectReducer';
import { DAEMON } from 'utils/constants';
import globalReducer from './reducer';
import 'App.css';
// Layouts
import MainLayout from 'components/layout/MainLayout';
import MainAdmin from 'components/layout/MainAdmin';
// Containers
import HomeContainers from 'containers/HomeContainers';
import SignIn from 'containers/SignIn';
import Register from 'containers/Register';
import RoomList from 'containers/RoomList';
import AdminDashboard from 'containers/AdminDashboard';
import AdminRooms from 'containers/AdminRooms';
import RoomDetail from 'containers/RoomDetail'
import NotFound from 'containers/Page404'

const App = ({ user, role }) => {
  useInjectReducer({ key: 'global', reducer: globalReducer, mode: DAEMON });

  return (
    <>
      <BrowserRouter>
        <Switch>

          <Route path="/admin/:path?"> 
              <MainAdmin>
                <Switch>
                  <Route path="/admin/dashboard" exact component={AdminDashboard} />  
                  <Route path="/admin/rooms/" exact component={AdminRooms}/>
                </Switch>
              </MainAdmin>
          </Route>

          <Route path="/">
            <MainLayout user={user} role={role} >
              <Switch>
                <Route path="/" exact component={HomeContainers} />
                <Route path="/roomlist" component={RoomList} />
                <Route path="/login" component={SignIn} />
                <Route path="/register" component={Register} />
                <Route path="/rooms/:id" component={RoomDetail} />
                <Route path="*" component={NotFound} />
              </Switch>
            </MainLayout>
          </Route>

        </Switch>
      </BrowserRouter>
    </>
  );
};

App.propTypes = {
  user: PropTypes.object,
  role: PropTypes.string
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  role: makeSelectRole()
});

export default connect(mapStateToProps)(App);
