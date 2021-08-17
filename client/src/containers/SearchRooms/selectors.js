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

const makeSelectSearchRoomsResult = createSelector(
    makeSelectSearchRoomsDomain,
  (state) => state.roomsResult
);

const makeSelectSortBy = createSelector(
  makeSelectSearchRoomsDomain,
  (state) => state.sortBy
)
export {
  makeSelectSearchRoomsResult,
  makeSelectSortBy
};
