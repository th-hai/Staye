import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { reducerKey } from './constants';
import get from 'lodash/fp/get';
/**
 * Direct selector to the roomList state domain
 */

const selectRoomDomain = state => state[reducerKey] || initialState;

/**
 * Other specific selectors
 */

const makeSelectRoomDomain = createSelector(
    selectRoomDomain,
    state => state
);

const makeSelectRoom = createSelector(
    makeSelectRoomDomain,
    state => state.room
);
const makeSelectRoomModal = createSelector(
    makeSelectRoomDomain,
    get('roomModal')
  );
  
  const makeSelectRoomModalVisible = createSelector(
    makeSelectRoomModal,
    get('visible')
  );

export {
    makeSelectRoom,
    makeSelectRoomModal,
    makeSelectRoomModalVisible
};