import {
  GET_BOOKINGS,
  GET_BOOKINGS_FAIL,
  GET_BOOKINGS_SUCCESS,
  SHOW_MODAL,
  UPDATE_BOOKINGS,
  UPDATE_BOOKINGS_FAILED,
  UPDATE_BOOKINGS_SUCCESS,
} from './constants';

export const getBookings = () => ({
  type: GET_BOOKINGS,
});

export const getBookingsSuccess = (data) => ({
  type: GET_BOOKINGS_SUCCESS,
  payload: data,
});

export const getBookingsFail = (error) => ({
  type: GET_BOOKINGS_FAIL,
  error,
});

export const updateBookings = (id, booking) => ({
  type: UPDATE_BOOKINGS,
  id,
  booking,
});

export const updateBookingsSuccess = (booking) => ({
  type: UPDATE_BOOKINGS_SUCCESS,
  booking,
});

export const updateBookingsFailed = (error) => ({
  type: UPDATE_BOOKINGS_FAILED,
  error,
});

export const showBookingModal = (visible) => ({
  type: SHOW_MODAL,
  visible,
});
