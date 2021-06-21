import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { reducerKey } from './constants';
import get from 'lodash/fp/get';
/**
 * Direct selector to the roomList state domain
 */

const selectRoomListDomain = (state) => state[reducerKey] || initialState;

/**
 * Other specific selectors
 */

const makeSelectRoomListDomain = createSelector(
  selectRoomListDomain,
  (state) => state
);

const makeSelectRooms = createSelector(
  makeSelectRoomListDomain,
  (state) => state.rooms
);
const makeSelectRoomModal = createSelector(
  makeSelectRoomListDomain,
  get('roomModal')
);

const makeSelectRoomsAutoComplete = createSelector(
  makeSelectRoomListDomain,
  (state) => state.roomsAutocomplete
);

const makeSelectRoomModalVisible = createSelector(
  makeSelectRoomModal,
  get('visible')
);

const makeSelectPhotoUrls = createSelector(
  makeSelectRoomListDomain,
  (state) => state.photoUrls
);

const makeSelectOwners = createSelector(
  makeSelectRoomListDomain,
  (state) => state.owners
);

const makeSelectUsers= createSelector(
  makeSelectRoomListDomain,
  (state) => state.users
);
export {
  makeSelectRooms,
  makeSelectRoomModal,
  makeSelectRoomModalVisible,
  makeSelectRoomsAutoComplete,
  makeSelectPhotoUrls,
  makeSelectOwners,
  makeSelectUsers
};
