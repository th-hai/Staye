import { takeLatest, put, call, all } from 'redux-saga/effects'
import * as services from '../../../services/locationService'
import { message } from 'antd'
import { getErrorMessage } from '../../../utils/responseUtils'
import { GET_LOCATIONS, GET_LOCATIONS_COUNT_ROOMS, GET_LOCATIONS_FAIL } from './constants'

import { getLocationsSuccess, getLocationsFail, getLocationsCountRoomsSuccess } from './actions'

export function* getTask() {
  try {
    const { data } = yield call(services.getLocations)
    yield put(getLocationsSuccess(data.results))
  } catch (error) {
    yield put(getLocationsFail(getErrorMessage(error)))
  }
}

export function* getLocationsCountRoomsTask() {
  try {
    const { data } = yield call(services.getLocationsCountRooms)
    console.log(data)
    yield put(getLocationsCountRoomsSuccess(data))
  } catch (error) {
    yield put(getLocationsFail(getErrorMessage(error)))
  }
}

export function* failedTask({ error }) {
  message.error(error)
}

export default function* locationListSaga() {
  yield all([
    takeLatest(GET_LOCATIONS, getTask),
    takeLatest(GET_LOCATIONS_COUNT_ROOMS, getLocationsCountRoomsTask), 
    takeLatest([GET_LOCATIONS_FAIL], failedTask)])
}
