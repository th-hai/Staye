import { takeLatest, put, call, all } from 'redux-saga/effects';
import * as services from 'services/roomService'
import { message } from 'antd';
import { getErrorMessage } from 'utils/responseUtils'
import { SEARCH_ROOMS, SEARCH_ROOMS_FAIL } from './constants';
import { searchRoomsSuccess, searchRoomsFail, } from './actions';

export function* searchRoomsTask({params}) {
  try {
    const { data } = yield call(services.searchRooms, params);
    console.log(data.results)
    yield put(searchRoomsSuccess(data.results));
  } catch (error) {
    yield put(searchRoomsFail(getErrorMessage(error)));
  }
}

export function* failedTask({ error }) {
  message.error(error);
}

export default function* searchRoomsSaga() {
  yield all([
    takeLatest(SEARCH_ROOMS, searchRoomsTask),
    takeLatest([SEARCH_ROOMS_FAIL,], failedTask),
  ]);
}
