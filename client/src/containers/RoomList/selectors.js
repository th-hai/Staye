import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { reducerKey } from './constants';
import get from 'lodash/fp/get';
/**
 * Direct selector to the roomList state domain
 */

const selectRoomListDomain = state => state[reducerKey] || initialState;

/**
 * Other specific selectors
 */

const makeSelectRoomListDomain = createSelector(
    selectRoomListDomain,
    state => state
);

const makeSelectRooms = createSelector(
    makeSelectRoomListDomain,
    state => state.rooms
);
const makeSelectRoomModal = createSelector(
    makeSelectRoomListDomain,
    get('roomModal')
  );
  
  const makeSelectRoomModalVisible = createSelector(
    makeSelectRoomModal,
    get('visible')
  );

export {
    makeSelectRooms,
    makeSelectRoomModal,
    makeSelectRoomModalVisible
};