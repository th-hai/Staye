import { takeLatest, put, call, all } from 'redux-saga/effects';
import * as services from 'services/bookingService';
import { message } from 'antd';
import { getErrorMessage } from '../../utils/responseUtils';

import {
  GET_BOOKINGS,
  GET_BOOKINGS_FAIL,
  UPDATE_BOOKINGS,
  UPDATE_BOOKINGS_FAILED,
  UPDATE_BOOKINGS_SUCCESS,
} from './constants';

import {
  getBookings,
  getBookingsFail,
  getBookingsSuccess,
  updateBookingsFailed,
  updateBookingsSuccess,
  showBookingModal,
} from './actions';

export function* getBookingsTask() {
  try {
    const { data } = yield call(services.getAllBookings);
    yield put(getBookingsSuccess(data.results));
  } catch (error) {
    yield put(getBookingsFail(getErrorMessage(error)));
  }
}

// export function* createLocationTask({ location }) {
//   try {
//     const { data } = yield call(services.createLocation, location);
//     yield put(createLocationSuccess(data));
//     yield put(showLocationModal(false));
//   } catch (error) {
//     yield put(createLocationFailed(getErrorMessage(error)));
//   }
// }

// export function* createLocationSuccessTask() {
//   message.success('Created Location');
//   yield put(getLocations());
// }

// export function* deleteLocationTask({ id }) {
//   try {
//     yield call(services.deleteLocation, id);
//     yield put(deleteLocationSuccess(id));
//   } catch (error) {
//     yield put(deleteLocationFailed(getErrorMessage(error)));
//   }
// }

// export function* deleteLocationSuccessTask() {
//   message.success('Deleted Location');
//   yield put(getLocations());
// }

export function* updateBookingTask({ id, booking }) {
  try {
    const { data } = yield call(services.updateBooking, id, booking);
    yield put(updateBookingsSuccess(data));
    yield put(showBookingModal(false));
  } catch (error) {
    yield put(updateBookingsFailed(getErrorMessage(error)));
  }
}

export function* updateBookingSuccessTask() {
  message.success('Updated Booking');
  yield put(getBookings());
}

export function* failedTask({ error }) {
  yield message.error(error);
}

export default function* adminLocationsSaga() {
  yield all([
    takeLatest(GET_BOOKINGS, getBookingsTask),
    takeLatest(UPDATE_BOOKINGS, updateBookingTask),
    takeLatest(UPDATE_BOOKINGS_SUCCESS, updateBookingSuccessTask),
    takeLatest([GET_BOOKINGS_FAIL, UPDATE_BOOKINGS_FAILED], failedTask),
  ]);
}
