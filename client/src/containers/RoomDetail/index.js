import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';
import { reducerKey } from './constants';
import { makeSelectRoom } from './selectors';
import { useParams } from "react-router-dom";
import reducer from './reducer';
import saga from './saga';
import * as actions from './actions';
import CarouselSlider from 'components/Carousel';
import RoomContent from 'components/Rooms/RoomContent'
import NotFound from 'containers/Page404'
import globalReducer from 'containers/App/reducer';
import { makeSelectUser } from 'containers/App/selectors';
import { DAEMON } from 'utils/constants';

export function RoomDetail({ getRoom, room, user }) {
  useInjectReducer({ key: 'global', reducer: globalReducer, mode: DAEMON });
  const { id } = useParams();

  useInjectReducer({ key: reducerKey, reducer });
  useInjectSaga({ key: reducerKey, saga });

  useEffect(() => {
    getRoom(id);
  }, [id]);

  return <>
    {room && room.id ? (
      <div className="mt-8 mx-24">
        <CarouselSlider photos={room.photos} />
        <RoomContent room={room} user={user}/>
      </div>
    ) : (<NotFound/>) }
  </>;
}

RoomDetail.propTypes = {
  getRoom: PropTypes.func,
  room: PropTypes.object,
  user: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
  room: makeSelectRoom,
  user: makeSelectUser(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getRoom: actions.getRoom,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(RoomDetail);
