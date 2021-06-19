import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';
import { reducerKey } from '../RoomList/constants';
import roomsReducer from '../RoomList/reducer';
import roomsSaga from '../RoomList/saga';
import { makeSelectRooms } from '../RoomList/selectors';
import * as actions from '../RoomList/actions';
import CarouselSlider from '../../components/HomeComponents/HomeCarousel';
import LocationContainers from '../../components/HomeComponents/LocationContainers';
import { LOCATION_CARDS } from './constants';
import Title from './title';
const HomeContainers = ({ getRoom, rooms }) => {
  useInjectReducer({
    key: reducerKey,
    reducer: roomsReducer,
  });
  useInjectSaga({
    key: reducerKey,
    saga: roomsSaga,
  });

  useEffect(() => {
    getRoom();
  }, []);
  return (
    <div className="flex flex-col mx-24 ">
      <CarouselSlider />
      
      <LocationContainers locations={LOCATION_CARDS}></LocationContainers>

      <Title title="Gợi ý khám phá" content="Để mỗi chuyến đi là một hành trình truyền cảm hứng, mỗi căn phòng là một khoảng trời an yên"/>


    </div>
  );
};
HomeContainers.propTypes = {
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
export default compose(withConnect)(HomeContainers);
