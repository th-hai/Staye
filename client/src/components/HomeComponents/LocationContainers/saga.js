import { takeLatest, put, call, all } from 'redux-saga/effects'
import * as services from '../../../services/locationService'
import { message } from 'antd'
import { getErrorMessage } from '../../../utils/responseUtils'
import { GET_LOCATIONS, GET_LOCATIONS_FAIL } from './constants'

import { getLocationsSuccess, getLocationsFail } from './actions'

export function* getTask() {
  try {
    const { data } = yield call(services.getLocations)
    yield put(getLocationsSuccess(data.results))
  } catch (error) {
    yield put(getLocationsFail(getErrorMessage(error)))
  }
}

export function* failedTask({ error }) {
  message.error(error)
}

export default function* locationListSaga() {
  yield all([takeLatest(GET_LOCATIONS, getTask), takeLatest([GET_LOCATIONS_FAIL], failedTask)])
}
