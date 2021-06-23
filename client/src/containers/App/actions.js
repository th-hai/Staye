import {
  LOGIN,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT,
  UPDATE_USER,
  UPDATE_USER_FAILED,
  UPDATE_USER_SUCCESS,
} from './constants';

export function login(email, password, history) {
  return {
    type: LOGIN,
    email,
    password,
    history,
  };
}

export function loginSuccess(jwt, user, history) {
  return {
    type: LOGIN_SUCCESS,
    jwt,
    user,
    history,
  };
}

export const loginFailed = (error) => ({
  type: LOGIN_FAILED,
  error,
});

export function logout() {
  return {
    type: LOGOUT,
  };
}

export const updateUser = (id, user) => ({
  type: UPDATE_USER,
  id,
  user,
});

export const updateUserSuccess = (user) => ({
  type: UPDATE_USER_SUCCESS,
  user,
});

export const updateUserFailed = (error) => ({
  type: UPDATE_USER_FAILED,
  error,
});
