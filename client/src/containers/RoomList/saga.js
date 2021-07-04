import { takeLatest, put, call, all } from 'redux-saga/effects';
import * as services from '../../services/roomService';
import { uploadMultiple } from 'services/uploadService';
import { message } from 'antd';
import { getErrorMessage } from '../../utils/responseUtils';
import {
  GET_ROOM,
  GET_ROOM_FAIL,
  GET_ROOMS_BY_LOCATION,
  DELETE_ROOM,
  DELETE_ROOM_SUCCESS,
  DELETE_ROOM_FAILED,
  UPDATE_ROOM_FAILED,
  UPDATE_ROOM,
  UPDATE_ROOM_SUCCESS,
  CREATE_ROOM,
  CREATE_ROOM_FAILED,
  CREATE_ROOM_SUCCESS,
  UPLOAD_PHOTOS,
  UPLOAD_PHOTOS_SUCCESS,
  GET_OWNERS,
  GET_OWNERS_FAILED,
  GET_USERS,
  GET_USERS_FAILED,
  DELETE_USER,
  DELETE_USER_FAILED,
  DELETE_USER_SUCCESS,
} from './constants';

import {
  getRoom,
  getRoomSuccess,
  getRoomFail,
  getRoomsByLocationSuccess,
  getRoomsByLocationFail,
  deleteRoomSuccess,
  deleteRoomFailed,
  updateRoomFailed,
  updateRoomSuccess,
  showRoomModal,
  createRoomFailed,
  createRoomSuccess,
  uploadPhotosSuccess,
  uploadPhotosFailed,
  getOwnersFailed,
  getOwnersSuccess,
  getUsersSuccess,
  getUsersFailed,
  deleteUserSuccess,
  getUsers,
} from './actions';

export function* getRoomTask() {
  try {
    const { data } = yield call(services.getRooms);
    yield put(getRoomSuccess(data.results));
  } catch (error) {
    yield put(getRoomFail(getErrorMessage(error)));
  }
}

export function* getRoomsByLocationTask() {
  try {
    const { data } = yield call(services.getRoomsByLocation);
    yield put(getRoomsByLocationSuccess(data.results));
  } catch (error) {
    yield put(getRoomsByLocationFail(getErrorMessage(error)));
  }
}

export function* getOwnersTask() {
  try {
    const { data } = yield call(services.getOwners);
    yield put(getOwnersSuccess(data.results));
  } catch (error) {
    yield put(getOwnersFailed(getErrorMessage(error)));
  }
}

export function* getUsersTask() {
  try {
    const { data } = yield call(services.getUsers);
    yield put(getUsersSuccess(data.results));
  } catch (error) {
    yield put(getUsersFailed(getErrorMessage(error)));
  }
}

export function* createRoomTask({ room }) {
  try {
    const { data } = yield call(services.createRoom, room);
    yield put(createRoomSuccess(data));
    yield put(showRoomModal(false));
  } catch (error) {
    yield put(createRoomFailed(getErrorMessage(error)));
  }
}

export function* createRoomSuccessTask() {
  message.success('Created Room');
  yield put(getRoom());
}

export function* deleteRoomTask({ id }) {
  try {
    yield call(services.deleteRoom, id);
    yield put(deleteRoomSuccess(id));
  } catch (error) {
    yield put(deleteRoomFailed(getErrorMessage(error)));
  }
}

export function* deleteRoomSuccessTask() {
  message.success('Deleted Room');
  yield put(getRoom());
}

export function* deleteUserTask({ id }) {
  try {
    yield call(services.deleteUser, id);
    yield put(deleteUserSuccess(id));
  } catch (error) {
    yield put(deleteRoomFailed(getErrorMessage(error)));
  }
}

export function* deleteUserSuccessTask() {
  message.success('Deleted User');
  yield put(getUsers());
}

export function* updateRoomTask({ id, room }) {
  try {
    const { data } = yield call(services.updateRoom, id, room);
    yield put(updateRoomSuccess(data));
    yield put(showRoomModal(false));
  } catch (error) {
    yield put(updateRoomFailed(getErrorMessage(error)));
  }
}

export function* updateRoomSuccessTask() {
  message.success('Updated Room');
  yield put(getRoom());
}

export function* uploadPhotosTask({ files }) {
  try {
    const { data } = yield call(uploadMultiple, files);
    yield put(uploadPhotosSuccess(data));
  } catch (error) {
    yield put(uploadPhotosFailed(getErrorMessage(error)));
  }
}

export function* uploadPhotosSuccessTask() {
  message.success('Upload photos successfully');
}

export function* failedTask({ error }) {
  message.error(error);
}

export default function* roomListSaga() {
  yield all([
    takeLatest(GET_ROOM, getRoomTask),
    takeLatest(GET_ROOMS_BY_LOCATION, getRoomsByLocationTask),
    takeLatest(GET_OWNERS, getOwnersTask),
    takeLatest(DELETE_ROOM, deleteRoomTask),
    takeLatest(DELETE_ROOM_SUCCESS, deleteRoomSuccessTask),
    takeLatest(UPDATE_ROOM, updateRoomTask),
    takeLatest(UPDATE_ROOM_SUCCESS, updateRoomSuccessTask),
    takeLatest(CREATE_ROOM, createRoomTask),
    takeLatest(CREATE_ROOM_SUCCESS, createRoomSuccessTask),
    takeLatest(UPLOAD_PHOTOS, uploadPhotosTask),
    takeLatest(UPLOAD_PHOTOS_SUCCESS, uploadPhotosSuccessTask),
    takeLatest(GET_USERS, getUsersTask),
    takeLatest(DELETE_USER, deleteUserTask),
    takeLatest(DELETE_USER_SUCCESS, deleteUserSuccessTask),
    takeLatest(
      [
        GET_ROOM_FAIL,
        GET_OWNERS_FAILED,
        GET_USERS_FAILED,
        DELETE_ROOM_FAILED,
        DELETE_USER_FAILED,
        UPDATE_ROOM_FAILED,
        CREATE_ROOM_FAILED,
      ],
      failedTask
    ),
  ]);
}
