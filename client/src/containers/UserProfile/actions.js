import {
  UPDATE_USER,
  UPDATE_USER_FAILED,
  UPDATE_USER_SUCCESS,
} from './constants';
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
