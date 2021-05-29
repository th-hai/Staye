import React, { useEffect } from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import MainLayout from 'components/layout/MainLayout';
import RoomList from 'containers/RoomList';
import 'App.css';
import SignIn from '../SignIn';
import Register from '../Register';
import HomeContainers from 'containers/HomeContainers';
import { useInjectReducer } from 'utils/injectReducer';
import globalReducer from './reducer';
import { DAEMON } from '../../utils/constants';
import { makeSelectUser } from './selectors';
const App = ({ user }) => {
  useInjectReducer({ key: 'global', reducer: globalReducer, mode: DAEMON });

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <MainLayout user={user}>
              <Switch>
                <Route path="/" exact component={HomeContainers} />
                <Route path="/roomlist" component={RoomList} />
                <Route path="/login" component={SignIn} />
                <Route path="/register" component={Register} />
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
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

export default connect(mapStateToProps)(App);
