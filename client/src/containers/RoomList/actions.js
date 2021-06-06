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
  DELETE_ROOM,
  DELETE_ROOM_FAILED,
  DELETE_ROOM_SUCCESS,
  UPDATE_ROOM,
  UPDATE_ROOM_FAILED,
  UPDATE_ROOM_SUCCESS,
  CREATE_ROOM,
  CREATE_ROOM_FAILED,
  CREATE_ROOM_SUCCESS,
  SHOW_MODAL
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

export const showRoomModal = visible => ({
  type: SHOW_MODAL,
  visible,
});