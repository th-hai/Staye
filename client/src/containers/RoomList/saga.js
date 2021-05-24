import { takeLatest, put, call, all } from 'redux-saga/effects'
import * as services from '../../services/roomService'
import { message } from 'antd'
import { getErrorMessage } from '../../utils/responseUtils'
import { GET_ROOM, GET_ROOM_SUCCESS, GET_ROOM_FAIL } from './constants'

import { getRoom, getRoomSuccess, getRoomFail } from './actions'

export function* getRoomTask() {
  try {
    const { data } = yield call(services.getRooms)
    yield put(getRoomSuccess(data.results))
  } catch (error) {
    yield put(getRoomFail(getErrorMessage(error)))
  }
}

export function* failedTask({ error }) {
  message.error(error)
}

export default function* roomListSaga() {
  yield all([takeLatest(GET_ROOM, getRoomTask), takeLatest([GET_ROOM_FAIL], failedTask)])
}
