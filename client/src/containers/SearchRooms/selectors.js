import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { reducerKey } from './constants';
/**
 * Direct selector to the roomList state domain
 */

const selectSearchRoomsDomain = (state) => state[reducerKey] || initialState;

/**
 * Other specific selectors
 */

const makeSelectSearchRoomsDomain = createSelector(
    selectSearchRoomsDomain,
  (state) => state
);

const makeSelectRooms = createSelector(
    makeSelectSearchRoomsDomain,
  (state) => state.rooms
);

export {
  makeSelectRooms,
};
