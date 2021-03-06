import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
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
import Checkout from 'containers/Checkout';
import BookingSuccess from 'containers/BookingSuccess';
import Feedback from 'containers/Feedback';
import Blogs from 'containers/Blogs';
import AdminLocations from 'containers/AdminLocations';
import Team from 'components/Team';
import AdminBookings from 'containers/AdminBookings';
import UserBookings from 'containers/UserBookings';

const App = ({ user, role }) => {
  useInjectReducer({ key: 'global', reducer: globalReducer, mode: DAEMON });

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/admin/:path?">
            {role === 'admin' ? (
              <MainAdmin user={user}>
                <Switch>
                  {/* <Route
                    path="/admin/dashboard"
                    exact
                    component={AdminDashboard}
                  /> */}
                  <Route path="/admin/rooms/" exact component={AdminRooms} />
                  <Route path="/admin/users/" exact component={AdminUsers} />
                  <Route path="/admin/locations" exact component={AdminLocations} />
                  <Route path="/admin/bookings" exact component={AdminBookings} />
                </Switch>
              </MainAdmin>
            ) : (
              <NotFound />
            )}
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
                <Route path="/profile/:id" component={UserProfile} />
                <Route exact path="/user/:id/bookings" component={UserBookings} />
                <Route path="/rooms/:id" component={RoomDetail} />
                <Route path="/search" component={SearchRooms} />
                <Route path="/about" component={About} />
                <Route path="/checkout" component={Checkout}/>
                <Route path="/booking-success" component={BookingSuccess}/>
                <Route path="/contact" component={Feedback}/>
                <Route path="/team" component={Team}/>
                <Route path="/blogs" component={Blogs}/>
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
