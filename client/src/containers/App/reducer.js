/* eslint-disable default-case, no-param-reassign */
import produce from 'immer';
import {
  LOGIN,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT,
  UPDATE_USER,
  UPDATE_USER_FAILED,
  UPDATE_USER_SUCCESS,
} from './constants';
import {
  getJwt,
  getUser,
  removeJwt,
  removeUser,
  storeJwt,
  storeUser,
} from '../../utils/authUtils';

const initialState = {
  pending: false,
  jwt: getJwt(),
  user: getUser(),
};

const globalReducer = (state = initialState, action) =>
  produce(state, (draftState) => {
    switch (action.type) {
      case LOGIN:
        draftState.pending = true;
        draftState.jwt = undefined;
        draftState.user = undefined;
        removeJwt();
        removeUser();
        break;
      case LOGIN_SUCCESS:
        draftState.pending = false;
        draftState.jwt = action.jwt;
        draftState.user = action.user;
        storeJwt(action.jwt);
        storeUser(action.user);
        break;
      case LOGIN_FAILED:
        draftState.pending = false;
        draftState.jwt = undefined;
        draftState.user = undefined;
        removeJwt();
        removeUser();
        break;
      case LOGOUT:
        draftState.pending = false;
        draftState.jwt = undefined;
        draftState.user = undefined;
        removeJwt();
        removeUser();
        break;
      case UPDATE_USER:
        draftState.pending = true;
        break;
      case UPDATE_USER_SUCCESS:
        draftState.pending = false;
        draftState.user = action.user
        draftState.error = null;
        storeUser(action.user)
        break;
      case UPDATE_USER_FAILED:
        draftState.pending = false;
        draftState.error = action.error;
        break;
    }
  });

export default globalReducer;
