import { takeLatest, put, call, all, take } from 'redux-saga/effects';
import * as services from '../../services/roomService';
import {uploadMultiple, uploadSingle} from 'services/uploadService'
import { message } from 'antd';
import { getErrorMessage } from '../../utils/responseUtils';
import {
  GET_ROOM,
  GET_ROOM_FAIL,
  GET_ROOMS_BY_LOCATION,
  GET_ROOMS_BY_LOCATION_FAIL,
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
} from './constants';

import {
  getRoom,
  getRoomSuccess,
  getRoomFail,
  getRoomsByLocation,
  getRoomsByLocationSuccess,
  getRoomsByLocationFail,
  deleteRoom,
  deleteRoomSuccess,
  deleteRoomFailed,
  updateRoom,
  updateRoomFailed,
  updateRoomSuccess,
  showRoomModal,
  createRoom,
  createRoomFailed,
  createRoomSuccess,
  uploadPhotosSuccess,
  uploadPhotosFailed,
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
    console.log("saga", files)
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
    takeLatest(DELETE_ROOM, deleteRoomTask),
    takeLatest(DELETE_ROOM_SUCCESS, deleteRoomSuccessTask),
    takeLatest(UPDATE_ROOM, updateRoomTask),
    takeLatest(UPDATE_ROOM_SUCCESS, updateRoomSuccessTask),
    takeLatest(CREATE_ROOM, createRoomTask),
    takeLatest(CREATE_ROOM_SUCCESS, createRoomSuccessTask),
    takeLatest(UPLOAD_PHOTOS, uploadPhotosTask),
    takeLatest(UPLOAD_PHOTOS_SUCCESS, uploadPhotosSuccessTask),
    takeLatest(
      [
        GET_ROOM_FAIL,
        DELETE_ROOM_FAILED,
        UPDATE_ROOM_FAILED,
        CREATE_ROOM_FAILED,
      ],
      failedTask
    ),
  ]);
}
