import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import * as actions from './actions';
import { reducerKey } from './constants';
import { makeSelectRooms } from './selectors';
import { routerActions } from 'connected-react-router';
import { Link} from "react-router-dom";
export function RoomList({ getRoom, rooms }) {
  useInjectReducer({ key: reducerKey, reducer });
  useInjectSaga({ key: reducerKey, saga });

  useEffect(() => {
    getRoom();
    console.log(rooms);
  }, []);
  return <div>
    <Link to="/login">About</Link>

  </div>;
}
RoomList.propTypes = {
  getRoom: PropTypes.func,
  rooms: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  rooms: makeSelectRooms,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getRoom: actions.getRoom,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(RoomList);
