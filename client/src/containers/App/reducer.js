/* eslint-disable default-case, no-param-reassign */
import produce from 'immer';
import { LOGIN, LOGIN_FAILED, LOGIN_SUCCESS, LOGOUT } from './constants';
import { getJwt, getUser, removeJwt, removeUser, storeJwt, storeUser } from '../../utils/authUtils';

const initialState = {
  pending: false,
  jwt: getJwt(),
  user: getUser(),
};

const globalReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGIN:
        draft.pending = true;
        draft.jwt = undefined;
        draft.user = undefined;
        removeJwt();
        removeUser();
        break;
      case LOGIN_SUCCESS:
        draft.pending = false;
        draft.jwt = action.jwt;
        draft.user = action.user;
        storeJwt(action.jwt);
        storeUser(action.user);
        break;
      case LOGIN_FAILED:
        draft.pending = false;
        draft.jwt = undefined;
        draft.user = undefined;
        removeJwt();
        removeUser();
        break;
      case LOGOUT:
        draft.pending = false;
        draft.jwt = undefined;
        draft.user = undefined;
        removeJwt();
        removeUser();
        break;
    }
  });

export default globalReducer;
