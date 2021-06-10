import React, { useEffect } from 'react';
import Item from './item';
import PropTypes from 'prop-types';
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

const LocationContainers = ({ locations, getLocations }) => {

  useInjectReducer({ key: reducerKey, reducer });
  useInjectSaga({ key: reducerKey, saga });

  useEffect(() => {
    getLocations()
  }, [])
  
  return (
    <>
      <Title title="Prominent place" 
            content="Join Staye to start your journey to conquer the world"/>
      <div className="w-full flex justify-center">
        <div className="grid lg:grid-cols-6 sm:grid-cols-3 w-full gap-4">
          {locations &&
            locations.map((location) => <Item key={location.id} location={location} />)}
        </div>
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
