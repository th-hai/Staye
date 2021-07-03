import { CREATE_BOOKING, CREATE_BOOKING_FAIL, CREATE_BOOKING_SUCCESS } from "./constants";


export const createBooking = (params) => ({
    type: CREATE_BOOKING,
    params
});

export const createBookingSuccess = (data) => ({
    type: CREATE_BOOKING_SUCCESS,
    payload: data,
});

export const createBookingFail = (error) => ({
    type: CREATE_BOOKING_FAIL,
    error,
});