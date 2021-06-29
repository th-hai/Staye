import React, { useEffect } from 'react';
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

      <section class="px-4 py-24 mx-auto max-w-7xl">
  <div class="w-full mx-auto md:w-5/6">
    <div class="text-left md:text-center">
      <p class="mb-8 text-xs font-bold tracking-widest text-purple-800 uppercase">Why Companies Love Us</p>
      <h1 class="mb-10 font-serif text-xl italic font-thin text-gray-800 md:leading-snug md:text-3xl">
        “Xã hội này, có làm thì mới có ăn”
      </h1>
    </div>
    <div class="flex items-center justify-start md:justify-center">
      <div class="avatar w-24 h-24 rounded"><img className="rounded-lg" src="https://scontent-sin6-4.xx.fbcdn.net/v/t1.6435-9/164915337_3603755649752905_4424169673399860630_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=K_I2OGkYN7kAX9uJ5Q5&_nc_ht=scontent-sin6-4.xx&oh=c10fa673fbfbe8c6e7432a26d221a734&oe=60D4C813" alt="Praveen Juge" /></div>
      <div class="ml-4">
        <p class="mb-1 text-xs font-semibold tracking-widest text-gray-800 uppercase">Quang Le</p>
        <p class="text-xs font-semibold tracking-widest text-gray-500 uppercase">CEO, Staye</p>
      </div>
    </div>
  </div>
</section>

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
