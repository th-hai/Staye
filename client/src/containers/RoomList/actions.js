/**
 *
 *
 * ROOMList actions
 *
 */
import {
  GET_ROOM,
  GET_ROOM_SUCCESS,
  GET_ROOM_FAIL,
  GET_ROOMS_BY_LOCATION,
  GET_ROOMS_BY_LOCATION_SUCCESS,
  GET_ROOMS_BY_LOCATION_FAIL,
  DELETE_ROOM,
  DELETE_ROOM_FAILED,
  DELETE_ROOM_SUCCESS,
  UPDATE_ROOM,
  UPDATE_ROOM_FAILED,
  UPDATE_ROOM_SUCCESS,
  CREATE_ROOM,
  CREATE_ROOM_FAILED,
  CREATE_ROOM_SUCCESS,
  SHOW_MODAL,
  UPLOAD_PHOTOS,
  UPLOAD_PHOTOS_FAILED,
  UPLOAD_PHOTOS_SUCCESS,
  GET_OWNERS,
  GET_OWNERS_FAILED,
  GET_OWNERS_SUCCESS,
  GET_USERS,
  GET_USERS_FAILED,
  GET_USERS_SUCCESS,
  DELETE_USER,
  DELETE_USER_FAILED,
  DELETE_USER_SUCCESS,
  EDIT_USER,
  EDIT_USER_FAILED,
  EDIT_USER_SUCCESS,
  SHOW_LOCATION_MODAL,
} from './constants';

export const getRoom = () => ({
  type: GET_ROOM,
});

export const getRoomSuccess = (data) => ({
  type: GET_ROOM_SUCCESS,
  payload: data,
});

export const getRoomFail = (error) => ({
  type: GET_ROOM_FAIL,
  error,
});

export const getRoomsByLocation = () => ({
  type: GET_ROOMS_BY_LOCATION,
});

export const getRoomsByLocationSuccess = (data) => ({
  type: GET_ROOMS_BY_LOCATION_SUCCESS,
  payload: data,
});

export const getRoomsByLocationFail = (error) => ({
  type: GET_ROOMS_BY_LOCATION_FAIL,
  error,
});

export const getOwners = () => ({
  type: GET_OWNERS,
});

export const getOwnersSuccess = (data) => ({
  type: GET_OWNERS_SUCCESS,
  payload: data,
});

export const getOwnersFailed = (error) => ({
  type: GET_OWNERS_FAILED,
  error,
});

export const getUsers = () => ({
  type: GET_USERS,
});

export const getUsersSuccess = (data) => ({
  type: GET_USERS_SUCCESS,
  payload: data,
});

export const getUsersFailed = (error) => ({
  type: GET_USERS_FAILED,
  error,
});

export const createRoom = (room) => ({
  type: CREATE_ROOM,
  room,
});

export const createRoomSuccess = (room) => ({
  type: CREATE_ROOM_SUCCESS,
  room,
});

export const createRoomFailed = (error) => ({
  type: CREATE_ROOM_FAILED,
  error,
});

export const updateRoom = (id, room) => ({
  type: UPDATE_ROOM,
  id,
  room,
});

export const updateRoomSuccess = (room) => ({
  type: UPDATE_ROOM_SUCCESS,
  room,
});

export const updateRoomFailed = (error) => ({
  type: UPDATE_ROOM_FAILED,
  error,
});

export const deleteRoom = (id) => ({
  type: DELETE_ROOM,
  id,
});

export const deleteRoomSuccess = (id) => ({
  type: DELETE_ROOM_SUCCESS,
  id,
});

export const deleteRoomFailed = (error) => ({
  type: DELETE_ROOM_FAILED,
  error,
});

export const deleteUser = (id) => ({
  type: DELETE_USER,
  id,
});

export const deleteUserSuccess = (id) => ({
  type: DELETE_USER_SUCCESS,
  id,
});

export const deleteUserFailed = (error) => ({
  type: DELETE_USER_FAILED,
  error,
});

export const showRoomModal = (visible) => ({
  type: SHOW_MODAL,
  visible,
});

export const uploadPhotos = (files) => ({
  type: UPLOAD_PHOTOS,
  files,
});

export const uploadPhotosFailed = (files) => ({
  type: UPLOAD_PHOTOS_FAILED,
  files,
});

export const uploadPhotosSuccess = (photoUrls) => ({
  type: UPLOAD_PHOTOS_SUCCESS,
  photoUrls,
});
