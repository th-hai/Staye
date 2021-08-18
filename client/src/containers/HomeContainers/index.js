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
import HomeServices from '../../components/HomeComponents/HomeServices';
import HomeHero from 'components/HomeComponents/HomeHero';
import Testimonial from 'components/HomeComponents/Testimonial';
import HomeBlogs from 'components/HomeComponents/HomeBlogs';
import { LOCATION_CARDS } from './constants';
import Title from './title';
import FavouriteRooms from 'components/HomeComponents/FavouriteRooms';

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
    <section>
      <h1 className="absolute font-thin italic left-5 md:text-3xl text-white text-xl top-96">
          “Your dream vacation start here”
      </h1>
      <img className="w-screen object-cover object-center" style={{height: "25rem"}} src="https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1393&q=80" alt="content" />
      <div className="flex flex-col mx-24 ">
        {/* <CarouselSlider /> */}
        <LocationContainers locations={LOCATION_CARDS}></LocationContainers>
        <Title title="Our advantages" content="You can rely on our experience and the quality of services we provide. Here are other reasons to book tours at ExploreTour."/>
        <Testimonial />
        <FavouriteRooms/>
        <HomeServices />
        <HomeHero />
        <HomeBlogs />

        {/* <section className="px-4 py-24 mx-auto max-w-7xl">
    <div className="w-full mx-auto md:w-5/6">
      <div className="text-left md:text-center">
        <p className="mb-8 text-xs font-bold tracking-widest text-purple-800 uppercase">Why Companies Love Us</p>
        <h1 className="mb-10 font-serif text-xl italic font-thin text-gray-800 md:leading-snug md:text-3xl">
          “Where cozy memory lasts”
        </h1>
      </div>
    </div>
  </section> */}

      </div>
    </section>

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
