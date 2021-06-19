import React, { useEffect } from 'react';
import Item from './item';
import PropTypes from 'prop-types';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { useInjectSaga } from '../../../utils/injectSaga';
import { useInjectReducer } from '../../../utils/injectReducer';
import { reducerKey } from './constants';
import reducer from './reducer';
import saga from './saga';
import * as actions from './actions';
import { makeSelectLocationsAndCountRooms } from './selectors';
import Title from 'containers/HomeContainers/title'
import './styles.css'

const LocationContainers = ({ locations, getLocations }) => {

  useInjectReducer({ key: reducerKey, reducer });
  useInjectSaga({ key: reducerKey, saga });

  useEffect(() => {
    getLocations()
  }, [])

  const settings = {
    lazyload: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToRoll: 1,
    initialSlide: 0
  }

  return (
    <>
      <Title title="Prominent place"
        content="Join Staye to start your journey to conquer the world" />
      <div className="flex relative block">
        <Slider {...settings} className="w-full">
          {locations && locations.map((location) => <Item key={location.id} location={location} />)}
        </Slider>
      </div>
    </>
  );
};

LocationContainers.propTypes = {
  getLocations: PropTypes.func,
  locations: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  locations: makeSelectLocationsAndCountRooms,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getLocations: actions.getLocationsCountRooms,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(LocationContainers);
