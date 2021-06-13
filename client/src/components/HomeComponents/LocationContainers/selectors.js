import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { reducerKey } from './constants';

/**
 * Direct selector to the roomList state domain
 */

const selectLocationListDomain = state => state[reducerKey] || initialState;

/**
 * Other specific selectors
 */

const makeSelectLocationListDomain = createSelector(
    selectLocationListDomain,
    state => state
);

const makeSelectLocations = createSelector(
    makeSelectLocationListDomain,
    state => state.locations
);

const makeSelectAmenities = createSelector(
    makeSelectLocationListDomain,
    state => state.amenities
);


const makeSelectLocationsAndCountRooms = createSelector(
    makeSelectLocationListDomain,
    state => state.locationsCountRooms
);

export {
    makeSelectLocations,
    makeSelectLocationsAndCountRooms,
    makeSelectAmenities
};