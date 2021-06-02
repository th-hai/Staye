import React, { useEffect } from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import MainLayout from 'components/layout/MainLayout';
import RoomList from 'containers/RoomList';
import ForgotPassword from '../ForgotPassword';
import 'App.css';
import SignIn from '../SignIn';
import Register from '../Register';
import HomeContainers from 'containers/HomeContainers';
import { useInjectReducer } from 'utils/injectReducer';
import globalReducer from './reducer';
import { DAEMON } from '../../utils/constants';
import { makeSelectRole, makeSelectUser } from './selectors';
import MainAdmin from 'components/layout/MainAdmin';
import AdminDashboard from 'containers/AdminDashboard';
import AdminRooms from 'containers/AdminRooms';
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
                <Route path="/forgotpassword" component={ForgotPassword} />
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
