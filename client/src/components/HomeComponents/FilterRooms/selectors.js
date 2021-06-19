import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { reducerKey } from './constants';
/**
 * Direct selector to the roomList state domain
 */

const selectFilterRoomsDomain = state => state[reducerKey] || initialState;

/**
 * Other specific selectors
 */

const makeSelectFilterRoomsDomain = createSelector(
    selectFilterRoomsDomain,
    state => state
);

const makeSelectLocations = createSelector(
    makeSelectFilterRoomsDomain,
    state => state.locations
);

const makeSelectRooms = createSelector(
    makeSelectFilterRoomsDomain,
    state => state.rooms
);

export {
    makeSelectLocations,
    makeSelectRooms,
};