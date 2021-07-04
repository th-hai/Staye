import { takeLatest, put, call, all } from 'redux-saga/effects';
import * as services from 'services/locationService';
import { message } from 'antd';
import { getErrorMessage } from '../../utils/responseUtils';

import {
  GET_LOCATIONS,
  GET_LOCATIONS_FAIL,
  CREATE_LOCATIONS,
  CREATE_LOCATIONS_SUCCESS,
  CREATE_LOCATIONS_FAILED,
  UPDATE_LOCATIONS,
  UPDATE_LOCATIONS_FAILED,
  UPDATE_LOCATIONS_SUCCESS,
  DELETE_LOCATIONS,
  DELETE_LOCATIONS_FAILED,
  DELETE_LOCATIONS_SUCCESS,
} from './constants';

import {
  createLocationSuccess,
  createLocationFailed,
  getLocations,
  getLocationsFail,
  getLocationsSuccess,
  showLocationModal,
  deleteLocationFailed,
  deleteLocationSuccess,
  updateLocationFailed,
  updateLocationSuccess,
} from './actions';

export function* getLocationsTask() {
  try {
    const { data } = yield call(services.getLocations);
    yield put(getLocationsSuccess(data.results));
  } catch (error) {
    yield put(getLocationsFail(getErrorMessage(error)));
  }
}

export function* createLocationTask({ location }) {
  try {
    const { data } = yield call(services.createLocation, location);
    yield put(createLocationSuccess(data));
    yield put(showLocationModal(false));
  } catch (error) {
    yield put(createLocationFailed(getErrorMessage(error)));
  }
}

export function* createLocationSuccessTask() {
  message.success('Created Location');
  yield put(getLocations());
}

export function* deleteLocationTask({ id }) {
  try {
    yield call(services.deleteLocation, id);
    yield put(deleteLocationSuccess(id));
  } catch (error) {
    yield put(deleteLocationFailed(getErrorMessage(error)));
  }
}

export function* deleteLocationSuccessTask() {
  message.success('Deleted Location');
  yield put(getLocations());
}

export function* updateLocationTask({ id, location }) {
  try {
    const { data } = yield call(services.updateLocation, id, location);
    yield put(updateLocationSuccess(data));
    yield put(showLocationModal(false));
  } catch (error) {
    yield put(updateLocationFailed(getErrorMessage(error)));
  }
}

export function* updateLocationSuccessTask() {
  message.success('Updated Location');
  yield put(getLocations());
}

export function* failedTask({ error }) {
  yield message.error(error);
}

export default function* adminLocationsSaga() {
  yield all([
    takeLatest(GET_LOCATIONS, getLocationsTask),
    takeLatest(CREATE_LOCATIONS, createLocationTask),
    takeLatest(CREATE_LOCATIONS_SUCCESS, createLocationSuccessTask),
    takeLatest(DELETE_LOCATIONS, deleteLocationTask),
    takeLatest(DELETE_LOCATIONS_SUCCESS, deleteLocationSuccessTask),
    takeLatest(UPDATE_LOCATIONS, updateLocationTask),
    takeLatest(UPDATE_LOCATIONS_SUCCESS, updateLocationSuccessTask),
    takeLatest([GET_LOCATIONS_FAIL, CREATE_LOCATIONS_FAILED, UPDATE_LOCATIONS_FAILED, DELETE_LOCATIONS_FAILED], failedTask),
  ]);
}
