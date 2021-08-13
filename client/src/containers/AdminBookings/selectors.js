import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { reducerKey } from './constants';
import get from 'lodash/fp/get';
const selectBookingListDomain = (state) => state[reducerKey] || initialState;
const makeSelectBookingListDomain = createSelector(
    selectBookingListDomain,
  (state) => state
);
const makeSelectBookings = createSelector(
    makeSelectBookingListDomain,
  (state) => state.bookings
);

const makeSelectBookingModal = createSelector(
    makeSelectBookingListDomain,
  get('bookingModal')
);

export {
    makeSelectBookings,
    makeSelectBookingModal
};
