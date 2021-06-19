import { takeLatest, put, call, all } from 'redux-saga/effects'
import * as locationService from 'services/locationService'
import * as roomService from 'services/roomService'
import { message } from 'antd'
import { getErrorMessage } from '../../../utils/responseUtils'
import { GET_LOCATIONS, GET_LOCATIONS_FAIL, GET_ROOMS_BY_LOCATION, GET_ROOMS_BY_LOCATION_FAIL } from './constants'
import { getLocationsSuccess, getLocationsFail, getRoomsByLocationSuccess, getRoomsByLocationFail } from './actions'

export function* getLocationTask() {
  try {
    const { data } = yield call(locationService.getLocations)
    yield put(getLocationsSuccess(data.results))
  } catch (error) {
    yield put(getLocationsFail(getErrorMessage(error)))
  }
}

export function* getRoomsByLocationTask({location}) {
    try {
      const { data } = yield call(roomService.getRoomsByLocation, location)
      yield put(getRoomsByLocationSuccess(data))
    } catch (error) {
      yield put(getRoomsByLocationFail(getErrorMessage(error)))
    }
  }

export function* failedTask({ error }) {
  yield message.error(error)
}

export default function* locationListSaga() {
  yield all([
    takeLatest(GET_LOCATIONS, getLocationTask),
    takeLatest(GET_ROOMS_BY_LOCATION, getRoomsByLocationTask),  
    takeLatest([GET_LOCATIONS_FAIL, GET_ROOMS_BY_LOCATION_FAIL], failedTask),])
}
