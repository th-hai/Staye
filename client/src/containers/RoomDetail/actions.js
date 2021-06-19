/**
 *
 *
 * RoomDetail actions
 *
 */
import {
  GET_ROOM,
  GET_ROOM_SUCCESS,
  GET_ROOM_FAIL,
  SHOW_MODAL
} from './constants';

export const getRoom = (id) => ({
  type: GET_ROOM,
  id
});

export const getRoomSuccess = (data) => ({
  type: GET_ROOM_SUCCESS,
  payload: data,
});

export const getRoomFail = (error) => ({
  type: GET_ROOM_FAIL,
  error,
});

export const showRoomModal = visible => ({
  type: SHOW_MODAL,
  visible,
});