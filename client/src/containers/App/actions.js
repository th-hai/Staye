import { LOGIN, LOGIN_FAILED, LOGIN_SUCCESS, LOGOUT } from './constants';

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

export function loginFailed(email, message) {
  return {
    type: LOGIN_FAILED,
    email,
    message,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}