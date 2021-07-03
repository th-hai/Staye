import { takeLatest, put, call, all } from 'redux-saga/effects';
import * as services from 'services/bookingService'
import { message } from 'antd';
import { getErrorMessage } from 'utils/responseUtils'
import { CREATE_BOOKING, CREATE_BOOKING_SUCCESS, CREATE_BOOKING_FAIL } from './constants';
import { createBookingSuccess, createBookingFail } from './actions';

export function* createBookingTask({params}) {
  try {
    const { data } = yield call(services.createBooking, params);
    yield put(createBookingSuccess(data));
  } catch (error) {
    yield put(createBookingFail(getErrorMessage(error)));
  }
}

export function* failedTask({ error }) {
  yield message.error(error);
}

export default function* createBookingSaga() {
  yield all([
    takeLatest(CREATE_BOOKING, createBookingTask),
    takeLatest(CREATE_BOOKING_SUCCESS, createBookingSuccess),
    takeLatest([CREATE_BOOKING_FAIL], failedTask),
  ]);
}
