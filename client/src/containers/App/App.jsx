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
import RoomDetail from 'containers/RoomDetail';
import SearchRooms from 'containers/SearchRooms';
import AdminUsers from 'containers/AdminUsers';
import About from 'containers/PageAbout';
import NotFound from 'containers/Page404';
import UserProfile from 'containers/UserProfile';
import ForgotPassword from 'containers/ForgotPassword';
import ResetPassword from 'containers/ResetPassword';

const App = ({ user, role }) => {
  useInjectReducer({ key: 'global', reducer: globalReducer, mode: DAEMON });

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/admin/:path?">
            <MainAdmin user={user}>
              <Switch>
                <Route
                  path="/admin/dashboard"
                  exact
                  component={AdminDashboard}
                />
                <Route path="/admin/rooms/" exact component={AdminRooms} />
                <Route path="/admin/users/" exact component={AdminUsers} />
              </Switch>
            </MainAdmin>
          </Route>

          <Route path="/">
            <MainLayout user={user} role={role}>
              <Switch>
                <Route path="/" exact component={HomeContainers} />
                <Route path="/roomlist" component={RoomList} />
                <Route path="/login" component={SignIn} />
                <Route path="/register" component={Register} />
                <Route path="/forgot-password" component={ForgotPassword}/>
                <Route path="/reset-password" component={ResetPassword}/>
                <Route path="/profile/:id"component={UserProfile} />
                <Route path="/rooms/:id" component={RoomDetail} />
                <Route path="/search" component={SearchRooms} />
                <Route path="/about" component={About} />
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
  role: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  role: makeSelectRole(),
});

export default connect(mapStateToProps)(App);
